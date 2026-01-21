// 🔥 CONEXIÓN SUPABASE
const supabaseUrl = "https://tqtcyphinjsqxuadxtwj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxdGN5cGhpbmpzcXh1YWR4dHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MDE0MzUsImV4cCI6MjA3NzQ3NzQzNX0.MlgyjJM67TvOaDnL0V_As3IpZ8EkoofQBNa8jrEkp3E";
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

let numeroPedidoActual = 1;

document.addEventListener("DOMContentLoaded", () => {
  obtenerNumeroPedido();
  cambiarZona("alitas");
});

// 🔢 NÚMERO DE PEDIDO POR DÍA
async function obtenerNumeroPedido() {
  const hoy = new Date().toISOString().split("T")[0];

  const { data } = await supabaseClient
    .from("pedidos")
    .select("num_pedido")
    .eq("fecha", hoy)
    .order("num_pedido", { ascending: false })
    .limit(1);

  if (data && data.length > 0) {
    numeroPedidoActual = data[0].num_pedido + 1;
  } else {
    numeroPedidoActual = 1;
  }
}

// ----------------------------
// 🌮 DATOS
// ----------------------------

const saboresAlitas = ["BBQ", "BUF", "MH", "FH", "RH"];

const productos = {
  alitas: [
    { id: "a1", nombre: "Orden 6 pz", precio: 50, max: 10 },
    { id: "a2", nombre: "1/2 kg", precio: 100, max: 5 },
    { id: "a3", nombre: "3/4 kg", precio: 150, max: 5 },
    { id: "a4", nombre: "1 kg", precio: 200, max: 5 }
  ],

  comida: [
    { id: "c1", nombre: "Hamburguesa sencilla", precio: 65 },
    { id: "c2", nombre: "Hamburguesa c/papas", precio: 90 },
    { id: "c3", nombre: "Hawaiana", precio: 75 },
    { id: "c4", nombre: "Hawaiana c/papas", precio: 95 },
    { id: "c5", nombre: "Hotdog", precio: 35 },
    { id: "c6", nombre: "Hotdog c/papas", precio: 50 },
    { id: "c7", nombre: "Sincronizada", precio: 35 }
  ],

  pizza: [
    { id: "p1", nombre: "Pepperoni individual", precio: 30 },
    { id: "p2", nombre: "Pepperoni calzone", precio: 45 },
    { id: "p3", nombre: "Pepperoni compartir", precio: 60 },
    { id: "p4", nombre: "Pepperoni mediana", precio: 150 },
    { id: "p5", nombre: "Pepperoni grande", precio: 220 },

    { id: "p6", nombre: "Pastor individual", precio: 40 },
    { id: "p7", nombre: "Pastor calzone", precio: 45 },
    { id: "p8", nombre: "Pastor compartir", precio: 70 },
    { id: "p9", nombre: "Pastor mediana", precio: 180 },
    { id: "p10", nombre: "Pastor grande", precio: 250 }
  ],

  botana: [
    { id: "b1", nombre: "Maruchan", precio: 35 },
    { id: "b2", nombre: "Salchipulpos", precio: 45 },
    { id: "b3", nombre: "Nuggets", precio: 50 },
    { id: "b4", nombre: "Papas francesas", precio: 50 },
    { id: "b5", nombre: "Papas gajo", precio: 55 },
    { id: "b6", nombre: "Nachos", precio: 50 },
    { id: "b7", nombre: "Carnachos", precio: 75 },
    { id: "b8", nombre: "Enchiladas", precio: 60 },
    { id: "b9", nombre: "Pozole", precio: 50 }
  ],

  taqueria: [
    { id: "t1", nombre: "Taco pollo", precio: 28 },
    { id: "t2", nombre: "Taco bistec", precio: 28 },
    { id: "t3", nombre: "Taco longaniza", precio: 28 },
    { id: "t4", nombre: "Taco cecina", precio: 28 },
    { id: "t5", nombre: "Taco chorizo", precio: 28 },
    { id: "t6", nombre: "Taco campechano", precio: 28 },
    { id: "t7", nombre: "Taco chorizo arg", precio: 30 },
    { id: "t8", nombre: "Taco alambre", precio: 35 },
    { id: "t9", nombre: "Taco costilla", precio: 55 },
    { id: "t10", nombre: "Taco arrachera", precio: 55 }
  ],

  postres: [
    { id: "d1", nombre: "Fresas", precio: 50 },
    { id: "d2", nombre: "Duraznos", precio: 50 },
    { id: "d3", nombre: "Frutos rojos", precio: 65 },
    { id: "d4", nombre: "Flan", precio: 50 }
  ]
};

let pedido = [];
let saboresSeleccionados = [];

