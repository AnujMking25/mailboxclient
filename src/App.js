import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignUpPage from './Component/SignUp/SignUpPage';
import MailBox from './Component/MailBox/MailBox';
function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<SignUpPage/>} />
        <Route path='/mailbox' element={<MailBox/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
