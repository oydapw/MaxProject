// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('email').value = userData.email;
                    document.getElementById('password').value = userData.password;
                } else {
                    showErrorModal("Не найден документ, соответствующий идентификатору");
                }
            })
            .catch((error) => {
                showErrorModal("Ошибка при получении документа");
            });
    } else {
        showErrorModal("Идентификатор пользователя не найден в локальном хранилище");
    }
});

const logoutButton = document.getElementById('exitButton');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            showErrorModal('Ошибка при выходе из системы:', error);
        });
});
