from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import url

from scans.consumers import ScanningConsumer

application = ProtocolTypeRouter({
    'websocket': URLRouter([
        url("scan", ScanningConsumer)
    ])
})