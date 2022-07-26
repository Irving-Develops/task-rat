from app.models import db, Review

def seed_reviews():

  review1 = Review(
  rating = 3,
  comment = "Rats were flying everywhere! I’ve never seen so many rats in the air. I got paid right after the job was done, and had me some rat stew. I’d work with Demo again any day.",
  task_id = 1,
  tasker_id = 1,
  )

  db.session.add(review1)
  db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