// ----------------------------
// ⚙️ FUNCIONES
// ----------------------------

function cambiarZona(zona) {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";
  saboresSeleccionados = [];

  if (zona === "alitas") {
    const saboresDiv = document.createElement("div");
    saboresDiv.className = "producto";
    saboresDiv.innerHTML = `<h3>Sabores</h3>` +
      saboresAlitas.map(s => `
        <label>
          <input type="checkbox" value="${s}" onchange="toggleSabor(this)"> ${s}
        </label><br>
      `).join("");
    menu.appendChild(saboresDiv);
  }

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

function toggleSabor(check) {
  if (check.checked) saboresSeleccionados.push(check.value);
  else saboresSeleccionados = saboresSeleccionados.filter(s => s !== check.value);
}

function nombreSabores(sabores) {
  if (sabores.includes("BBQ") && sabores.includes("BUF") && sabores.length === 2) return "MIX";
  if (sabores.includes("BBQ") && sabores.includes("BUF") && sabores.includes("MH") && sabores.length === 3) return "MIX 3";
  return sabores.join(", ");
}

function agregarProducto(id, zona) {
  const prod = productos[zona].find(p => p.id === id);

  if (zona === "alitas" && saboresSeleccionados.length === 0) {
    alert("Selecciona sabores");
    return;
  }

  let item = pedido.find(p =>
    p.id === id &&
    JSON.stringify(p.sabores) === JSON.stringify(saboresSeleccionados)
  );

  if (item) {
    item.cantidad++;
  } else {
    pedido.push({ ...prod, cantidad: 1, sabores: zona === "alitas" ? [...saboresSeleccionados] : [] });
  }

  actualizarPedido();
}

function quitarProducto(id) {
  let item = pedido.find(p => p.id === id);
  if (item) {
    item.cantidad--;
    if (item.cantidad <= 0) pedido = pedido.filter(p => p !== item);
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

    let texto = `${p.cantidad} ${p.nombre}`;
    if (p.sabores.length > 0) texto += ` (${nombreSabores(p.sabores)})`;

    const div = document.createElement("div");
    div.innerText = texto + " - $" + subtotal;
    lista.appendChild(div);

    const contador = document.getElementById(`cant-${p.id}`);
    if (contador) contador.innerText = p.cantidad;
  });

  document.getElementById("total").innerText = "Total: $" + total;
}

// ----------------------------
// 🧾 TICKET
// ----------------------------

function generarTicket(pedidoFinal) {
  document.getElementById("t-pedido").innerText = "PEDIDO #" + pedidoFinal.num_pedido;
  document.getElementById("t-hora").innerText = pedidoFinal.hora;
  document.getElementById("t-tel").innerText = "Tel: **** " + pedidoFinal.telefono.slice(-4);

  let texto = "";
  pedidoFinal.productos.forEach(p => {
  let subtotal = p.precio * p.cantidad;

  let nombre = `${p.cantidad} ${p.nombre}`;
  if (p.sabores.length > 0) nombre += ` (${nombreSabores(p.sabores)})`;

  // 👉 ajusta este número según qué tan ancho quieras el ticket
  let nombreFormateado = nombre.padEnd(28, " ");

  let linea = `${nombreFormateado}$${subtotal}`;
  texto += linea + "\n";
});



  document.getElementById("t-productos").innerText = texto;
  document.getElementById("t-total").innerText = "TOTAL: $" + pedidoFinal.total;
}

function imprimirTicket() {
  window.print();
}

// ----------------------------
// ☁️ FINALIZAR PEDIDO
// ----------------------------

async function finalizarPedido() {
  if (pedido.length === 0) return alert("No hay productos 😭");

  const telefono = document.getElementById("telefono").value;
  if (telefono.trim() === "") return alert("Pon la terminación del número");

  const total = pedido.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const ahora = new Date();

  const pedidoSupabase = {
    fecha: ahora.toISOString().split("T")[0],
    hora: ahora.toTimeString().split(" ")[0].slice(0,5),
    num_pedido: numeroPedidoActual,
    telefono: telefono,
    productos: pedido,
    total: total
  };

  const { error } = await supabaseClient.from("pedidos").insert([pedidoSupabase]);

  if (error) {
    console.error(error);
    alert("Error al guardar 😭");
    return;
  }

  // 🧾 GENERAR + IMPRIMIR
  generarTicket(pedidoSupabase);
  imprimirTicket();

  // 🔄 RESET
  pedido = [];
  saboresSeleccionados = [];
  numeroPedidoActual++;

  document.getElementById("lista-pedido").innerHTML = "";
  document.getElementById("total").innerText = "Total: $0";
  document.getElementById("telefono").value = "";

  cambiarZona("alitas");
}
