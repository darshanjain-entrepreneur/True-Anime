// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {  Routes , Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";


function App() {
  return (
 <>
  <Header />
  <Routes>
 
<Route path='/' element={<HomePage/>}  />
<Route path='/register' element={<Register/>} />
<Route path='/login'element={<Login/>} />
<Route path='/about' element={<About/>}  />
<Route path='/contact' element={<Contact/>}  />
<Route path="/policy" element={<Policy/>} />
<Route path="*" element={<PageNotFound/>} />


</Routes>
<Footer />
 
 </>
   
 

  
  

  )
}

export default App;
