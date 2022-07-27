from app.forms.booking_form import BookingForm
from flask import Blueprint, request
from app.models import Booking, db
from .auth_routes import validation_errors_to_error_messages
from app.forms import BookingForm

booking_routes = Blueprint('bookings', __name__)

@booking_routes.route('')
def bookings():
    bookings = Booking.query.all()
    return {'bookings': [booking.to_dict() for booking in bookings]}

@booking_routes.route('', methods=['POST'])
def new_booking():
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        booking = Booking(
            tasker_id=form.data['tasker_id'],
            task_id=form.data['task_id']
        )
        db.session.add(booking)
        db.session.commit()
        return booking.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@booking_routes.route('/<int:id>', methods=['PUT'])
def edit_booking(id):
    form = BookingForm()

    booking = Booking.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        booking.completed = form.data['completed']
        booking.tasker_id = form.data['tasker_id']
        booking.task_id = form.data['task_id']

        db.session.commit()
        return booking.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@booking_routes.route('/<int:id>', methods=['DELETE'])
def delete_booking(id):
    booking = Booking.query.get(id)
    db.session.delete(booking)
    db.session.commit()
    return booking.to_dict()
