import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router';
import Layout from './components/Layout';
import Profile from './views/Profile.jsx';
import Single from './views/Single.jsx';
import Upload from './views/Upload.jsx'
import Home from './views/home.jsx';
import Login from './views/login.jsx';
import Logout from './views/logout.jsx';

const App = () => {
  return (
    <BrowserRouter basename = {import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/single" element={<Single />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App
