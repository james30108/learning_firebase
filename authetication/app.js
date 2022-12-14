
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

// * ติดต่อ Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBu4obwj9NgyhdUG2CKafjICsx1zImLJ3w",
    authDomain: "fir-learning-41e65.firebaseapp.com",
    projectId: "fir-learning-41e65",
    storageBucket: "fir-learning-41e65.appspot.com",
    messagingSenderId: "774206344894",
    appId: "1:774206344894:web:93de33c5ecf9651e3a98ef",
    measurementId: "G-PB4NG078N5"
  };

const app = initializeApp(firebaseConfig);

// -------------------------------------------------

// * การเข้าสู่ระบบ

// * เรียกใช้งาน Auth ของระบบ Firebase
const auth          = getAuth (app)

// ตัวแปร
const formarea      = document.getElementById ("form-area")
const registerform  = document.getElementById ("registerform")
const profile       = document.getElementById ("profile")
const welcome       = document.getElementById ("welcome")
const logout        = document.getElementById ("logout")
const loginform     = document.getElementById ("loginform")

// สมัครใช้งาน
registerform.addEventListener("submit", (event) => {

    // ทำให้ฟอร์มไม่รีเซ็ตหน้า
    event.preventDefault ()

    const email     = registerform.email.value
    const password  = registerform.password.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        
        // Signed in 
        const user = userCredential.user;
        
        // รีเซ็ตให้ form เป้นค่าว่าง
        registerform.email.value    = ""
        registerform.password.value = ""

        // เปลี่ยนรูปแบบการแสดงของหน้าจอ

        // ...
        alert ("สร้างบัญชีเสร็จเรียบร้อย")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert (errorMessage)
    });
    
})

// ตรวจสอบการเข้าสู่ระบบ
onAuthStateChanged (auth, (user) => {

    // login
    if (user) {
        profile.style.display = "block"
        formarea.style.display = "none"
        welcome.innerText = "ยินดีต้อนรับ " + user.email
    }
    else {
        profile.style.display = "none"
        formarea.style.display = "block"
    }
})

// ออกจากระบบ
logout.addEventListener("click", (event) => {

    signOut (auth),then (() => {
        alert ("ออกจากระบบเรียบร้อย")
    })
    .catch ((error) => {
        alert ("การออกจากระบบผิดพลาด")
    })
    
})

// เข้าสู่ระบบ
loginform.addEventListener("submit", (event) => {

    // ทำให้ฟอร์มไม่รีเซ็ตหน้า
    event.preventDefault ()

    const email     = loginform.email.value
    const password  = loginform.password.value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        
        // Signed in 
        const user = userCredential.user;
        
        // รีเซ็ตให้ form เป้นค่าว่าง
        loginform.email.value    = ""
        loginform.password.value = ""

        alert ("ลงชื่อเข้าใช้เรียบร้อย")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert (errorMessage)
    });
    
})