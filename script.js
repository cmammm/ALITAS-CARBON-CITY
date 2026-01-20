const productos = {
  alitas: [
    { id: "a1", nombre: "Orden 6 pz", precio: 50, max: 10 },
    { id: "a2", nombre: "1/2 kg", precio: 100, max: 5 },
    { id: "a3", nombre: "3/4 kg", precio: 150, max: 5 },
    { id: "a4", nombre: "1 kg", precio: 200, max: 5 }
  ],
  comida: [
    { id: "c1", nombre: "Hamburguesa sencilla", precio: 65, max: 10 },
    { id: "c2", nombre: "Hamburguesa c/papas", precio: 90, max: 10 },
    { id: "c3", nombre: "Hawaiana", precio: 75, max: 10 },
    { id: "c4", nombre: "Hawaiana c/papas", precio: 95, max: 10 },
    { id: "c5", nombre: "Hotdog", precio: 35, max: 10 },
    { id: "c6", nombre: "Hotdog c/papas", precio: 50, max: 10 },
    { id: "c7", nombre: "Sincronizada", precio: 35, max: 10 }
  ],
  pizza: [
    { id: "p1", nombre: "Pizza individual", precio: 30, max: 5 },
    { id: "p2", nombre: "Calzone", precio: 45, max: 5 },
    { id: "p3", nombre: "Para compartir", precio: 60, max: 5 },
    { id: "p4", nombre: "Mediana", precio: 150, max: 5 },
    { id: "p5", nombre: "Grande", precio: 220, max: 5 }
  ],
  botana: [
    { id: "b1", nombre: "Maruchan", precio: 35, max: 5 },
    { id: "b2", nombre: "Salchipulpos", precio: 45, max: 5 },
    { id: "b3", nombre: "Nuggets", precio: 50, max: 5 },
    { id: "b4", nombre: "Papas francesa", precio: 50, max: 5 },
    { id: "b5", nombre: "Papas gajo", precio: 55, max: 5 },
    { id: "b6", nombre: "Nachos", precio: 50, max: 5 },
    { id: "b7", nombre: "Carnachos", precio: 75, max: 5 },
    { id: "b8", nombre: "Enchiladas", precio: 60, max: 5 },
    { id: "b9", nombre: "Pozole", precio: 50, max: 5 }
  ],
  taqueria: [
    { id: "t1", nombre: "Taco", precio: 28, max: 15 },
    { id: "t2", nombre: "Gringa", precio: 60, max: 10 },
    { id: "t3", nombre: "Burrito", precio: 90, max: 5 }
  ],
  postres: [
    { id: "d1", nombre: "Fresas", precio: 50, max: 5 },
    { id: "d2", nombre: "Duraznos", precio: 50, max: 5 },
    { id: "d3", nombre: "Frutos rojos", precio: 65, max: 5 },
    { id: "d4", nombre: "Flan", precio: 50, max: 5 }
  ]
};

let pedido = [];

function cambiarZona(zona) {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  productos[zona].forEach(prod => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>$${prod.precio}</p>
      <div class="controles">
        <button onclick="quitarProducto('${prod.id}')">-</button>
        <span id="cant-${prod.id}">0</span>
        <button onclick="agregarProducto('${prod.id}', '${zona}')">+</button>
      </div>
    `;

    menu.appendChild(div);
  });
}

function agregarProducto(id, zona) {
  const prod = productos[zona].find(p => p.id === id);
  let item = pedido.find(p => p.id === id);

  if (item) {
    if (item.cantidad < prod.max) item.cantidad++;
  } else {
    pedido.push({ ...prod, cantidad: 1 });
  }

  actualizarPedido();
}

function quitarProducto(id) {
  let item = pedido.find(p => p.id === id);

  if (item) {
    item.cantidad--;
    if (item.cantidad <= 0) {
      pedido = pedido.filter(p => p.id !== id);
    }
  }

  actualizarPedido();
}

function actualizarPedido() {
  const lista = document.getElementById("lista-pedido");
  lista.innerHTML = "";
  let total = 0;

  pedido.forEach(p => {
    const subtotal = p.precio * p.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "item-pedido";
    div.innerHTML = `${p.cantidad}x ${p.nombre} — $${subtotal}`;

    lista.appendChild(div);

    const contador = document.getElementById(`cant-${p.id}`);
    if (contador) contador.innerText = p.cantidad;
  });

  document.getElementById("total").innerText = "Total: $" + total;
}

cambiarZona("alitas");
