from flask import Blueprint, request
from app.models import Booking, db
from .auth_routes import validation_errors_to_error_messages

booking_routes = Blueprint('bookings', __name__)

@booking_routes.route('')
def bookings():
    bookings = Booking.query.all()
    return {'bookings': [booking.to_dict() for booking in bookings]}


@booking_routes.route('', methods=['POST'])
def new_booking():
    pass