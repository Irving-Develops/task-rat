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
                    <img src='images/vaultboy.webp' alt="vaultboy"/>
                </div>
            </div>
            <div className="partnered-banner">
                <p>Partnered with RobCo Industries and NukaCola</p>
            </div>
            <TaskViewHomePage />
            {/* <div>
                <UsersList />
                <NavLink to={'/users'}>View All Users</NavLink>
            </div> */}
            <div className="body-banner">
                <div className="body-banner-img">
                    <img src='https://i.pinimg.com/736x/79/09/91/790991524d44472ff596132c4b1d7df7--fallout-vault-boy-fallout-art.jpg' alt="bottle cap" />
                </div>
                <div className="text">
                    <h3>Running low on bottle caps?</h3>
                    <p>Pick up a tasks around the wasteland to </p>
                </div>
            </div>
            <div className="body-banner">
                <div className="body-banner-img">
                </div>
                <div className="text">
                    <h3>Need someone to do a task?</h3>
                    <p>Create a task and have someone else do it for you! </p>
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default HomePage