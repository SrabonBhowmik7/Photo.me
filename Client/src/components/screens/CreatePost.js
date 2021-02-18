import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const CreatePost = () => {
    const history =useHistory()


    //useState apatoto khali field gula empty
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

    useEffect(()=>{
        if(url){

       
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " +localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                // name,
                title,
                body,
                picture:url
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data)
            // console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})

            }
            else {
                M.toast({html:"Created Post Successfully ",classes:"#43a047 green darken-1"})
                history.push('/')

                // - / - eita home page e jacche 
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])

    const postDetails = () => {

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
    return (
        <div className="card input-filed"
        style={{
            margin:" 30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"

        }}
        >
            <input 
            type="text" 
            placeholder="Category" 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input 
            type="text" 
            placeholder="Caption" 
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />

            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" accept=".jpg, .jpeg, .png"
                    onChange={(e) => setImage(e.target.files[0])}
                    //array er zero index theke save suru 
                    />
            </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
             </div>
                    </div>
                
                 <button className="btn waves-effect waves-light " 
                 onClick={()=> postDetails()}
                 > 
                   Submit Post 
                 </button>
                <div> <img src="https://res.cloudinary.com/cloud-photo-me/image/upload/v1593111683/21183794_ufczeo.jpg"/></div>
                 
                </div>
    )
}


export default CreatePost