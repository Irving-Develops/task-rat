import React from "react";
import { NavLink } from 'react-router-dom'
import TaskViewHomePage from "./TaskViewHomePage";
import UsersList from "../UsersList";
import './HomePage.css'
// import Footer from "../Footer";
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
            <h2 id='thanks'>Thanks for checking us out!</h2>
        </>
    )
}

export default HomePage
