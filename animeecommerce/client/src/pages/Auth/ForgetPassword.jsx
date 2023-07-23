import React , {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast"
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


const ForgetPassword = () => {
    
    const [email , setEmail] = useState("");
    const [newPassword , setNewpassword] = useState("");
    const [answer , setAnswer] = useState("");
   
   
    const navigate = useNavigate();
   
    
    const handleSubmit = async  (e) => {
        e.preventDefault();
       try {
  
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{
            email , answer , newPassword
        })
    
        if(res && res.data.success){
          setTimeout(() => {
            toast.success(res.data.message);
    
          },100);

         

          navigate("/login");
          
        }else{
            toast.error(res.data.message);
            
        }
        
       } catch (error) {
        toast.error(error.message);
       }
    
    }
  return (
   <Layout>
    <div className="register login">
    
    <form onSubmit={handleSubmit}>
    <h3>RESET PASSWORD</h3>
   
   <div className="mb-3">
    
     <input placeholder='Email' type="email" className="form-control" id="exampleInputEmail1"value={email}  
     onChange={(e) => setEmail(e.target.value)} required/>
     </div>
   <div className="mb-3">
    
     <input placeholder='Your Favourite Anime' type="text" className="form-control" id="exampleInputEmail1"value={answer}  
     onChange={(e) => setAnswer(e.target.value)} required/>
     </div>
   <div className="mb-3">
     
     <input placeholder='New Password' type="password" className="form-control" id="exampleInputPassword1"value={newPassword} 
     onChange={(e) => setNewpassword(e.target.value)} required/>
   </div>
   

   <button type="submit" className="btn btn-primary">RESET</button>
 </form>
 
 
    </div>
   </Layout>
  )
}

export default ForgetPassword