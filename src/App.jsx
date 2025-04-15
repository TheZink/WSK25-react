import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router';
import Layout from './components/layout';
import Profile from './views/Profile.jsx';
import Single from './views/Single.jsx';
import Upload from './views/Upload.jsx'
import Home from './views/home.jsx';
import Login from './views/login.jsx';
import Logout from './views/logout.jsx';
import { UserProvider } from './UserContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <BrowserRouter basename = {import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} /> 
            <Route path="/single" element={<Single />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            </Route>
          </Routes>
        </UserProvider>
    </BrowserRouter>
  );
};
export default App
