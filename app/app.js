const balances = document.getElementById("balance")
const nombres = document.getElementById("nombre")
const montos = document.getElementById("monto")
const ingresos = document.getElementById("ingresos")
const gastos = document.getElementById("gastos")
const guardarButton = document.getElementById("guardar")
const listTransac = document.getElementById("lista-transacciones")

window.onload = () => {
    Toastify({
        text: `¡Bienvenid@!`,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to top, #373b44, #4286f4)",
        },
        onClick: function () { } // Callback after click
    }).showToast()
}

let listaDeTransacciones = [];
let saldoTotal = 0;
let editIndex =-1 // para que la transaccion anterior sea remplazada en la edicion

//Guarda la informacion de las transacciones en el localStorage
saldoTotal = Number(localStorage.getItem("balance")) || 0;
listaDeTransacciones = JSON.parse(localStorage.getItem("list")) || [];

const saveStatus = () => {
    localStorage.setItem("balance", saldoTotal);
    localStorage.setItem("list", JSON.stringify(listaDeTransacciones));
} 

//Elimina la transaccion
function del(i) {
    listaDeTransacciones = listaDeTransacciones.
    filter((e,index) => i!=index);
    render();
}

//Edita la transaccion
function edit (i){
    editIndex = i;
    nombres.value = listaDeTransacciones[i].nombre;
    montos.value = listaDeTransacciones[i].monto;
    if(listaDeTransacciones [i].type === "ingresos"){
        ingresos.checked = true;
    }
    else{
        gastos.checked = true;
    }
}

function render() {
    saldoTotal = listaDeTransacciones.reduce(
    (total, value) => {
    return value.type == "gastos" ? total - value.monto : total + value.monto} 
    , 0 )

    listTransac.innerHTML = "";
    if(listaDeTransacciones.length  === 0 ){
        listTransac.innerHTML = "Sin transacciones"
    }
    else{
        listaDeTransacciones.forEach((e,i) => {
            listTransac.innerHTML += `
            <li id="bloqueTransci" class="transaction ${e.type}">
            <p>${e.nombre}</p>
            <div class="derecha">
            <p>$${e.monto}</p>
            <button onclick="edit(${i})">
                <img
                    src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/ffffff/external-edit-interface-kiranshastry-solid-kiranshastry.png" />
            </button>
            <button onclick="del(${i})">
                <img src="https://img.icons8.com/pastel-glyph/64/ffffff/trash.png" />
            </button>
        </div>
    </li>`
        })
    }
    balances.innerHTML = saldoTotal;
}

render();
saveStatus();
// "alerta" si no se llenan los campos
guardarButton.addEventListener (`click`, (e) => {
    if(nombres.value == "" || 
    Number(montos.value) <=0){
        Toastify({
            text: "No es posible realizar la transacción",
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

    let transaction ={
        nombre: nombres.value,
        monto: Number (montos.value),
        type : ingresos.checked? "ingresos" : "gastos"
    };

    if(editIndex ==-1) listaDeTransacciones.push(transaction);
    else {listaDeTransacciones[editIndex] =transaction;
    Toastify({
        text: "Se realizo una transacción con éxito",
        duration: 3000,
        //destination: "https://github.com/apvarun/toastify-js",
        //newWindow: false,
        close: true,
        gravity: "bottom", 
        position: "right", 
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to top, #11998e, #38ef7d)",
        },
    }).showToast();
}
    nombres.value="";
    montos.value ="";
    render();
    saveStatus();
})