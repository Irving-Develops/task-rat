import React from 'react';
import { demoLogin } from '../../store/session';
import { useDispatch } from 'react-redux';

const DemoUser = () => {
  const dispatch = useDispatch();

  const handleDemoLogin = async (e) => {
    e.preventDefault()
    return dispatch(demoLogin())
  }

  return (
    <button onClick={handleDemoLogin}> Demo User </button>
  );
}

export default DemoUser;
