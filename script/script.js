let listar = document.getElementById('listarProducto');
let produc = [];
let resProductos = document.querySelector('form');
let buscardor = document.getElementById('buscardor');

resProductos.addEventListener('submit', e => {
    e.preventDefault();
    capturaDato();
})
const capturaDato = () => {
    let producto = document.getElementById('nomProd').value;
    let precio = document.getElementById('precio').value;
    let tipo = document.getElementById('tipo').value;

    let registro = {
        id: Math.round(Math.random() * (100 - 1) + 1),
        producto,
        precio,
        tipo
    }
    const data = JSON.parse(localStorage.getItem('produc'));
    if (data !== null) {
        data.unshift(registro);
        localStorage.setItem('produc', JSON.stringify(data));
    } else {
        produc.unshift(registro);
        localStorage.setItem('produc', JSON.stringify(produc));
    }
    subirDatos();
}
const subirDatos = () => {
    listar.innerHTML = '';
    let datosAlmac = JSON.parse(localStorage.getItem('produc'));
    datosAlmac.map(dat => {
        const { id, producto, precio, tipo } = dat;
        listar.innerHTML += `
        <td>${id}</td>
        <td>${producto}</td>
        <td>${precio}</td>
        <td>${tipo}</td>
        <td><button id=${id} class="btn btn-primary boton" ;">Eliminar</button></td>
        `
    })
}
document.addEventListener('DOMContentLoaded', capturaDato)
listar.addEventListener('click', e => {
    const boton = e.target.classList.contains('boton');
    const id = e.target.id
    const local = JSON.parse(localStorage.getItem('produc'))
    const elimir = local.find(datas => datas.id == Number(id))
    if (boton) {
        local.forEach((element, index) => {
            if (element.id === elimir.id) {
                local.splice(index, 1)
                localStorage.setItem('produc', JSON.stringify(local))
                subirDatos();
            }
        });
    }
})
Buscar.addEventListener('click', e => {
    e.preventDefault();
    let content = document.getElementById("buscarProducto").value;
    let datos = JSON.parse(localStorage, getItem('produc'));
    let condicion = datos.filter(pro => pro.producto.toLowerCase().includes(content.toLowerCase()))
    buscardor.innerHTML = '';
    condicion.length === 0;
    buscardor.innerHTML += `<div>El producto ${content} no existe</div>`
        (
            filter.map(pro => {
                const { producto, precio, tipo } = pro;
                buscardor.innerHTML += `
                <div>${producto}</div>
                <div>${precio}</div>
                <div>${tipo}</div>
            `
            })
        )
})
