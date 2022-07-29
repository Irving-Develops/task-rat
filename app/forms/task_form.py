from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField, BooleanField, SelectMultipleField
from wtforms.validators import DataRequired, Length
class TaskForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired(), Length(min=5, max=50)], )
  description = TextAreaField('Description', validators=[DataRequired(), Length(min=5, max=500)])
  city = StringField('City', validators=[DataRequired(), Length(max=30)])
  state = StringField('State', validators=[DataRequired(), Length(max=30)])
  country = StringField('Country', validators=[DataRequired(), Length(max=30)])
  price = IntegerField('Price', validators=[DataRequired()])
  poster_id = IntegerField("poster_id", validators=[DataRequired()])
  danger_level = SelectField("Danger Level", validators=[DataRequired()], choices=[("1"), ("2"), ("3"), ("4"), ("5")])
  available = BooleanField('Available', default=True)
  tags = SelectMultipleField("Tags", choices=[("1"), ("2"), ("3"), ("4"), ("5"), ("6"), ("7"), ("8"), ("9")])
