from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField
from wtforms.validators import DataRequired


class BookingForm(FlaskForm):
    completed = BooleanField('completed', vaidators=[DataRequired()])
