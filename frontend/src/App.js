import './App.css';
import { UserProvider } from './context/userContext';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import DashBoard from './components/DashBoard';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </div>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
