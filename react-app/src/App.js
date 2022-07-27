import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
// protected route = custom component that will return a user to hompage if they are not logged in
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import ReviewForm from './components/Reviews/ReviewForm';
import TaskView from './components/Tasks/tasksView/taskView';
import TaskForm from './components/Tasks/taskForm/taskForm';
import SingleTask from './components/Tasks/SingleTask/SingleTask';
import MyProfile from './components/Profile/MyProfile';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // not returning a promise, it's an IIFE
    //this runs to see if there is a currently logged in user
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
          <ReviewForm />
        </ProtectedRoute>
        <Route path="/tasks" exact={true}>
          <TaskView />
        </Route>
        <ProtectedRoute path="/tasks/new">
          <TaskForm />
        </ProtectedRoute>
        <Route path='/tasks/:id'>
          <SingleTask />
        </Route>
        <ProtectedRoute path='/profile' exact={true}>
          <MyProfile/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
