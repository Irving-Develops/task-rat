import React from 'react';
import { demoLogin } from '../../store/session';
import { useDispatch } from 'react-redux';

const DemoUser = ({ modalCheck }) => {
  const dispatch = useDispatch();

  const handleDemoLogin = async (e) => {
    e.preventDefault()
    return dispatch(demoLogin())
  }

  if (modalCheck) {
    return <button onClick={handleDemoLogin}> [Demo User] </button>
  }

  return (
    <button id='demo-user-btn' onClick={handleDemoLogin}> Demo User </button>
  );
}

export default DemoUser;
