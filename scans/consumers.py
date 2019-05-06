from channels.generic.websocket import WebsocketConsumer

class ScanningConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def receive(self, text_data=None, byte_data=None):
        self.send(text_data=text_data)

    def disconnect(self):
        pass