import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
// protected route = custom component that will return a user to hompage if they are not logged in
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import TaskView from './components/Tasks/tasksView/taskView';
import TaskForm from './components/Tasks/taskForm/taskForm';
import SingleTask from './components/Tasks/SingleTask/SingleTask';
import MyProfile from './components/Profile/MyProfile';
import TagView from './components/TagView/TagView';


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
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route>
        <Route path="/tasks" exact={true}>
          <TaskView />
        </Route>
        <Route path="/tasks/new">
          <TaskForm />
        </Route>
        <Route path='/tasks/:id'>
          <SingleTask />
        </Route>
        <Route path='/tags/:id'>
          <TagView />
        </Route>
        <ProtectedRoute path='/profile' exact={true}>
          <MyProfile/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
