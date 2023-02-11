import './App.css';
import LandingPage from './screens/common/LandingPage/LandingPage';
import LoginPage from './screens/common/LoginPage/LoginPage';
import Dashboard from './screens/common/Dashboard/Dashboard';
import RegistrationPage from './screens/common/RegistrationPage/RegistrationPage';
import CreateProfileNGO from './screens/NGO/CreateProfileNGO/CreateProfileNGO';
import CreateProfilePhil from './screens/phil/CreateProfilePhil/CreateProfilePhil';
import {BrowserRouter,Routes,Route} from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
       <main style={{minHeight:"100vh"}}>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}></Route>
        <Route exact path='/login' element={<LoginPage/>}></Route>
        <Route exact path='/dashboard' element={<Dashboard/>}></Route>
        <Route exact path='/register' element={<RegistrationPage/>}></Route>
        <Route exact path='/createProfileNGO' element={<CreateProfileNGO/>}></Route>
        <Route exact path='/createProfilePhil' element={<CreateProfilePhil/>}></Route>      
      </Routes>
      </main>
    </BrowserRouter>  
  );
}

export default App;
