
import './App.css';
import AuthForm from './components/Auth/AuthForm';
import Header from './components/Body/Header';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Body/Home';
import AuthContext from './store/auth-context';
import { useContext } from 'react';


function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/home' element={authCtx.isLogin ? <Home /> : <Navigate to="/auth" />} />
        <Route path='/auth' element={authCtx.isLogin ? <Navigate to='/home' /> : <AuthForm />} />
        <Route path='/' element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
