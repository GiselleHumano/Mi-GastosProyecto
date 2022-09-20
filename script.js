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

//register

function entrar() {
    const user = document.getElementById ("loginUser").value;
    const pass = document.getElementById ("loginPw").value;

    if(user == "usuario1" && pass == "111"){
        window.location.href = "./app/app.html";
    }
    else{
        Toastify({
            text: "No es posible Iniciar sesión",
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
        return
    }
}
/*
const registrar = document.getElementById("register")

let users = [];

function saveData (){
    localStorage.setItem("list", JSON.stringify(users));
}
function loadData(){
    users = JSON.parse(localStorage.getItem("list"));
}

/*
function obtenerUsuarioContraseña (){
    let mis_usuarios = JSON.parse(localStorage.getItem('usuarios'));
    let usuario = document.getElementById("LoginUser").value;
    let contraseña = document.getElementById("loginPw").value;


    for (let index = 0; index < mis_usuarios.length; index++) {
        if(usuario == mis_usuarios[index].usuario && contraseña == mis_usuarios[index].pass) {
            window.open('../app/app.html');
        }else {
            document.getElementById("LoginUser").value = "";
            document.getElementById("loginPw").value = "";
        }
    };

}

function usarLocalStorage () {
    users.push({
        usuario: document.getElementById("usuario").value,
        pass: document.getElementById("pw").value,
    })
    console.log(users)
    localStorage.setItem("usuarios", JSON.stringify(users));
}*/