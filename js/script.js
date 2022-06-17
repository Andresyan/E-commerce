"use strict"
import { phones } from './data.js';
import { filter, find } from './filters.js';

    // 1. Generar el codigo Html que voy a poenr en la pagina
    // 2. Identificar el contenedor donde pondré mi código
    // 3. Poner mi código

const deleteButton = document.getElementById('vaciar-carrito')
deleteButton.addEventListener('click',() => {
    let aux = shoppingCart.length;
    shoppingCart.length = 0;
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    generateShoppingList();
    if(aux>0){
    let htm = `<div class="helper-ok">
                <div class="position-relative">
                <i class="fa-solid fa-circle-check position-absolute top-0 start-50 translate-middle-x"></i>
                </div>
                </div>
                <div class="mt-1">
                <p class="text-center fw-bold fs-3">Gracias por su compra</p>
                </div>
                `
    let containe = document.getElementById('modal-shopping-cart');
    containe.innerHTML = htm;
    }else{
        let htmr = `<div class="helper-x">
        <div class="position-relative">
        <i class="fa-solid fa-circle-xmark position-absolute top-0 start-50 translate-middle-x"></i>
        </div>
        </div>
        <div class="mt-1">
        <p class="text-center fw-bold fs-3">Elige un producto</p>
        </div>
        
        `
    let containes = document.getElementById('modal-shopping-cart');
    containes.innerHTML = htmr;
    }
})

const priceTot = document.getElementById('precioTotal')


let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];


function generateCardPhones(phonesArray) {
    let html = '';
    for(let i = 0; i < phonesArray.length; i++) {
        html += `<div class="col-4 mt-3">
                        <div class="card">
                            <div class="border-bottom  text-center">
                            <a href="#">
                            <img src="${phonesArray[i].image}" class="card-img-top" alt="...">
                            </a>
                            </div>
                            <div class="card-body">
                                <div>
                                <a href="#">
                                <p class="mb-0">${phonesArray[i].brand}</p>
                                <p class="fw-bold fs-3">${phonesArray[i].model}</p>
                                </a>
                                </div>
                                <div class="d-flex flex-row mb-1">
                                    <div class="p-2 col-6">
                                    <a href="#">
                                    <p class="mb-0">Precio</p>
                                    <p class="fw-bold fs-4">$${phonesArray[i].price}USD</p>
                                    </a>
                                    </div>
                                    <div class="p-2 col-6 position-relative help-img">
                                    <button type="button" class="position-absolute bottom-0 end-0 btn btn-danger rounded-circle" onclick="addToCart(${phonesArray[i].id})">
                                    <img src="./images/shopping-cart 3.svg">
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    }
    const container = document.getElementById("phones-container");
    container.innerHTML = html;
}
generateCardPhones(phones);

const deleteCart = (id) =>{
    const item = shoppingCart.find((shopListTmp)=> shopListTmp.id === id)
    const index = shoppingCart.indexOf(item)
    shoppingCart.splice(index, 1)
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    generateShoppingList();
    console.log(shoppingCart)
}

function generateShoppingList(){
    let shopListTmp = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let html = '';
    for(let i=0; i< shopListTmp.length; i++){
        html += `<div class="shopping-item container border mt-2 ">
                        <div class="row ">
                            <div class=" mt-1 helperImg col-3">
                            <img src="${shopListTmp[i].image}" class="" alt="...">
                            </div>
                            <div class="col-4 align-self-center">
                            <p class="mb-0"> ${shopListTmp[i].model}</p>
                            <p>$${shopListTmp[i].price}USD</p>
                            </div>
                            <div class="col-3 align-self-center">
                            <p class="">Cantidad: ${shopListTmp[i].count}</p>
                            </div>
                            <div class="col-1 align-self-center">
                            <button class="boton-eliminar col-3" onclick="deleteCart(${shopListTmp[i].id})">
                            <i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                </div>`
    }
    console.log(html);
    let container = document.getElementById('modal-shopping-cart');
    container.innerHTML = html;

    priceTot.innerText = shoppingCart.reduce((acc,shopListTmp) => acc + shopListTmp.price * shopListTmp.count, 0)
}



function addToCart(id){
    const aux = shoppingCart.some(shopListTmp=> shopListTmp.id === id)
    if(aux){
        const shopListTmp = shoppingCart.map( shopListTmp=>{
            if(shopListTmp.id===id){
                shopListTmp.count++
            }
        })
    }else{
    function cbFindById(car){
        return car.id === id;
    }
    let product = find(phones, cbFindById);
    shoppingCart.push(product);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    generateShoppingList();
}

function  FilterByBranch(element){
    const input = document.getElementById('brand-filter');
    return element.brand.toLowerCase().includes(input.value.toLowerCase());
}
function FilterName(){
    let phoneName = filter(phones, FilterByBranch);
    generateCardPhones(phoneName);
}

window.FilterName = FilterName;
window.deleteCart=deleteCart;
window.addToCart = addToCart;
window.generateShoppingList = generateShoppingList;