import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

//M.toast({html:"Email Verified Successfully. ",classes:"#43a047 green darken-1"})
const Signin = () => {
    
    const{state,dispatch} = useContext(UserContext)
    const history = useHistory()
    // // const [name,setName] = useState("")
    // sign in e user name lagbe na 
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                // name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data)
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})

            }
            else {
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signed in Successfully. ",classes:"#43a047 green darken-1"})
                history.push('/')

                // - / - eita home page e jacche 
            }
        }).catch(err=>{
            console.log(err)
        })
    }


    return (
        <div className = "mycard">
            <div className="card auth-card ">
             <img src="https://res.cloudinary.com/cloud-photo-me/image/upload/v1593109952/22560792_jks4fq.jpg"/>
                <h2 className="Photo-me"> Photo.me</h2>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                {/* #64b5f6 blue lighten-2 */}
                <button className="btn waves-effect waves-light " 
                onClick={()=>PostData()}
                > 
                   Login
 
                </button>

                <h5> 
                    <Link to ="/signup" >Do not have an account ? </Link>
                </h5>

                <div class="card-content">
          <p><em> Photo.me is MERN stack Web Application. </em> </p>
          <p> <em>Developed by SRABON and SHAFIN </em></p>

          <img src="https://res.cloudinary.com/cloud-photo-me/image/upload/v1593110033/4394556_vxer3j.jpg"/>
        </div>

            </div>
            
            
        </div>
        

        
    )

    
}

export default Signin