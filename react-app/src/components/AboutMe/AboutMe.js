import './AboutMe.css'

function AboutMe() {
  return (
    <>
    <div className='about-me-title'>
      <h2>About the website</h2>
      <p className='about-the-website'>TaskRat is a website based off of the game series Fallout. Fallout takes place in a post apocolyptic world where players scavenge the wasteland for weapons, armor, and so much more to complete quests. The player levels up throughout the game increasing their skills in lockpicking, medicine, guns and hacking to name a few. This website takes those ideas and combines them with the functionality of the website TaskRabbit. The website allows users to earn bottlecaps (Fallout currency) by completing tasks they might encounter in the wasteland. Users can view other user's profiles to see wheather they can be trusted according to their reviews. Go ahead and checkout all that TaskRat has to offer!</p>
    </div>
    <div className='about-me-title'>
      <h2>Presenting the Pack Rats</h2>
    </div>
    <div className="card-container about-me-container">
      <div className="card users about-card">
        <div className="user-id about-id">
          <div className="user-name">
            <h3 className='about-names'>Irving Arreola</h3>
          </div>
        </div>
        <div>
        </div>
        <div className="content-container about-me">
          <a href="https://github.com/Irving-Develops"><img className='user-card-img' src="https://t2marketinginternational.com/wp-content/uploads/2018/06/Github-Logo-450x450.png" alt="github logo"/></a>
          <a href="https://www.linkedin.com/in/irving-arreola-palacios-5bb10414a/"><img className="user-card-img" src="https://www.maryville.edu/wp-content/uploads/2015/11/Linkedin-logo-1-550x550-300x300.png" alt="linked-in logo"/></a>
        </div>
      </div>
      <div className="card users about-card">
        <div className="user-id about-id">
          <div className="user-img about-img-div">
            <img className="user-card-img" src='https://avatars.githubusercontent.com/u/98054974?v=4' alt="wesley"/>
          </div>
          <div className="user-name">
            <h3 className='about-names'>Wesley Blackburn</h3>
          </div>
        </div>
        <div className="content-container about-me">
          <a href="https://github.com/wesleyblackburn90"><img className="user-card-img" src="https://t2marketinginternational.com/wp-content/uploads/2018/06/Github-Logo-450x450.png" alt="github logo"/></a>
          <a href="https://www.linkedin.com/in/jay-hutts-300ab9180/"><img className="user-card-img" src="https://www.maryville.edu/wp-content/uploads/2015/11/Linkedin-logo-1-550x550-300x300.png" alt="linked-in logo"/></a>
        </div>
      </div>
      <div className="card users about-card">
        <div className="user-id about-id">
          <div className="user-img about-img-div">
            <img className="user-card-img" src='https://avatars.githubusercontent.com/u/46910262?v=4' alt="jay"/>
          </div>
          <div className="user-name">
            <h3 className='about-names'>Jay Hutts</h3>
          </div>
        </div>
        <div className="content-container about-me">
            <a href="https://github.com/jay-bean"><img className="user-card-img" src="https://t2marketinginternational.com/wp-content/uploads/2018/06/Github-Logo-450x450.png" alt="github logo"/></a>
            <a href="https://www.linkedin.com/in/jay-hutts-300ab9180/"><img className="user-card-img" src="https://www.maryville.edu/wp-content/uploads/2015/11/Linkedin-logo-1-550x550-300x300.png" alt="linked-in logo"/></a>
        </div>
      </div>
      <div className="card users about-card">
        <div className="user-id about-id">
          <div className="user-img about-img-div">
            <img className="user-card-img about-img" src='https://avatars.githubusercontent.com/u/100968885?v=4' alt="angie"/>
          </div>
          <div className="user-name about-names">
            <h3 className='about-names'>Angie Maidt</h3>
          </div>
        </div>
        <div className="content-container about-me">
          <a href="https://github.com/angMaidt"><img className="user-card-img" src="https://t2marketinginternational.com/wp-content/uploads/2018/06/Github-Logo-450x450.png" alt="github logo"/></a>
            <a href="https://www.linkedin.com/in/angie-maidt/"><img className="user-card-img" src="https://www.maryville.edu/wp-content/uploads/2015/11/Linkedin-logo-1-550x550-300x300.png" alt="linked-in logo"/></a>
        </div>
      </div>

    </div>
    </>
  );
}

export default AboutMe;
