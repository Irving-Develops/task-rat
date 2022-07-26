from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Review

class ReviewForm(FlaskForm):
  rating = IntegerField('rating', validators=[DataRequired()])
  comment = StringField('comment', validators=[DataRequired()])
  tasker_id = IntegerField('tasker_id', validators=[DataRequired()])
  task_id = IntegerField('task_id', validators=[DataRequired()])
