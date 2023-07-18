import React , {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

const [name , setName] = useState("");
const [email , setEmail] = useState("");
const [password , setPassword] = useState("");
const [ phone, setPhone] = useState("");
const [address , setAddress] = useState("");
const navigate = useNavigate();

const handleSubmit = async  (e) => {
    e.preventDefault();
   try {

    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{
        name , email ,password , phone , address
    })

    if(res.data.success){
      setTimeout(() => {
        toast.success(res.data.message);

      },100);
      navigate("/login");
      
    }else{
        toast.error(res.data.message);
    }
    
   } catch (error) {
    
   }

}


  return (
  <Layout title={"Register - True Anime"}>
   <div className="register">
    <h1>Register</h1>
   <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1"value={name} 
    onChange={(e)=> setName(e.target.value)} required/>
    </div>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail1"value={email}  
    onChange={(e) => setEmail(e.target.value)} required/>
    </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"value={password} 
    onChange={(e) => setPassword(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Phone</label>
    <input type="text" className="form-control" id="exampleInputEmail1"value={phone} 
    onChange={(e) => setPhone(e.target.value)} required/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputEmail1" value={address}
    onChange={(e) => setAddress(e.target.value)} required/>
    </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>


   </div>
  </Layout>
  )
}

export default Register