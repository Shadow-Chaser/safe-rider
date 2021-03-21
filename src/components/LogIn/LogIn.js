import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';



const LogIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({
      isSignedIn : 'false',
      name:'',
      email:'',
      password:''
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    // console.log(user);
    // console.log(loggedInUser);

    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }
    else
    {
        firebase.app();
    }

   
    const handleGoogleSignIn = () => {
       
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            history.replace(from);
            // console.log(displayName, email);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            // console.log(errorCode, errorMessage, email);
        });
    }


    const handleBlur=(event)=>{

      let isFormValid = true;

      if(event.target.name ==='email'){
          isFormValid = /(.+)@(.+){2,}\.(.+){2,}/.test(event.target.value)
      }
      let password;
      if(event.target.name ==='password'){
        password = ""+event.target.value;
        console.log("password :"+password);
        const isPasswordValid = event.target.value.length > 6;
        const hasNumber = /\d{1}/.test(event.target.value);
        isFormValid = isPasswordValid && hasNumber; 

      }

      if(event.target.name==='confirm-password'){
        const confirmPassword = ""+event.target.value;
        console.log("conf password :"+confirmPassword);
        (password === confirmPassword)? isFormValid=true: isFormValid=false;
      }

      console.log(isFormValid);

      if(isFormValid){
        const newUser = {...user};
        newUser[event.target.name] = event.target.value;
        // console.log(newUser);

        setUser(newUser);


      }


    }

   

    const handleSubmit=(event)=>{
      if(newUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res =>{

          const newUserInfo = {...user};
          // newUserInfo.isSignedIn = true; 
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          updateUserName(user.name)
          history.push(from);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
      }


      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res =>{

          var {displayName, email} = res.user;
          console.log(res.user);
          const signedInUser = {name: displayName, email} 
          setLoggedInUser(signedInUser);

          const newUserInfo = {...user};
          newUserInfo.isSignedIn = true; 
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          // updateUserInfo(user.name);
          console.log(user.name);
          history.push(from);
        
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // console.log(errorMessage);
        });
      }
      event.preventDefault()
    }


    const updateUserName = name =>{
      const user = firebase.auth().currentUser;
  
      user.updateProfile({
        displayName: name
      }).then(function() {
        console.log('user name updated successfully')
      }).catch(function(error) {
        console.log(error)
      })
    }


    return (
        <div>
      
        <h1>Auth</h1>
        <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
          <label htmlFor="newUser"> Already User?</label>
          <br/>

        <form onSubmit={handleSubmit}>
          
          {newUser && <input type="text" name='name'  onBlur={handleBlur} placeholder='Name' required/>}
          <br/>
          <input type="text" name='email' onBlur={handleBlur} placeholder='Email' required/>
          <br/>
          <input type="password" name="password" id="1" onBlur={handleBlur} placeholder='Password' required/>
          <br/>
          {newUser && <input type="password" name="confirm-password" id="2" onBlur={handleBlur} placeholder='Confirm Password' required/>}
          <br/>
          <input type="submit" value="Submit"/>
        </form>
                
        <br/> <br/> 
        <button onClick={handleGoogleSignIn}>SignIn with Google</button>
        </div>
    );
};

export default LogIn;



