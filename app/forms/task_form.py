from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField, BooleanField, RadioField
from wtforms.validators import DataRequired
from ..models import Tag

tags = Tag.query.all()

class TaskForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  description = TextAreaField('Description', validators=[DataRequired()])
  city = StringField('City', validators=[DataRequired()])
  state = StringField('State', validators=[DataRequired()])
  country = StringField('Country', validators=[DataRequired()])
  price = IntegerField('Price', validators=[DataRequired()])
  poster_id = IntegerField("poster_id", validators=[DataRequired()])
  danger_level = SelectField("Danger Level", validators=[DataRequired()], choices=[("1"), ("2"), ("3"), ("4"), ("5")])
  available = BooleanField('Available', default=True)
  #tags = RadioField("Tags", choices=[(tag.id, tag.type) for tag in tags])

  # ("1"), ("2"), ("3"), ("4"), ("5"), ("6"), ("7"), ("8"), ("9"), ("10")
