import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import {Home} from "./components/Home";
import {Dashboard} from "./components/Dashboard";
import {Profile} from "./components/Profile";
import { ToastContainer } from "react-toastify";

// import NotesApp from "./components/NotesApp";
import {Login} from "./components/Login";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
function App() {
 const [islogin, setIslogin] = useState(false);
const API_URL = import.meta.env.VITE_API_URL;


  //  const navigate = useNavigate();
useEffect(() => {
  const checklogin = async () => {
    try {
         const response = await fetch(`${API_URL}/api/users/islogin`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.message === "already login") {
        setIslogin(true);
      } else {
        setIslogin(false);
      }
    } catch (error) {
      console.error(error);
      setIslogin(false);
    } finally {
      // setLoading(false);
    }
  };

  checklogin();
}, []);


  
  return (
   <>
     <ToastContainer style={{ zIndex: 99999 }} 
     
  position="top-right"
  autoClose={1000}
  hideProgressBar
  newestOnTop
  closeOnClick
  draggable={false}
  theme="dark"
/>
      
    <BrowserRouter>
      <Routes>
      <Route path="/" element={islogin ? <Dashboard setIslogin={setIslogin}/> : <Home/>}/>
       <Route path="/login" element={<Login setIslogin={setIslogin}/>}/>
      // <Route path="/profile" element={islogin ? <Profile setIslogin={setIslogin}/> : <Home/>}/> 
      <Route path="*" element={<Home />} />

      </Routes>
    </BrowserRouter>
    </>
  );
}


export default App;
 
