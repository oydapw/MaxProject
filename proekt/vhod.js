 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
 
 const firebaseConfig = {
    apiKey: "AIzaSyCp0lwnMEdfxD-KXlPAESGYiHekurzbEPE",
    authDomain: "loginform-eabd6.firebaseapp.com",
    projectId: "loginform-eabd6",
    storageBucket: "loginform-eabd6.firebasestorage.app",
    messagingSenderId: "743829252947",
    appId: "1:743829252947:web:ccd5b8167c1155b10b8fa6"
  };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        console.log('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='cart.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            console.log('Incorrect Email or Password', 'signInMessage');
        }
        else{
            console.log('Account does not Exist', 'signInMessage');
        }
    })
 })