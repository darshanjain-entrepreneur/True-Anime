import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
  <div className="text-center">

  <div className="list-group">
  <h4 ><Link to={"/dashboard/user"} style={{color:"black" , textDecoration: "none"}}>Dashboard</Link></h4>
  <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
  <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
 

</div>
  </div>

    </>
  )
}

export default UserMenu