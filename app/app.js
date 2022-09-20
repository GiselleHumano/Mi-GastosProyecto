const balances = document.getElementById("balance")
const nombres = document.getElementById("nombre")
const montos = document.getElementById("monto")
const ingresos = document.getElementById("ingresos")
const gastos = document.getElementById("gastos")
const guardarButton = document.getElementById("guardar")
const listTransac = document.getElementById("lista-transacciones")

let listaDeTransacciones = [];
let saldoTotal = 0;
let editIndex =-1 // para que la transaccion anterior sea remplazada en la edicion

saldoTotal = Number(localStorage.getItem("balance")) || 0;

//Edita la transaccion
function edit (i){
    editIndex = i;
    nombres.value = users[i].nombre;
    montos.value = users[i].monto;
    if(users [i].type === "ingresos"){
        ingresos.checked = true;
    }
    else{
        gastos.checked = true;
    }
}

//Elimina la transaccion
function del(i) {
    users = users.
    filter((e,index) => i!=index);
    render();
}

//Guarda la informacion de las transacciones en el localStorage
function saveData (){
    localStorage.setItem("balance", saldoTotal);
    localStorage.setItem("list", JSON.stringify(users));
}
function loadData(){
    saveData()
    users = JSON.parse(localStorage.getItem("list"));
    saldoTotal = Number(localStorage.getItem("balance"));
}

function render() {
    saldoTotal = users.reduce(
    (total, value) => {
    return value.type == "gastos" ? total - value.monto : total + value.monto} 
    , 0 )

    listTransac.innerHTML = "";
    if(users.length  === 0 ){
        listTransac.innerHTML = "Sin transacciones"
    }
    else{
        users.forEach((e,i) => {
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
    saveData();
}

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

    if(editIndex ==-1) users.push(transaction);
    else {users[editIndex] =transaction;
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

    editIndex =-1;
    nombres.value="";
    montos.value ="";
    render();
})

loadData();
render();