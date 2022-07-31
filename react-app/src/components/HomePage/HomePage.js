import React from "react";
import { NavLink } from 'react-router-dom'
import TaskViewHomePage from "./TaskViewHomePage";
import UsersList from "../UsersList";
import './HomePage.css'
function HomePage() {

    return (
        <>
            <div className="home-banner" >
                <div className="text">
                    <div>
                        <h1>Get Paid For Your Skills!</h1>
                        <p>Pick up tasks and get paid after completing them!</p>
                    </div>
                </div>
                <p></p>
                <div className="banner-img">
                    <img src='https://www.pngkey.com/png/full/152-1529343_fallout-3-vault-boy-png-picture-download-fallout.png' alt="vaultboy"/>
                </div>
            </div>
            <div className="partnered-banner">
                <p>Partnered with RobCo Industries and NukaCola</p>
            </div>
            <TaskViewHomePage />
             <div className="body-banner">
                {/* <div className='img-container'> */}
                    <div className="body-banner-img">
                        <img src="https://pbs.twimg.com/media/EVrzoltUwAI7pGU.png" alt='gun surgeon' />
                    </div>
                {/* </div> */}
                <div className="body-banner-text">
                    <div className="body-banner-title">
                        <h3>Need someone to do a task?</h3>
                        <p>Create a task and have someone else do it for you! </p>
                    </div>
                    <div className="why-list">
                        <ul>
                            <li>&#10003; Stay in the comfort of your home</li>
                            <li>&#10003; Avoid doing dangerous tasks yourself</li>
                            <li>&#10003; Pay someone else for their expertise</li>
                        </ul>
                    </div>
                    <NavLink to='/tasks/new'>
                    <div className="body-banner-button">
                        <p>Create Task</p>
                    </div>
                    </NavLink>
                </div>
            </div>

            <div>
                <UsersList />
            </div>

            <div className="body-banner">
                <div className="body-banner-text">
                    <div className="body-banner-title">
                        <h3>Running low on bottle caps?</h3>
                        <p>Pick up tasks around the wasteland and get paid fast!</p>
                    </div>
                    <div className="why-list">
                        <ul>
                            <li>&#10003; Choose tasks you specialize in</li>
                            <li>&#10003; Get paid immediately</li>
                            <li>&#10003; Work with trusting folk</li>
                        </ul>
                    </div>
                    <NavLink to='/tasks'>
                    <div className="body-banner-button">
                        <p>Checkout Tasks</p>
                    </div>
                    </NavLink>
                </div>
                <div className='img-container'>
                    <div className="body-banner-img">
                        <img src='https://i.pinimg.com/736x/79/09/91/790991524d44472ff596132c4b1d7df7--fallout-vault-boy-fallout-art.jpg' alt="bottle cap" />
                    </div>
                </div>
            </div>

            <div className="footer">
                <div id="team">
                    <NavLink to="/about">
                        <div id="footer-title">
                                <h3>Meet The Team:</h3>
                        </div>
                    </NavLink>
                    <div id="entire-team">

                        <div id="footer-content" className="about-me">
                            <div id="person">
                                <div id="name">
                                    Irving Arreola
                                </div>
                                <div id="links">
                                    <a href="https://github.com/Irving-Develops"><img className='user-card-img' src="https://t2marketinginternational.com/wp-content/uploads/2018/06/Github-Logo-450x450.png" alt="github logo"/></a>
                                    <a href="https://www.linkedin.com/in/irving-arreola-palacios-5bb10414a/"><img className="user-card-img" src="https://www.maryville.edu/wp-content/uploads/2015/11/Linkedin-logo-1-550x550-300x300.png" alt="linked-in logo"/></a>
                                </div>
                            </div>
                        </div>
                        <div id="footer-content" className="about-me">
                            <div id="person">
                                <div id="name">
                                    Wesley Blackburn
                                </div>
                                <div id="links">
                                    <a href="https://github.com/wesleyblackburn90"><img className="user-card-img" src="https://t2marketinginternational.com/wp-content/uploads/2018/06/Github-Logo-450x450.png" alt="github logo"/></a>
                                    <a href="https://www.linkedin.com/in/jay-hutts-300ab9180/"><img className="user-card-img" src="https://www.maryville.edu/wp-content/uploads/2015/11/Linkedin-logo-1-550x550-300x300.png" alt="linked-in logo"/></a>
                                </div>
                            </div>
                        </div>
                        <div id="footer-content" className="about-me">
                            <div id="person">
                                <div id="name">
                                    Jay Hutts
                                </div>
                                <div id="links">
                                    <a href="https://github.com/jay-bean"><img className="user-card-img" src="https://t2marketinginternational.com/wp-content/uploads/2018/06/Github-Logo-450x450.png" alt="github logo"/></a>
                                    <a href="https://www.linkedin.com/in/jay-hutts-300ab9180/"><img className="user-card-img" src="https://www.maryville.edu/wp-content/uploads/2015/11/Linkedin-logo-1-550x550-300x300.png" alt="linked-in logo"/></a>
                                </div>
                            </div>
                        </div>
                        <div id="footer-content" className="about-me">
                            <div id="person">
                                <div id="name">
                                    Angie Maidt
                                </div>
                                <div id="links">
                                    <a href="https://github.com/angMaidt"><img className="user-card-img" src="https://t2marketinginternational.com/wp-content/uploads/2018/06/Github-Logo-450x450.png" alt="github logo"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer-tags-container">
                    <div id="footer-title">
                        <h3>Tags:</h3>
                    </div>
                    <div id="tag-links footer-content">
                        <div>
                            <NavLink to='/tags/1'>Guns</NavLink>
                        </div>
                        <div>
                            <NavLink to='/tags/2'>Explosives</NavLink>
                        </div>
                        <div>
                            <NavLink to='/tags/3'>Stealth</NavLink>
                        </div>
                        <div>
                            <NavLink to='/tags/4'>Survival</NavLink>
                        </div>
                        <div>
                            <NavLink to='/tags/5'>Medicine</NavLink>
                        </div>
                        <div>
                            <NavLink to='/tags/6'>Repairs</NavLink>
                        </div>
                        <div>
                            <NavLink to='/tags/7'>Pilot</NavLink>
                        </div>
                        <div>
                            <NavLink to='/tags/8'>Hacking</NavLink>
                        </div>
                        <div>
                            <NavLink to='/tags/9'>Hand-to-Hand</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
