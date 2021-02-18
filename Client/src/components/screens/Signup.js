// import React from 'react'

// const Signup = () =>{
//     return(
//         <h1> Signup </h1>
//     )
// }

// export default Signup

import React, { useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signin = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic = ()=>{
               //cloud e request jacche 
               const data = new FormData()
               data.append("file",image)
               data.append("upload_preset","photo-me")
               data.append("cloud_name", "cloud-photo-me")
               //network request 
               fetch("	https://api.cloudinary.com/v1_1/cloud-photo-me/image/upload",{
                   method:"post",
                   body:data
               })
               .then(res=> res.json())
               .then(data=>{
                   // console.log(data)
                   setUrl(data.url)
               })
               .catch(err=>{
                   console.log(err)
               })
    }
    

    const uploadFields = ()=>{
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid Email", classes: "#c62828 red darken-3" })
            return
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })

                }
                else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    history.push('/signin')
                }
            }).catch(err => {
                console.log(err)
            })
    }
    const PostData = () => {
        if(image){
            uploadPic()
        }else {
                uploadFields()
        }


   
    }



    return (
        <div className="mycard">
            {/* className e input-field backup  */}
            <div className="card auth-card ">
                <h2 className="Photo-me"> Photo.me</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Upload Profile Photo</span>
                        <input type="file" accept=".jpg, .jpeg, .png"
                            onChange={(e) => setImage(e.target.files[0])}
                        //array er zero index theke save suru 
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>


                {/* #64b5f6 blue lighten-2 */}
                <button className="btn waves-effect waves-light "
                    onClick={() => PostData()}
                >

                    Signup
                    
                </button>
                <h5>
                    <Link to="/signin" >Already have an account ? </Link>
                </h5>
                <div > <img src="https://res.cloudinary.com/cloud-photo-me/image/upload/v1593112411/7381696_l0pboa.jpg"/></div>
            </div>
            
        </div>
    )
}

export default Signin