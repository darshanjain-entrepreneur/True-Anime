import React , {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast"
import axios from 'axios';
import { useNavigate , useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {

   
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [auth ,setAuth] = useAuth();
   
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = async  (e) => {
        e.preventDefault();
       try {
    
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{
            email ,password 
        })
    
        if(res && res.data.success){
          setTimeout(() => {
            toast.success(res.data.message);
    
          },100);

          setAuth({
            ...auth ,
            user:res.data.user,
            token:res.data.token
          })
           localStorage.setItem('auth' ,JSON.stringify(res.data));

          navigate(location.state || "/");
          
        }else{
            toast.error(res.data.message);
            
        }
        
       } catch (error) {
        toast.error(error.message);
       }
    
    }


  return (
    <Layout title={"Register - True Anime"}>
    <div className="register login">
    
    <form onSubmit={handleSubmit}>
    <h3>Login</h3>
   
   <div className="mb-3">
    
     <input placeholder='Email' type="email" className="form-control" id="exampleInputEmail1"value={email}  
     onChange={(e) => setEmail(e.target.value)} required/>
     </div>
   <div className="mb-3">
     
     <input placeholder='Password' type="password" className="form-control" id="exampleInputPassword1"value={password} 
     onChange={(e) => setPassword(e.target.value)} required/>
   </div>
   
   <button  type="button" onClick={() => {navigate('/forget-password')}} className="btn btn-primary forgetpasswordbutton">FORGOT PASSWORD</button>
   <button type="submit" className="btn btn-primary">LOGIN</button>
 </form>
 
 
    </div>
   </Layout>
  )
}

export default Login