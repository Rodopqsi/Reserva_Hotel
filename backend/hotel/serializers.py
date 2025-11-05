from rest_framework import serializers
from .models import Room, Reservation


class RoomSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Room
        fields = ['id', 'number', 'room_type', 'price', 'is_available', 'image', 'image_url', 'created_at']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url if obj.image else None

    # no current_status in the reverted version


class ReservationSerializer(serializers.ModelSerializer):
    room_detail = RoomSerializer(source='room', read_only=True)

    class Meta:
        model = Reservation
        fields = [
            'id', 'room', 'room_detail', 'customer_name', 'customer_email',
            'check_in', 'check_out', 'status', 'notes', 'created_at'
        ]
