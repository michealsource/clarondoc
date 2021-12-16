
import './App.css';
import React,{useState} from 'react'
import Navbar from './Component/Navbar/Navbar.js'
import Dashboard from './Pages/Dashboard/Dashboard';
import DashboardDoctor from './DoctorPages/Dashboard/Dashboard'
function App() {
  const[login, setLogin] = useState(false)
  const[loginP, setLoginP] = useState(false)
  return (
    <div>
      {loginP?<Dashboard/>:'' }
      {login?<DashboardDoctor/>:''}
      {!login && !loginP?<Navbar setLogin={setLogin} setLoginP={setLoginP} login={login}/>:''}
    </div>
  );
}

export default App;
