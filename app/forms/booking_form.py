from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField
from wtforms.validators import DataRequired


class BookingForm(FlaskForm):
    task_id = IntegerField('task_id', validators=[DataRequired()])
    tasker_id = IntegerField('tasker_id', validators=[DataRequired()])
