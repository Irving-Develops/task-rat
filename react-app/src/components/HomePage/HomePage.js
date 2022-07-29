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

        </>
    )
}

export default HomePage