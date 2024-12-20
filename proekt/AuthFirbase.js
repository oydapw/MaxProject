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

 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }
 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value
    
    let errorMessage = document.getElementById('errorMessage');
    if (password !== confirmPassword) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        alert('Вы успешно зарегистрировались!');
    }

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid)
        const userData={        
            email: email,
            password: password,
        };
        console.log('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='cart.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);
        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            console.log('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            console.log('unable to create User', 'signUpMessage');
        }
    })
 });

 