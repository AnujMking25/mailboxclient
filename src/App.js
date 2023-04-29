import { Routes, Route} from 'react-router-dom';
import './App.css';
import SignUpPage from './Component/SignUp/SignUpPage';
import Home from './Component/HomePage/Home';
import { useSelector } from 'react-redux';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import MessagePage from './Component/HomePage/MessagePage';
function App() {
  const isAuth=useSelector(state=>state.auth.isAuth)

  return (
    <div>
      <Routes>
        <Route exact path='/' element={<SignUpPage/>} />
       {isAuth && <Route path='/Home' element={<Home/>}>
              <Route path='/Home/page' element={<MessagePage/>}/>
                  </Route>} 
       <Route path='/forgatePassword' element={<ForgetPassword/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
