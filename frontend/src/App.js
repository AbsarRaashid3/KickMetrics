import { Container } from 'react-bootstrap';
import { useEffect } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signIn';
  const isResetPassPage = location.pathname === '/forgot-password';
  
  const darkMode = useSelector((state) => state.ui.darkMode);
  
  

  return (

    <div style={{
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#000',
    }}>
      <Header />  
      <main className='py-3'>
        {isAuthPage || isResetPassPage ? (
          <div className="custom-container">
          <Outlet /> 
          </div>) : (
          <Container>
            <Outlet />
          </Container>
        )}
      </main>
    
      <Footer />
    </div>
  );
};





export default App;