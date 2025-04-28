import {Link, Outlet} from 'react-router';
import { useUserContext } from '../hooks/contextHooks';
import { useEffect } from 'react';

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();
  
  useEffect(() => {
    handleAutoLogin();
    console.log('autologin')
  }, []);
  
  return (
    <div>
      <header>
      <h1 className="text-4xl- mb-4">My app</h1>
      <nav>
        <ul className='flex justify-end list-none p-2 mb-2 bg-[#333] **:p-4 **:hover:bg-[#111]'>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
            <Link to="/logout">logout</Link>
            </li>
            </>)
           :
           (
            <>
            <li>
            <Link to="/login">Login</Link>
            </li>
            </>)
          }
        </ul>
      </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
