
import './App.css';
import React,{useState,useEffect} from 'react'
// import Navbar from './Component/Navbar/Navbar.js'
// import Dashboard from './Pages/Dashboard/Dashboard';
// import DashboardDoctor from './DoctorPages/Dashboard/Dashboard'
import IndexRoutes from './Routes/index'
function App() {
  // const[login, setLogin] = useState()
  // const[loginP, setLoginP] = useState(localStorage.getItem('email'))
  // // await AsyncStorage.setItem('email', data.email)

  return (
    <IndexRoutes/>
    // <div>
    //   {loginP?<Dashboard/>:<Navbar/> }
    //   {/* {login?<DashboardDoctor/>:''} */}
    //   {/* {!login && !loginP?<Navbar/>:''} */}
    // </div>
  );
}

export default App;
