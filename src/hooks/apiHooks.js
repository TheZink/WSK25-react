import { fetchData } from '../utils/fetchData';
import { useCallback, useEffect, useState } from 'react';
import {uniqBy} from 'lodash';


const mediaApiUrl = import.meta.env.VITE_MEDIA_API;
const authApiUrl = import.meta.env.VITE_AUTH_API;
const uploadApiUrl = import.meta.env.VITE_UPLOAD_SERVER

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

  const postMedia = async (file, inputs, token) => {
    const data = {
      ...inputs,
      ...file,
    }

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token}`
      },
      body: JSON.stringify(data),
    };

    return await fetchData(`${mediaApiUrl}/media`, fetchOptions)
  };

    const modifyMedia = async (inputs, token) => {
      const fetchOptions = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer: ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };
    
    return await fetchData(`${mediaApiUrl}/media/${inputs.id}`, fetchOptions);
    };

    const deleteMedia = async (id, token) => {
      const fetchOptions = {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer: ${token}`,
            'Content-Type': 'application/json',
          },
      };

    return await fetchData(`${mediaApiUrl}/media/${id}`, fetchOptions);
  };

  return {mediaArray, postMedia, deleteMedia, modifyMedia};
};

const tokenExistsInLocalstorage = () => Boolean(localStorage.getItem('token'));

const useAuthentication = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(tokenExistsInLocalstorage());

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
    setIsLoggedIn(tokenExistsInLocalstorage());

    return loginResult;
  };
  
  return {postLogin, isLoggedIn};
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
        Authorization: 'Bearer: ' + token,
      },
    };

    const userResult = await fetchData(authApiUrl + '/users/token', fetchOptions);
    console.log('userResult', userResult);

    return userResult
  }, []);
  
  return {getUserByToken, postUser};
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log('formData', formData)
    
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer: ' + token,
      },
      mode: 'cors',
      body: formData
    };

    const uploadResult = await fetchData(uploadApiUrl + '/upload', fetchOptions);
    console.log('userResult', uploadResult);
  };

  return {postFile};
};



export {useMedia, useAuthentication, useUser, useFile};