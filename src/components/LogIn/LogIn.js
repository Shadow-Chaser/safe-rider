import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';



const LogIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email:''
      })
      console.log(user);

    const emailValidation = email =>  /(.+)@(.+){2,}\.(.+){2,}/.test(email); 
    const passwordValidation = input => /\d/.test(input);


    const switchingForm = event =>{
        const createdUser = {...user};
        createdUser.existingUser = event.target.checked;
        setUser(createdUser);
    }

    const handleChange = event =>{
        const newUserInfo = {
          ...user
    };

    let isValid = true;
    if(event.target.name === 'email'){
      isValid = emailValidation(event.target.value);
    }
    if(event.target.name === "password"){
      isValid = event.target.value.length > 8 && passwordValidation(event.target.value);
    }

    newUserInfo[event.target.name] = event.target.value;
    newUserInfo.isValid = isValid;
    setUser(newUserInfo);
  }


  const createAccount = (event) => {
    if(user.isValid){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        console.log(res);
        const createdUser = {...user};
        createdUser.isSignedIn = true;
        createdUser.error = '';
        setUser(createdUser);
      })
      .catch(err => {
        console.log(err.message);
        const createdUser = {...user};
        createdUser.isSignedIn = false;
        createdUser.error = err.message;
        setUser(createdUser);
      })
    }
    event.preventDefault();
    event.target.reset();
  }

  const signInUser = event => {
    if(user.isValid){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        console.log(res);
        const createdUser = {...user};
        createdUser.isSignedIn = true;
        createdUser.error = '';
        setUser(createdUser);
      })
      .catch(err => {
        console.log(err.message);
        const createdUser = {...user};
        createdUser.isSignedIn = false;
        createdUser.error = err.message;
        setUser(createdUser);
      })
    }
    event.preventDefault();
    event.target.reset();
  }


    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }
    else
    {
        firebase.app();
    }

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
       
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            history.replace(from);
            console.log(displayName, email);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode, errorMessage, email);
        });
    }


    return (
        <div>

         

            <h1>Our own Authentication</h1>
                <input type="checkbox" name="switchForm" onChange={switchingForm} id="switchForm"/>
                <label htmlFor="switchForm"> Already User?</label>
                <form style={{display:user.existingUser ? 'block': 'none'}} onSubmit={signInUser}>
                    <input type="text" onBlur={handleChange} name="email" placeholder="Your Email" required/>
                    <br/>
                    <input type="password" onBlur={handleChange} name="password" placeholder="Your Password" required/>
                    <br/>
                    <input type="submit" value="SignIn"/>
                </form>
                <form style={{display:user.existingUser ? 'none': 'block'}} onSubmit={createAccount}>
                    <input type="text" onBlur={handleChange} name="name" placeholder="Your Name" required/>
                    <br/>
                    <input type="text" onBlur={handleChange} name="email" placeholder="Your Email" required/>
                    <br/>
                    <input type="password" onBlur={handleChange} name="password" placeholder="Your Password" required/>
                    <br/>
                    <input type="submit" value="Create Account"/>
                </form>

                
        <br/> <button onClick={handleGoogleSignIn}>SignIn with Google</button>
        </div>
    );
};

export default LogIn;



