import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LiveFeed from './components/LiveFeed'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';  //signIN habiba waly mein
  const isResetPassPage = location.pathname === '/reset-password'; //forgot-password habiba waly mein

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
              <LiveFeed />
          </Container>
        )}
      </main>
      <Footer />
      {/* Toast container must be inside the app */}
  <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar newestOnTop />
</>
  
  );
};

export default App;
