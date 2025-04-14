import { fetchData } from '../utils/fetchData';
import React, { useEffect, useState } from 'react';

const useMedia =  () => {
    const [mediaArray, setMediaArray] = useState([]);

    const mediaUrl = import.meta.env.VITE_MEDIA_API;
    const authApiUrl = import.meta.env.VITE_AUTH_API;

    const getMedia = async () => {
      try {
        const mediaData = await fetchData( mediaUrl + '/media');
                
        const newData = await Promise.all(
          mediaData.map( async (item) => { 
            const data = await fetchData(`${authApiUrl}/users/${item.user_id}`) 
            return {...item, username: data.username}
          }));
          
          setMediaArray(newData);
    
      } catch (error){
        console.error('error', error);
      };
    }

  useEffect(() => {
    getMedia();
  }, []);

  return mediaArray;
}

export default useMedia;