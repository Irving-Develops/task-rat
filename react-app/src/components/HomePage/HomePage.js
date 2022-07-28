import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from 'react-router-dom'
import { getTasksThunk } from "../../store/tasks";
import TaskCard from "../Tasks/taskCard/taskCard";
import TaskView from "../Tasks/tasksView/taskView";
import UsersList from "../UsersList";
import './HomePage.css'
function HomePage() {

    return (
        <>
            <TaskView />
            <div>
                <UsersList />
                <NavLink to={'/users'}>View All Users</NavLink>
            </div>

        </>
    )
}

export default HomePage