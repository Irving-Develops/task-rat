from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Lition', username='demo', pic_url='https://files.slack.com/files-pri/T03GU501J-F03QN5U2NP5/fallout-vault-boy-sphere-by-polishxcii-on-deviantart.png', email='demo@aa.io', password='password', city='New Vegas', state='Nevada', country='U.S.A.')
    marnie = User(
        first_name='Marnie', last_name='Lition', username='marnie', pic_url='https://files.slack.com/files-pri/T03GU501J-F03QN5U2NP5/fallout-vault-boy-sphere-by-polishxcii-on-deviantart.png', email='marnie@aa.io', password='password', city='New Vegas', state='Nevada', country='U.S.A.')
    bobbie = User(
        first_name='Bobbie', last_name='Lition', username='bobbie', pic_url='https://files.slack.com/files-pri/T03GU501J-F03QN5U2NP5/fallout-vault-boy-sphere-by-polishxcii-on-deviantart.png', email='bobbie@aa.io', password='password', city='New Vegas', state='Nevada', country='U.S.A.')

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
