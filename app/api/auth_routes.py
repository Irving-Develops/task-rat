from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import UserForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


# good idea to export this or copy it for error handling on other route pages
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


# might have to change this route
    # this is a great example of a post route
@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    # this line adds a csrf token cookie to the form
        # NEED THIS FOR FORMS (?)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            pic_url=form.data['pic_url'],
            city=form.data['city'],
            state=form.data['state'],
            country=form.data['country'],
            bio=form.data['bio']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        # NOTE: now we are done with jinja, we will only be returning dicts from backend routes
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_profile(id):
    profile = User.query.get(id)
    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        first_name=form.data['first_name'],
        last_name=form.data['last_name'],
        email=form.data['email'],
        city=form.data['city'],
        state=form.data['state'],
        country=form.data['country'],
        bio=form.data['bio']
        profile.first_name = first_name
        profile.last_name = last_name
        profile.email = email
        profile.city = city
        profile.state = state
        profile.country = country
        profile.bio = bio

        db.session.commit()
        return profile.to_dict()
    return { 'errors' : validation_errors_to_error_messages(form.errors) }, 400


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
