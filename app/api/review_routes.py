from flask import Blueprint, request
from app.models import Review, db
from app.forms import ReviewForm
from flask_login import current_user
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def reviews():
  reviews = Review.query.all()
  print(reviews)
  return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/', methods=['POST'])
def new_review():
  form = ReviewForm()
  print(form, 'backend form')
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    review = Review(
      rating=form.data['rating'],
      comment=form.data['comment'],
      tasker_id=form.data['tasker_id'],
      task_id=form.data['task_id']
    )
    db.session.add(review)
    db.session.commit()
    return review.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/reviews/<reviewId>', methods=['PUT'])
def edit_review(reviewId):
  review = Review.query.get(reviewId)
  data = request.json
  review.rating = data['rating']
  review.comment = data['comment']
  db.session.commit()
  return review.to_dict()

@review_routes.route('/reviews/<reviewId>', methods=['DELETE'])
def delete_review(reviewId):
  review = Review.query.get(reviewId)
  db.session.delete(review)
  db.session.commit()
  return review.to_dict()
