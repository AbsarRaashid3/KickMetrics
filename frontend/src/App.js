import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signIn';
  const isResetPassPage = location.pathname === '/forgot-password';

  return (
    <>

      <Header />  
      <main className='py-3'>
        {isAuthPage || isResetPassPage ? (
          <div className="custom-container">
            <Outlet /> 
          </div>
        ) : (
          <Container>
            <Outlet />
          </Container>
        )}
      </main>
      <Footer />
    </>
  );
};

export default App;
