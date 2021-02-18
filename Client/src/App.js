import React,{useEffect,createContext,useReducer,useContext} from 'react';
// import logo from './logo.svg';
// import './App.css';
import NavBar from './components/Navbar'
import './App.css'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,intialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts   from './components/screens/SubscribedUserPosts'
import Dev from './components/screens/Dev'

 export const UserContext = createContext()

const Routing =()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }else{
      history.push('/signin')
    }
  },[])
  return(
    <Switch> 
    <Route exact path="/">
      <Home/>
   </Route>

    <Route path ="/signin">
      <Signin/> 
    </Route>
    
    <Route path ="/signup">
      <Signup/> 
    </Route>
    
    <Route exact path ="/profile">
      <Profile/> 
    </Route>

    <Route path ="/createpost">
      <CreatePost/> 
    </Route>
    <Route path ="/profile/:userid">
      <UserProfile/> 
    </Route>

    <Route path ="/mysubscribedpost">
      <SubscribedUserPosts/> 
    </Route>

    <Route path ="/dev">
      <Dev/>
    </Route>

    </Switch>
  )
}

function App() {
  const[state,dispatch] = useReducer(reducer,intialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter> 
    <NavBar/>
    <Routing/>
    
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
