from channels.generic.websocket import WebsocketConsumer

import socket
import time

class ScanningConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        try:
            self.conn = SocketClient("/tmp/scan")
        except SocketClient.ConnectionErorr as err:
            msg = "".join(["error;", err.message, " - ", err.filename, \
                        "<br>Maybe someone else is connected right now?<br>"])
            self.send(text_data=msg)
        else:
            self.send(text_data="ready;")

    def receive(self, text_data=None, byte_data=None):
        # Server is gonna receive one message from client with \
        # scaning parameters, once its ready to start
        params = text_data
        try:
            self.conn.send(params)
        except SocketClient.DataNotSentError:
            msg = "".join(["error;Error occured while sending:<br>",  "".join(params), "<br>"])
            self.send(text_data=msg)

    def disconnect(self, msg):
        pass

# Class for creating UNIX Socket connection
# Provides user-friendly interface on top of Python socket library
class SocketClient:
    def __init__(self, filename):
        self.socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        # If exception occurs while connecting raise another one
        try:
            self.socket.connect(filename)
        except:
            raise self.ConnectionErorr("Could not connect to socket", filename)

    def send(self, text_data):
        total = 0
        # At the begining of every message add its length
        text_data = str(len(text_data)).rjust(3, "0") + text_data
        while total < len(text_data):
            sent = self.socket.send(text_data[total:].encode("utf-8"))
            if sent is 0:
                raise self.DataNotSentError("Error while sending data to scanning program", total)
            else:
                total += sent

    def recv(self, length):
        recvd = ""
        while len(recvd) < length:
            new = self.socket.recv(length).decode("utf-8")
            if len(new) is 0:
                raise self.RecvError("Received empty message: ERROR", recvd)
            else:
                recvd += new

        return recvd
    
    # Uses recv() method to get length of message and then rest
    def receive(self):
        length = int(self.recv(3))
        return self.recv(length)

    def __del__(self):
        self.socket.close()


    # Classes for exceptions:
    class ConnectionErorr(Exception):
        ''' Raised when the connection could not be established'''
        def __init__(self, msg, filename):
            self.message = msg
            self.filename = filename

    class DataNotSentError(Exception):
        ''' Raised when not all of the given data could be sent'''
        def __init__(self, msg, sent):
            self.message = msg
            self.sent = sent

    class RecvError(Exception):
        ''' Raised when connection broke while receiving'''
        def __init__(self, msg, recv):
            self.message = msg
            self.received = recv
            