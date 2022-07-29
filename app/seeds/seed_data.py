from app.models import db, Task, Tag
from datetime import datetime

def seed_tasks_tags():

    task1 = Task(
    title='Clearing Swamprats Out Me Lawn',
    description = "Well I knew it from the get-go, got me a big ol' infestation, not pretty I tell you hwut. Lookin' for a steady hand to help me e-'rat'icate them heh heh",
    city='New Vegas',
    state='Nevada',
    country='U.S.A.',
    price=500,
    poster_id=1,
    danger_level=1,
    )

    task2 = Task(
    title='Finding Me Lost Keys',
    description = "Done did myself dirty this time, dropped my keys at the far edge of the badlands, like a damn fool. Now this t'aint wouldn't be such a big deal, cept for that band o' mercenaries what lives out there. I need a stealthy hand attached to a stealthy man (or wo-man) to help me sneak past them lawless suckers. A little familiarity with explosives t'wouldn't hurt neither.",
    city='Oklahoma City',
    state='Oklahoma',
    country='U.S.A.',
    price=800,
    poster_id=2,
    danger_level=3,
    )

    task3 = Task(
    title='Got a whole heap of mines around my property',
    description = "Just moved into my house and the paranoid tenants that used to live there left dang ol' MINES all over the place! Help me clear them out before any more of my chickens blow up!",
    city='New Seattle',
    state='Washington',
    country='U.S.A.',
    price=600,
    poster_id=3,
    danger_level=4,
    )

    guns = Tag(type="Guns", description="Accuracy and damage with every kind of conventional firearm, from pistols and rifles to miniguns.")
    explosives = Tag(type="Explosives", description=" Ability of handling explosive traps and creating explosives.")
    medicine = Tag(type="Medicine", description="Knows how to perform surgery and cure illness.")
    repairs = Tag(type="Repairs", description="Know your way around a car? Can you batten down the hatches? Fix my AC unit? Then you’re just what we need!")
    survival = Tag(type="Survival", description="Just the mission for someone that knows their way through the fields without stepping on any pesky mines!")
    stealth = Tag(type="Stealth", description="Creeping and crawling around, a fly on the wall, if that sounds like you, just give a call!")
    pilot = Tag(type="Pilot", description="Plane, helicopter or anything else that flies, you’re the right person for the job.")
    hacking = Tag(type="Hacking", description="Monster drinker who lives in your mothers basement? Can hack anything with a screen? These missions will be a piece of cake.")
    hand_to_hand = Tag(type="Hand to Hand", description="Calling all brawlers. Martial arts, Juijitsu, and your classic haymakers.")


    task1.tags.append(guns)
    task1.tags.append(explosives)
    task2.tags.append(stealth)
    task2.tags.append(explosives)
    task3.tags.append(explosives)
    task3.tags.append(survival)

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)

    db.session.add(guns)
    db.session.add(explosives)
    db.session.add(medicine)
    db.session.add(repairs)
    db.session.add(survival)
    db.session.add(stealth)
    db.session.add(pilot)
    db.session.add(hacking)
    db.session.add(hand_to_hand)
    db.session.commit()


def undo_tasks_tags():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')

    db.session.commit()
