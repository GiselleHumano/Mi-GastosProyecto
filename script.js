//de register a login
const login = document.getElementById("login")
const register = document.getElementById("register") 

document.addEventListener(`click`, e => {
    if(e.target.matches (`#noCuenta`)){
        register.style.display =`block`;
        login.style.display= `none`;
    } else if(e.target.matches (`#siCuenta`)){
        register.style.display =`none`;
        login.style.display = `block`;
    }
}) 

//Register
class User {
    constructor(usuario, password, reapetPassword) {
        this.usuario = usuario
        this.password = password
        this.reapetPassword = reapetPassword
    }
}

const users = JSON.parse(localStorage.getItem("users")) ?? []
const formRegister = document.getElementById("formRegister")
const alertError = document.getElementById("alertError")

//Datos que ingresa el usuario
formRegister .addEventListener("submit", (e) => {
    e.preventDefault()
    const usuario = document.getElementById("usuario").value
    const password = document.getElementById("pw").value
    const reapetPassword = document.getElementById("pw2").value
    const user = new User(usuario, password, reapetPassword)
    users.push(user)
    formRegister .reset()

    if (usuario == "", password == "", reapetPassword == "") {
        Toastify({
            text: "Complete todos los campos para poder registrarse",
            duration: 3000,
            //destination: "https://github.com/apvarun/toastify-js",
            //newWindow: false,
            close: true,
            gravity: "bottom", 
            position: "right", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(to bottom, #fe8c00, #f83600)",
            },
        }).showToast();
    } else if (password != reapetPassword) {
        Toastify({
            text: "Las contraseñas no coinciden",
            duration: 3000,
            //destination: "https://github.com/apvarun/toastify-js",
            //newWindow: false,
            close: true,
            gravity: "bottom", 
            position: "right", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(to bottom, #fe8c00, #f83600)",
            },
        }).showToast();
// Si el Login es valido guarda los datos del usuario en el localStorage.
    } else {
        window.location.href = "./app/app.html"
        localStorage.setItem("users", JSON.stringify(users))
        Toastify({
            text: "Usted se registro con exito",
            duration: 3000,
            //destination: "https://github.com/apvarun/toastify-js",
            //newWindow: false,
            close: true,
            gravity: "bottom", 
            position: "right", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(to bottom, #fe8c00, #f83600)",
            },
        }).showToast();
    }
})

//Login
class LoginUsers {
    constructor(loginUser, loginPw) {
        this.loginUser = loginUser
        this.loginPw = loginPw 
}}

const usersRegistro = JSON.parse(localStorage.getItem("users")) ?? []
const loginUsers = JSON.parse(localStorage.getItem("loginUsers")) ?? []
const loginForm = document.getElementById("loginForm")
const dataError = document.getElementById("dataError")

//Requerimientos de datos que ingreso el usuario User/PW
loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const loginUser = document.getElementById("loginUser").value
    const loginPw = document.getElementById("loginPw").value

    const LoginUsers = new LoginUsers (loginUser,loginPw)
    loginUsers.push(loginUsers)

// Comparación de datos Login/Register

loginForm.reset()
    const okUser = usersRegistro.find(users => users.usuario == loginUser)
    const okPass = usersRegistro.find(users => users.password == loginPw)

    if (loginUser == "" || loginPw == "") {
        Toastify({
            text: "Falta llenar campos",
            duration: 3000,
            //destination: "https://github.com/apvarun/toastify-js",
            //newWindow: false,
            close: true,
            gravity: "bottom", 
            position: "right", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(to bottom, #fe8c00, #f83600)",
            },
        }).showToast();

    } else if (okUser == undefined || okPass == undefined) {
        Toastify({
            text: "El usuario o la contraseña son incorrectos",
            duration: 3000,
            //destination: "https://github.com/apvarun/toastify-js",
            //newWindow: false,
            close: true,
            gravity: "bottom", 
            position: "right", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(to bottom, #fe8c00, #f83600)",
            },
        }).showToast();

    } else if (loginUser == okUser["username"] && loginPw == okPass["password"]) {
        window.location.href = "./app/app.html"
        localStorage.setItem("loginUsers", JSON.stringify(loginUsers))
    }
})