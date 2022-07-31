from flask import Blueprint, request
from app.models import Review, db
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

@review_routes.route('')
def reviews():
  reviews = Review.query.all()
  return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('', methods=['POST'])
def new_review():
  form = ReviewForm()
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

@review_routes.route('/<int:reviewId>', methods=['PUT'])
def edit_review(reviewId):
  form = ReviewForm()

  review = Review.query.get(reviewId)
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    # data = request.json
    rating = form.data['rating']
    comment = form.data['comment']
    tasker_id = form.data['tasker_id']
    task_id = form.data['task_id']

    review.rating = rating
    review.comment = comment
    review.tasker_id = tasker_id
    review.task_id = task_id

    db.session.commit()
    return review.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:reviewId>', methods=['DELETE'])
def delete_review(reviewId):
  review = Review.query.get(reviewId)
  db.session.delete(review)
  db.session.commit()
  return review.to_dict()
