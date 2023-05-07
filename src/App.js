import { Routes, Route} from 'react-router-dom';
import './App.css';
import SignUpPage from './Component/SignUp/SignUpPage';
import {lazy,Suspense} from 'react';
import { useSelector } from 'react-redux';
const ForgetPassword=lazy(()=>import('./Component/ForgetPassword/ForgetPassword'));
const Home=lazy(()=>import('./Component/HomePage/Home'));
function App() {
  const isAuth=useSelector(state=>state.auth.isAuth);

  return (
    <div className='maindiv'>
      <Routes>
        <Route exact path='/' element={<SignUpPage/>} />
       {isAuth && <Route path='/Home' element={<Suspense><Home/></Suspense> }/>} 
       <Route path='/forgatePassword' element={<Suspense><ForgetPassword/></Suspense> }/>
      </Routes>
      
    </div>
  );
}

export default App;
