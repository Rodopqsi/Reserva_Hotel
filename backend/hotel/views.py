from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Room, Reservation
from .serializers import RoomSerializer, ReservationSerializer


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all().order_by('-created_at')
    serializer_class = RoomSerializer
    parser_classes = (MultiPartParser, FormParser)


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.select_related('room').all().order_by('-created_at')
    serializer_class = ReservationSerializer
