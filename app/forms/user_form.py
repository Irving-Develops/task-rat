from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class UserForm(FlaskForm):
    first_name = StringField('first name', validators=[DataRequired(), Length(max=50, message='Must be less than 50 characters')])
    last_name = StringField('last name', validators=[DataRequired(), Length(max=50, message='Must be less than 50 characters')])
    email = StringField('email', validators=[DataRequired(), Length(max=75, message='Must be less than 75 characters')])
    city = StringField('city', validators=[DataRequired(), Length(max=50, message='Must be less than 50 characters')])
    state = StringField('state', validators=[DataRequired(), Length(max=50, message='Must be less than 50 characters')])
    country = StringField('country', validators=[DataRequired(), Length(max=50, message='Must be less than 50 characters')])
    bio = StringField('bio', validators=[DataRequired(), Length(max=2000, message='Must be less than 2000 characters')])
