import { useUser } from '../hooks/apiHooks';
import React, { useState } from 'react';

const Profile = () => {
  
  const [ user, setUser ] = useState(null);
  const { getUserByToken } = useUser();
  
  const fetchUser = async () => {
    const token = localStorage.getItem('token')

    if (token) {
      const userResult = await getUserByToken(token);
      setUser(userResult.user);
    }
  };
  fetchUser();

  console.log('user', user)

  return (
    <>
  <h2>Profile</h2>
  {user && (
    <>
    <p>Username: {user.username} </p>
    <p>Email: {user.email} </p>
    <p>Register Date: {new Date(user.created_at).toLocaleString('fi-FI')} </p>
    </>
  )}
  </>
  )
}

export default Profile