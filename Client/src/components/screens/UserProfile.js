import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
const Profile = () => {
    const [userProfile,setProfile] =useState(null)
    // const [showfollow,setShowFollow] = useState(true)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    // console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // setPicture(result.mypost)
            // console.log(result)
           
            setProfile(result)
        })

    },[])

    const followUser = () =>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type" :"application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)
        })
    }


    const unfollowUser = () =>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type" :"application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=> item!= data._id)
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowFollow(true)
            
        })
    }


    return (
        <>
        {userProfile ?
        
        <div style={{maxWidth:"850px",margin:"0px auto"}}>
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid grey"
        }}>
            <div>
            <img style={{width:"180px",height:"190px", borderRadius:"60px"}}
            src={userProfile.user.pic}
            />
            </div>

       
        
        {/* <h4> {state?state.name:"loading "}</h4> */}
        <div>
            <h6> <b> User Information: </b> <a class="waves-effect waves-light btn" href="mailto:"><i class="material-icons left">email</i>Email</a> </h6>
            <h4>Name: {userProfile.user.name}</h4>
            <h5>Email: {userProfile.user.email}</h5>
            {/* <h4> {userProfile.user.facebookID</h4> */}
            {/* eitar bhitore arekta div dibo  */}
            <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
            <h6>{userProfile.posts.length}  posts  </h6>
            <h6>{userProfile.user.followers.length}  Followers </h6>
            <h6>{userProfile.user.following.length}  Following </h6>

            </div>
            {showfollow?
            <button style={{margin: "5px"}} className="btn waves-effect waves-light " 
            onClick={()=>followUser()}
            > 
               Follow

            </button>

            :

            <button style={{margin: "5px"}} className="btn waves-effect waves-light " 
            onClick={()=>unfollowUser()}
            > 
               UnFollow

            </button>

        
        
             }
            

                

            {/* <div>

            </div> */}

        </div>
    </div>
   
        <div className="gallery">
            {
                userProfile.posts.map(item=>{
                    return (
                        <img key ={item._id}className="item" src ={item.photo} alt={item.title}/>
                    )
                })
            }
     
        </div>
   
    </div>
        
        
        
        : <h5> Connecting to the servers .... </h5>}
       
        </>
    )
}

export default Profile