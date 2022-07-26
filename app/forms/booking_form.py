from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField
from wtforms.validators import DataRequired


class BookingForm(FlaskForm):
    completed = BooleanField('completed', vaidators=[DataRequired()])
    task_id = IntegerField('task_id', vaidators=[DataRequired()])
    tasker_id = IntegerField('tasker_id', vaidators=[DataRequired()])