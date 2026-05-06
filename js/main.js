///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIABLES


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EVENTOS

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCIONES

function agregarProducto() {
    //creamos espacio para recoger los datos del input y procesarlos
    const input = document.getElementById("productoInput");
    //constante donde se almacena el valor de la entrada
    const nombreProducto = input.value;
    //si producto no exixste finaliza la funcion
    if(nombreProducto === "")return;
    //variable donde se recupera la lista actual
    let productos=  JSON.parse(localStorage.getItem("productos"));
    //si no hay nada en let nombreProducto, se inicia un array vacio
    if(productos === null){
        productos= []
    }
    //buscamos si el producto existe en el array
    let existe = false;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre === nombreProducto) {
            productos[i].contador++; // Incrementar si ya existe
        existe = true;
        break;
    }
    }
    // Si no se encuentra, se crea espacio en memoria para almacenarlo
    if (!existe) {
    const nuevoProducto = {
        nombre: nombreProducto,
        contador: 1
        };
        
        productos.push(nuevoProducto);
    }

// Guardar la lista actualizada en el JSON
localStorage.setItem("productos", JSON.stringify(productos));

// Limpiar input y actualizar la tabla
input.value = "";
dibujarTabla();
}

function eliminarProducto(nombre) {
//Obtenemos el array desde el JSON
    let productos = JSON.parse(localStorage.getItem("productos"));
//Aplicamos bucle donde le indicamos i vale 0 y que tiene que continuar el bucle un numeor de veces equivalente al largo del array
    for (let i = 0; i < productos.length; i++) {
//indicamos que si el producto del input esta ya en el array, se rete 1 a la cantidad.
    if (productos[i].nombre === nombre) {
//Resta 1 a la cantidad
    productos[i].contador--; 
// si i es igual o menor que 0, le indicamos que elimine el primer elemento del array (todo el array)
        if (productos[i].contador <= 0) {
        productos.splice(i, 1);
        }
    break;
    }
};
// procedemos a guardar los cambio haciendo un strigify para el JSON
localStorage.setItem("productos", JSON.stringify(productos));
dibujarTabla();
};

function dibujarTabla() {
// creamos espacio en memoria para almacenar los de la lista de productos ya recogidos
    const lista = document.getElementById("listaProductos");
//accedemos a los datos almacenados en JSON para su procesamiento
    const productos = JSON.parse(localStorage.getItem("productos"));
//con este elemento limpiamos la tabla cada vez que esta carga.
    lista.innerHTML = ""; 
//si productos esta vacio
    if (productos !== null) {
//
for (let i = 0; i < productos.length; i++) {
lista.innerHTML += `
<tr>
<td>${productos[i].nombre}</td>
<td>${productos[i].contador}</td>
<td>
<button onclick="eliminarProducto('${productos[i].nombre}')">Eliminar</button>
</td>
</tr>
`;
}
}
}

// Ejecutar al cargar la página para que los datos persistan
dibujarTabla();

