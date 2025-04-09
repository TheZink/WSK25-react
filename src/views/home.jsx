import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import { fetchData } from '../utils/fetchData';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [user, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log('selectedItem', selectedItem);
  
  useEffect(() => {
    const getMedia = async () => {

      try {
        const mediaData = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
        
        const url = ""
        
        const userIds = mediaData.map((user_id) => user_id);
        console.log('userIds', userIds);
        
        const authApiUrl = import.meta.env.VITE_AUTH_API;
        
        const newData = await Promise.all(
          mediaData.map( async (item) => { 
            const data = await fetchData(`${authApiUrl}/users/${item.user_id}`) 
            return {...item, username: data.username}
          }));
          setMediaArray(newData);



      } catch (error){
        console.error('error', error);
      };

    };
    getMedia();
  }, []);

  console.table('mediaAdday', mediaArray);

  return (
    <>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />

      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;