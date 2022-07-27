from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class ReviewForm(FlaskForm):
  rating = IntegerField('rating', validators=[DataRequired()])
  comment = StringField('comment', validators=[DataRequired(), Length(min=5, max=500, message='Must be between 5 and 500 characters')])
  tasker_id = IntegerField('tasker_id', validators=[DataRequired()])
  task_id = IntegerField('task_id', validators=[DataRequired()])
