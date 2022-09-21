//de formUser a login
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
/*-----------------------------------------------------------------------------------------------*/

//alerta para iniciar sesión
Toastify({
    text: "Por favor, inicie sesión para poder acceder",
    duration: 3000,
    //destination: "https://github.com/apvarun/toastify-js",
    //newWindow: false,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, 
    style: {
    background:  "linear-gradient(to top, #373b44, #4286f4)",
    },
}).showToast();


//Register - Para que el usuario se registre y quede en el local storage
class User {
    constructor(username, password, reapetPassword) {
        this.username = username
        this.password = password
        this.reapetPassword = reapetPassword
    }
}

const users = JSON.parse(localStorage.getItem("users")) ?? []
const formUser = document.getElementById("formUser")
const mensajeError = document.getElementById("mensajeError")

//Datos que ingresa el usuario
formUser.addEventListener("submit", (e) => {
    e.preventDefault()
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const reapetPassword = document.getElementById("reapetPassword").value
    const user = new User(username, password, reapetPassword)
    users.push(user)

    formUser.reset()

    if (username == "", password == "", reapetPassword == "") {
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
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: 'Se registro con exito'
        })
        localStorage.setItem("users", JSON.stringify(users))
    }
})


//Login - Para que el usuario ingrese los datos correspondientes
class AddUsers {
    constructor(loginName, loginpw) {
        this.loginName = loginName
        this.loginpw = loginpw
    }
}

const usersRegistro = JSON.parse(localStorage.getItem("users")) ?? []
const addUsers = JSON.parse(localStorage.getItem("addUsers")) ?? []
const formUserLogin = document.getElementById("formUserLogin")

//Requerimientos de datos que ingreso el usuario User/PW
formUserLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    const loginName = document.getElementById("loginName").value
    const loginpw = document.getElementById("loginpw").value
    const addUser = new AddUsers(loginName, loginpw)
    addUsers.push(addUser)
    formUserLogin.reset()

// Comparación de datos 
    const findName = usersRegistro.find(users => users.username == loginName)
    const fingPass = usersRegistro.find(users => users.password == loginpw)

    if (loginName == "" || loginpw == "") {
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

    } else if (findName == undefined || fingPass == undefined) {
        Toastify({
            text: "Usuario o contraseña incorrectos",
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

    } else if (loginName == findName["username"] && loginpw == fingPass["password"]) 
    {
        window.location.href = "./app/app.html"
        localStorage.setItem("addUsers", JSON.stringify(addUsers))
    }

})