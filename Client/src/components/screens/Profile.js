import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import M from 'materialize-css'

import {Link} from 'react-router-dom'

const Profile = () => {
    
    // const [mypicture,setPicture] =useState([])
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)

    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")


    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.mypost)
        })

    },[])
    
    useEffect(()=>{
        if(image){
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
           // setUrl(data.url)
            // console.log(data)
            
            localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
            dispatch({type:"UPDATEPIC",paylaod:data.url})
           
            fetch('/updatepic',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    pic:data.url
                })
            }).then(res=>res.json())
            window.location.reload()
            .then(result=>{
               
                console.log(result)
                // localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
                // dispatch({type:"UPDATEPIC",paylaod:result.pic})
                //  window.location.reload()
            })
             //window.location.reload()
        })
        .catch(err=>{
            console.log(err)
        })
        }
    },[image])
    const updatePhoto=(file)=>{
        setImage(file)
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

    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result =>{
           // console.log(result)
           const newData = data.map(item=>{
            if(item._id==result._id){
                return result
            }else{
                return item
            }
        })
        setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result =>{
            // console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }


    const makeComment = (text,postId) =>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:postId,
                //ekta postId key arekta value 
                text:text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
                
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const deletePost = (postid) =>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization: "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            M.toast({html:"Deleted Post Succesfully ",classes:"#43a047 red darken-3"})
            setData(newData)
        })
    }

    const deleteComment = (postid) =>{
        fetch(`/deletecomment/${postid}`,{
            method:"delete",
            headers:{
                Authorization: "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            M.toast({html:"Deleted comment Succesfully ",classes:"#43a047 red darken-3"})
            setData(newData)
        })
    }


    return (
        <div style={{maxWidth:"850px",margin:"0px auto"}}>
            
            <div style={{
                // display:"flex",
                // justifyContent:"space-around",
                margin:"18px 50px",
                borderBottom:"1px solid grey"
            }}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                // margin:"18px 50px",
                // borderBottom:"1px solid grey"
            }}>
                <div>
                <img style={{width:"180px",height:"190px", borderRadius:"60px"}}
                src= {state?state.pic:"loading"}
                />
               
                
                </div>

           
            <div>
            {/* <h4> {state?state.name:"loading "}</h4> */}
                <h6> <b> User Information: </b> <a class="waves-effect waves-light btn" href="mailto:"><i class="material-icons left">email</i>Email</a> </h6>
                <h4>Name: {state?state.name:"Please wait a while "}</h4>
                <h5>Email: {state?state.email:"Please wait a while "}</h5>
                
                {/* eitar bhitore arekta div dibo  */}
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                <h6>{data.length} Posts  </h6>
                {/* <h6>{followers.length:"0"} Followers </h6> */}
                <h6>{state?state.followers.length:"0"} Followers </h6>
                <h6>{state?state.following.length:"0"} Following </h6>

                

                </div>
                <div>

                </div>

            </div>
        </div>
       
        {/* <button className="btn waves-effect waves-light " 
              style={{margin:"10px 0px 10px 100px"}}
              onClick={()=>{
                  updatePhoto()
              }}
               > 
                  Update Photo 

               </button> */}

               <div className="file-field input-field" style={{margin:"40px"}}>
                    <div className="btn">
                        <span>Update Profile Photo</span>
                        <input type="file" accept=".jpg, .jpeg, .png"
                            onChange={(e) => updatePhoto(e.target.files[0])}
                        //array er zero index theke save suru 
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>


               </div>
       
        <div className="home" > 
        {
            data.map(item=>{
                return(
                    <div  className="card home-card" key={item._id}>
                    {/* <h5> SrabonFreak </h5>  */}

                    <h5 style ={{padding:"10px"}}> <Link to ={item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id :  "/profile/"+item.postedBy._id}>  {item.postedBy.name} </Link>
                   {/* uporer like e correction korsi not like mksh */}
                   
                    {/* post delete  */}
                    {item.postedBy._id == state._id
                    && 
                    <i className="material-icons" style={{float:"right",color:"red"
                }}
                onClick={()=>deletePost(item._id)}
                >delete</i>
                    } </h5>
                    <div className= "card-image"> 
                        <img src={item.photo} />
                        </div>
        
                        <div className="card-content">
                        <i className="material-icons" style={{color:"red"}}>favorite</i>
                        {item.likes.includes(state._id)
                        ?
                            <i className="material-icons"
                            onClick={()=>{unlikePost(item._id)}}
                            >thumb_down</i>

                         :   

                         <i className="material-icons"
                         onClick={()=>{likePost(item._id)}}
                         >thumb_up</i>
                        }
                       

                        
                            {/* <h6> Title </h6> */}
                            <h6>{item.likes.length}</h6>
                            <h6>{item.title}</h6>
                            <p> {item.body} </p>
                            {
                                item.comments.map(record=>{
                                    return (
                                        <h6 key={record._id}> <span style={{fontWeight:"500"}}> {record.postedBy.name} </span> {record.text} 
                                        {/* comment delete  */}
                                        {item.postedBy._id == state._id
                                            && 
                                            <i className="material-icons" style={{float:"right",color:"red"
                                        }}
                                        onClick={()=>deleteComment(item._id)}
                                        >delete</i>
                                            }

                                        </h6>
                                    )
                                
                                })
                                
                            }
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                makeComment(e.target[0].value,item._id)
                            }}>
                            <input type ="Text" placeholder="Add a comment "/>
                            
                            </form>
                            
        
        
                        </div>
        
                </div>
                 
                )
            })
        }
        

        </div>

       
            {/* <div className="gallery">
                {
                    mypicture.map(item=>{
                        return (
                            <img key ={item._id}className="item" src ={item.photo} alt={item.title}/>
                        )
                    })
                }
         
            </div> */}
       
        </div>
    )
}

export default Profile