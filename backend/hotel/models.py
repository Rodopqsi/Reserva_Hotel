from django.db import models


ROOM_TYPES = (
    ('single', 'Simple'),
    ('double', 'Doble'),
    ('suite', 'Suite'),
)

RESERVATION_STATUS = (
    ('pending', 'Pendiente'),
    ('confirmed', 'Confirmada'),
    ('cancelled', 'Cancelada'),
)


class Room(models.Model):
    number = models.CharField(max_length=10, unique=True, verbose_name='Habitación')
    room_type = models.CharField(max_length=20, choices=ROOM_TYPES, default='single')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)
    image = models.ImageField(upload_to='rooms/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Habitación {self.number} ({self.get_room_type_display()})"


class Reservation(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='reservations')
    customer_name = models.CharField(max_length=120)
    customer_email = models.EmailField()
    check_in = models.DateField()
    check_out = models.DateField()
    status = models.CharField(max_length=20, choices=RESERVATION_STATUS, default='pending')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Reserva de {self.customer_name} - Hab {self.room.number}"
