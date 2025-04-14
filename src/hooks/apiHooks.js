import { fetchData } from '../utils/fetchData';
import React, { useCallback, useEffect, useState } from 'react';
import {uniqBy} from 'lodash';


const mediaApiUrl = import.meta.env.VITE_MEDIA_API;
const authApiUrl = import.meta.env.VITE_AUTH_API;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(`${mediaApiUrl}/media`);
      const uniqueUserIds = uniqBy(mediaData, 'user_id');

      const userData = await Promise.all(
        uniqueUserIds.map((item) =>
          fetchData(`${authApiUrl}/users/${item.user_id}`),
        ),
      );

      const userMap = userData.reduce((map, {user_id, username}) => {
        map[user_id] = username;
        return map;
      }, {});

      const newData = mediaData.map((item) => ({
        ...item,
        username: userMap[item.user_id],
      }));

      setMediaArray(newData);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return mediaArray;
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(authApiUrl + '/auth/login', fetchOptions);
    console.log('loginResult', loginResult);

    window.localStorage.setItem("token", loginResult.token);

    return loginResult;
  };
  
  return {postLogin};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const registerResult = await fetchData(authApiUrl + '/users', fetchOptions)
    console.log('registerResult', registerResult)
    return {registerResult}
  }

  const getUserByToken = useCallback(async (token) => {
    const fetchOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer: ' + token,
      },
    };

    const userResult = await fetchData(authApiUrl + '/users/token', fetchOptions);
    console.log('userResult', userResult);
    return (userResult)
  }, []);
  return {getUserByToken, postUser};
}



export {useMedia, useAuthentication, useUser};