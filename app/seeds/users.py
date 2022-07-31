from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Lition', username='demo', pic_url='https://www.giantbomb.com/a/uploads/square_small/10/103881/1778599-chet.jpg', email='demo@aa.io', password='password', city='New Vegas', state='Nevada', country='U.S.A.', bio="Best doctor money can buy. Been fixin people up since I was a toddler.")
    marnie = User(
        first_name='Marnie', last_name='Lition', username='marnie', pic_url='http://cdn.pastemagazine.com/www/articles/fallout_Rose%20of%20Sharon%20Cassidy.jpg', email='marnie@aa.io', password='password', city='New Vegas', state='Nevada', country='U.S.A.', bio="I know my way around a toolbox. Can fix just about anything with a little duct tape and glue.")
    bobbie = User(
        first_name='Bobbie', last_name='Lition', username='bobbie', pic_url='https://staticdelivery.nexusmods.com/mods/1151/images/thumbnails/57694/57694-1647265530-1228827550.jpeg', email='bobbie@aa.io', password='password', city='New Vegas', state='Nevada', country='U.S.A.', bio="You need something hacked. Im the right person for the job.")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
