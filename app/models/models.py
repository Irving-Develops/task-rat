from .db import db
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

task_tags = db.Table(
  "task_tags",
  db.Model.metadata,
  db.Column("tag_id", db.Integer, db.ForeignKey("tags.id"), primary_key=True),
  db.Column("task_id", db.Integer, db.ForeignKey("tasks.id"), primary_key=True),
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(75), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    pic_url = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.String(2000), nullable=True)

    #relationships
    tasks = db.relationship('Task', back_populates="users")
    reviews = db.relationship('Review', back_populates="users_reviews")
    bookings = db.relationship('Booking', back_populates='tasker')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'pic_url': self.pic_url,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'bio': self.bio,
        }


class Task(db.Model):
  __tablename__ = "tasks"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String(2000), nullable=False)
  city = db.Column(db.String(50), nullable=False)
  state = db.Column(db.String(50), nullable=False)
  country = db.Column(db.String(50), nullable=False)
  price = db.Column(db.Integer, nullable=False)
  poster_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  danger_level = db.Column(db.Integer, nullable=False)
  available = db.Column(db.Boolean, nullable=False, default=True)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

  #relationships
  users = db.relationship('User', back_populates="tasks")
  task_reviews = db.relationship('Review', back_populates="reviews_task", cascade="all, delete")
  tags = db.relationship('Tag', secondary=task_tags,  back_populates="tasks")
  booking = db.relationship('Booking', back_populates='task')

  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'description': self.description,
      'city': self.city,
      'state': self.state,
      'country': self.country,
      'price': self.price,
      'poster_id': self.poster_id,
      'danger_level': self.danger_level,
      'available': self.available,
      'created_at': self.created_at,
      'tags': [tag.to_dict() for tag in self.tags],
      'user': self.users.to_dict()
    }

  def to_dict_no_tags(self):
    return {
      'id': self.id,
      'title': self.title,
      'description': self.description,
      'city': self.city,
      'state': self.state,
      'country': self.country,
      'price': self.price,
      'poster_id': self.poster_id,
      'danger_level': self.danger_level,
      'available': self.available,
      'created_at': self.created_at
    }

class Review(db.Model):
  __tablename__ = "reviews"

  id = db.Column(db.Integer, primary_key=True)
  rating = db.Column(db.Integer, nullable=False)
  comment = db.Column(db.String(500), nullable=False)
  tasker_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  task_id = db.Column(db.Integer, db.ForeignKey("tasks.id"), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

  #relationships
  users_reviews = db.relationship('User', back_populates="reviews")
  reviews_task = db.relationship('Task', back_populates="task_reviews")

  def to_dict(self):
    return {
      'id': self.id,
      'rating': self.rating,
      'comment': self.comment,
      'tasker_id': self.tasker_id,
      'task_id': self.task_id,
      'created_at': self.created_at,
    }


class Tag(db.Model):
  __tablename__ = "tags"

  id = db.Column(db.Integer, primary_key=True)
  type = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String(255))

  #relationships
  tasks = db.relationship('Task', secondary=task_tags,  back_populates="tags")

  def to_dict(self):
    return {
      'id': self.id,
      'type': self.type,
      'description': self.description
    }


class Booking(db.Model):
  __tablename__ = 'bookings'

  id = db.Column(db.Integer, primary_key=True)
  completed = db.Column(db.Boolean, nullable=False, default=False)
  tasker_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)

  #relationships
  tasker = db.relationship('User', back_populates='bookings')
  task = db.relationship('Task', back_populates='booking')

  def to_dict(self):
    return {
      'id': self.id,
      'completed': self.completed,
      'tasker_id': self.tasker_id,
      'task_id': self.task_id
    }
