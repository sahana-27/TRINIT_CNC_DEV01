import './App.css';
import LandingPage from './screens/common/LandingPage/LandingPage';
import DashboardNGO from './screens/NGO/DashboardNGO/DashboardNGO';
import DashboardPhil from './screens/phil/DashboardPhil/DashboardPhil';
import CreateProfileNGO from './screens/NGO/CreateProfileNGO/CreateProfileNGO';
import CreateProfilePhil from './screens/phil/CreateProfilePhil/CreateProfilePhil';
import {BrowserRouter,Routes,Route} from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
       <main style={{minHeight:"93vh"}}>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}></Route>
        <Route exact path='/dashboardNGO' element={<DashboardNGO/>}></Route>
        <Route exact path='/dashboardPhil' element={<DashboardPhil/>}></Route>
        <Route exact path='/createProfileNGO' element={<CreateProfileNGO/>}></Route>
        <Route exact path='/createProfilePhil' element={<CreateProfilePhil/>}></Route>      
      </Routes>
      </main>
    </BrowserRouter>  
  );
}

export default App;
