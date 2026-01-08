import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import NavbarItem from './component/NavbarItem';

import FooterItem from './component/FooterItem';
import Home from './component/Home';
import Login from './component/Login';
import AdminPanel from './component/AdminPanel';

// Private Route Component
const PrivateRoute = ({ children }) => {
  // Check for authentication (mocked using localStorage)
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavbarItem />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          } 
        />
      </Routes>

      <FooterItem />
    </div>
  )
}

export default App;