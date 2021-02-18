import React, { useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Dev = () => {
    return (
        <div className="devsupport" style={{maxWidth:"850px",margin:"100px auto"}}> 
           <div> 
           <div > <img src="https://scontent.fdac24-1.fna.fbcdn.net/v/t1.0-1/c234.514.949.949a/s160x160/104048611_2644670589114476_553145250680054875_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_eui2=AeGUjEz8IKIzFwRt_z5qVz6Yu-rzP_rUGlu76vM_-tQaW2dlgjHv795ok9CxHRECV4KsI7Fi27PdqpWuCLoFrww_&_nc_ohc=JO0r6crhXywAX-zC8gL&_nc_ht=scontent.fdac24-1.fna&oh=831d47e7bc0f8b1648acc8fb8d6c880b&oe=5F1CCF07"/></div>
           
           <h4> Name : Srabon Bhomwik </h4>
           <h6> <b> For Dev Support : </b> <a class="waves-effect waves-light btn" href="mailto:srabonbhowmik7@email.com"><i class="material-icons left">email</i>Email</a> </h6>

           
           
           
           </div>

           <div style={{margin:"50px 0px"}}> 
           <div > <img src="https://res.cloudinary.com/cloud-photo-me/image/upload/v1593263253/100756312_1566849586808430_983569973462958080_o_ddqtqy.jpg"/></div>
           
           <h4> Name : Moshiur Rahman </h4>
           <h6 > <b> For Dev Support : </b> <a class="waves-effect waves-light btn" href="mailto:srabonbhowmik7@email.com" ><i class="material-icons left" >email</i>Email</a> </h6>

           
           
           
           </div>

           
        </div>

        
    )
}

export default Dev 