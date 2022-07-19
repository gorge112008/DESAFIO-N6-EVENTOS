//ALGORITMO DE SIMULACIÓN DE VENTAS DE COMIDA RÁPIDA:
//DEFINIENDO VARIABLES Y CONSTANTES:
let tamaño = 0, //VARIABLE PARA TENER LONGITUD DE CADA TIPO DE MENU
  exislista1 = 0, //VARIABLE PARA SABER SI EXISTE YA UNA LISTA CREADA DEL TIPO DE MENU O NO.
  exislista2 = 0,
  todototal = 0,
  ini = 0,
  conta=0;
let tipo;
const numstock = [""], //CUENTA EL STOCK DISPONIBLE.
  numtotal = [""],
  cartatotal = [];

//DIVISIONES.
const divinicio = document.querySelector("#inicio"),
  divmenu = document.querySelector("#menu"),
  divañadir = document.querySelector("#pedido_realizar"),
  divañadirmenu = document.querySelector("#pedido_realizar-menu"),
  divcancelar = document.querySelector("#pedido_cancelar"),
  divfinalizar = document.querySelector("#pedido_finalizar");

const lista = document.querySelector("#lista"), //OBTENIENDO DATOS DEL DE LA ETIQUETA HTML CON EL ID: LISTA.
  pedir = document.querySelector("#pedido"), //OBTENIENDO DATOS DEL DE LA ETIQUETA HTML CON EL ID: PEDIDO.
  cancelado = document.querySelector("#cancelado"), //OBTENIENDO DATOS DEL DE LA ETIQUETA HTML CON EL ID: CANCELADO.
  mensaje = document.querySelector("#pedido_finalizar"), //OBTENIENDO DATOS DEL DE LA ETIQUETA HTML CON EL ID: PEDIDO.
  reporte = document.querySelector("#pedido_reporte"), //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: PEDIDO_REPORTE.
  gracias = document.querySelector("#gracias"); //OBTENIENDO DATOS DEL DE LA ETIQUETA HTML CON EL ID: GRACIAS.

//BOTONES DEL NAV.
const btninicio = document.querySelector("#btn_inicio"),
  btnmenu = document.querySelector("#btn_menu"),
  btnañadir = document.querySelector("#btn_añadir"),
  btncancelar = document.querySelector("#btn_cancelar"),
  btnfinalizar = document.querySelector("#btn_finalizar"),
  //BOTONES DE MENU.
  btnbarato = document.querySelector("#btn_economico"),
  btndeluxe = document.querySelector("#btn_deluxe"),
  btntodomenu = document.querySelector("#btn_todomenu"),
  //BOTONES DE PRESIONAR.
  btnañade = document.querySelector("#btn_añadir-aceptar"),
  btnelimina = document.querySelector("#btn_cancelar-aceptar"),
  btnfinal = document.querySelector("#btn_finalizar-aceptar");

btninicio.addEventListener("click", () => {
  divinicio.className = "";
  divmenu.className = "hidden";
  divañadir.className = "hidden";
  divcancelar.className = "hidden";
  divfinalizar.className = "hidden";
});
btnmenu.addEventListener("click", () => {
  divinicio.className = "hidden";
  divmenu.className = "";
  divañadir.className = "hidden";
  divcancelar.className = "hidden";
  divfinalizar.className = "hidden";
});
btnañadir.addEventListener("click", () => {
  divinicio.className = "hidden";
  divmenu.className = "hidden";
  divañadir.className = "";
  divcancelar.className = "hidden";
  divfinalizar.className = "hidden";
  if (tipo != undefined) {
    tipo.actualizarañadir();
  }
});
btncancelar.addEventListener("click", () => {
  divinicio.className = "hidden";
  divmenu.className = "hidden";
  divañadir.className = "hidden";
  divcancelar.className = "";
  divfinalizar.className = "hidden";
  const secancela = document.querySelector("#pedido_cancelar h4");
  if (todototal == 0) {
    secancela.innerText = "No se ha realizado ningún pedido.";
  } else {
    secancela.innerText = "*Cancelar Pedido:";
    tipo.actualizarcancelar();
  }
});
btnfinalizar.addEventListener("click", () => {
  divinicio.className = "hidden";
  divmenu.className = "hidden";
  divañadir.className = "hidden";
  divcancelar.className = "hidden";
  divfinalizar.className = "";
  if (todototal == 0) {
    reporte.innerHTML = "<b>No se ha realizado ningún pedido.</b>";
  } else {
    reporte.innerHTML = "<b>Reporte detallado del pedido: </b>";
    tipo.finalizar();
  }
});

//ESTABLECIENDO FUNCIÓN CONSTRUCTORA:
function Menu(Nombre, Stock, Costo, Descripción, Total) {
  this.Nombre = Nombre;
  this.Stock = Stock;
  this.Costo = Costo;
  this.Descripción = Descripción;
  this.total = Total;
}
function Tipo(Nombre, Menus) {
  this.nombre = Nombre;
  this.menus = Menus;
  //CREANDO METODO DE SELECCION DE MENU:
  this.pedido = () => {
    let listapedido = document.querySelectorAll(".listapedido");
    listapedido.forEach((lista) => {
      const sele = lista.querySelector("#select_cantidad");
      this.menus[ini].Stock -= parseInt(sele.value);
      this.menus[ini].total += parseInt(sele.value);
      todototal += parseInt(sele.value);
      ini++;
    });
    ini = 0;
  };
  this.actualizarañadir = () => {
    tamaño = this.length; //DECLARANDO TAMAÑO DEL MENU RESPECTO AL SELECCIONADO.
    if (exislista1 == 1) {
      const li = document.querySelectorAll(".listapedido");
      li.forEach((li) => {
        li.remove();
      });
    }
    this.menus.forEach((menu) => {
      //RECORRIENDO TODO EL ARREGLO DEL TIPO DE MENU.
      let li = document.createElement("li"); //CREANDO LISTA CON LA VARIABLE LI.
      for (let i = 0; i <= menu.Stock; i++) {
        numstock[conta] += `<option value=${i}>${i}</option>`;
      }
      li.innerHTML =
        `<div class="listado-añadir">${menu.Nombre}</div><input type="text" readonly value="Disponible:${menu.Stock}" class="stock">` +
        `<select name="pedir" id="select_cantidad">${0}${
          numstock[conta]
        }</select> `;
      li.className = "listapedido"; //CREANDO CLASE CON LA VARIABLE LI.
      pedir.appendChild(li);
      exislista1 = 1;
      numstock[conta] = "";
      conta++;
    });
    conta = 0;
  };
  this.eliminar = () => {
    const secancela = document.querySelector("#pedido_cancelar h4");
    tipo.menus.forEach((menu) => {
      if (menu.total != 0) {
        let listacancelado = document.querySelectorAll(".listacancelado");
        listacancelado.forEach((lista) => {
          const nel = lista.querySelector(".listado-cancelar");
          if (nel.innerText == menu.Nombre) {
            const dele = lista.querySelector("#delete_cantidad");
            menu.Stock += parseInt(dele.value);
            menu.total -= parseInt(dele.value);
            todototal -= parseInt(dele.value);
            if (menu.total == 0) {
              lista.remove();
            }
          }
        });
      }
    });
    if (todototal == 0) {
      secancela.innerText = "Se han cancelado todos los pedidos.";
    }
  };
  this.actualizarcancelar = () => {
    if (exislista2 == 1) {
      const li = document.querySelectorAll(".listacancelado");
      li.forEach((li) => {
        li.remove();
      });
    }
    this.menus.forEach((menu) => {
      //RECORRIENDO TODO EL ARREGLO DEL TIPO DE MENU.
      if (menu.total != 0) {
        let li = document.createElement("li"); //CREANDO LISTA CON LA VARIABLE LI.
        for (let i = 0; i <= menu.total; i++) {
          numtotal[conta] += `<option value=${i}>${i}</option>`;
        }
        li.innerHTML =
          `<div class="listado-cancelar">${menu.Nombre}</div><input type="text" readonly value="Pedido:${menu.total}" class="stock">` +
          `<select name="cancelar" id="delete_cantidad">${0}${
            numtotal[conta]
          }</select> `;
        li.className = "listacancelado"; //CREANDO CLASE CON LA VARIABLE LI.
        cancelado.appendChild(li);
        exislista2 = 1;
        numtotal[conta] = "";
        conta++;
      }
    });
    conta = 0;
  };
  this.finalizar = () => {
    //METODO QUE FILTRA CADA MENU PEDIDO EN UN ARRAY.
    const pedido = this.menus.filter((el) => {
      return el.total != 0;
    });
    //METODO QUE CONSTRUYE PARTE DEL MENSAJE FINAL QUE SE IMPRIMIRÁ AL COMPLETAR EL PEDIDO.
    const msjfinal = pedido.reduce(
      (acum, ele) => acum + `<li>${ele.Nombre}= ${ele.total} unidad(es).</li>`,
      "<b>Su pedido es:</b>"
    );
    //MOSTRANDO MENSAJE FINAL CONSTRUIDO EN HTML.
    let msj = document.createElement("p");
    msj.innerHTML = `<ul>${msjfinal}</ul>El monto total de su pedido es de: S/.${todototal} Soles.<br>`;
    gracias.innerText =
      "Muchas Gracias por su compra, que tenga un buen día!!!";
    reporte.appendChild(msj);
  };
}
//CONSTRUYENDO EL MENÚ EN BASE A LA FUNCIÓN CONSTRUCTORA Y AGREGANDOLOS AL ARRAY CARTATOTAL:
cartatotal.push(
  (M1 = new Menu(
    "Hamburguesa de Carne Fina",
    10,
    15,
    "Hamburguesa 100% hecha de lomo fino de res a la parrilla, " +
      "jugosos tomates, frescas lechugas, pepinillos y ricas cremas ",
    0
  )),
  (M2 = new Menu(
    "Hamburguesa de Pollo",
    12,
    5,
    "Hamburguesa elaborada con las mejores pechugas blancas de pollo," +
      "ligeramente sazonada con una combinación de lechuga y cremosa mayonesa. ",
    0
  )),
  (M3 = new Menu(
    "Sandwich de Carne Fina",
    15,
    12,
    "Sandwich preparado con la mejor calidad de filete de lomo fino de res " +
      "sazonado y cocinado a la perfección; acompañado de frescas lechugas, mayonesa y ketchup al gusto. ",
    0
  )),
  (M4 = new Menu(
    "Sandwich de Pollo ",
    15,
    3,
    "Sandwich preparado con deliciosa pechuga de pollo fresca, " +
      "rica lechuga, mayonesa y ketchup al gusto. ",
    0
  )),
  (M5 = new Menu(
    "Toasted Twister Americano",
    5,
    20,
    "Delicioso Snack tostado con tiras de pollo, tocino y carne " +
      "envuelto junto a lechugas frescas, tomate y pepinillo. ",
    0
  )),
  (M6 = new Menu(
    "Combo Alitas bbq picante",
    5,
    20,
    "Alitas bañadas en nuestra salsa secreta BBQ picante," +
      "con una porción de papas fritas, ensalada y cremas al gusto. ",
    0
  )),
  (M7 = new Menu(
    "Salchipapa",
    15,
    6,
    " Rodajas fritas de salchicha y papas fritas cortadas a la perfección " +
      "bañadas en deliciosa mayonesa y ketchup al gusto. ",
    0
  )),
  (M8 = new Menu(
    "Pollo Broster",
    10,
    10,
    "Pechuga de pollo tierno enharinado, rebozado y frito, " +
      "acompañado de  una porción de papas fritas, ensalada y cremas al gusto. ",
    0
  ))
);
//ORDENANDO MENÚ POR ORDEN DE NOMBRES:
cartatotal.sort((a, b) => {
  if (a.Nombre > b.Nombre) {
    return 1;
  }
  if (a.Nombre < b.Nombre) {
    return -1;
  }
  return 0;
});

//CONSTRUYENDO MENÚ TOTAL:
menutotal = new Tipo("Todo el Menú Disponible", cartatotal);

//CREANDO EL ARRAY MENÚ ECONÓMICO:
economico = cartatotal.filter((el) => {
  return el.Costo <= 10;
});
//CONSTRUYENDO MENÚ ECONÓMICO:
menueconomico = new Tipo("Menú Económico", economico);
//CREANDO EL ARRAY MENÚ DELUXE:
deluxe = cartatotal.filter((el) => {
  return el.Costo > 10;
});
//CONSTRUYENDO MENÚ DELUXE:
menuedeluxe = new Tipo("Menú Deluxe", deluxe);

//CREANDO MENUS DE ACUERDO A LO SELECCIONADO POR BOTON.
btnbarato.addEventListener("click", () => {
  divañadirmenu.className = ""; //ACTIVA EL MENU ELEGIDO PARA PODER AÑADIRLO.
  menueconomico.actualizarañadir();
  tipo = menueconomico;
});

btndeluxe.addEventListener("click", () => {
  divañadirmenu.className = "";
  menuedeluxe.actualizarañadir();
  tipo = menuedeluxe;
});
btntodomenu.addEventListener("click", () => {
  divañadirmenu.className = "";
  menutotal.actualizarañadir();
  tipo = menutotal;
});
//CREANDO LA CARTA COMPLETA EN EL NAVEGADOR MENU.
cartatotal.forEach((lis) => {
  let li = document.createElement("li");
  li.innerHTML =
    `<div class="list"><b>${lis.Nombre}:</b></div><div class="detal">${lis.Descripción}</div>` +
    `<div class="preci">Precio: S/.${lis.Costo}</div><div class="stock">Stock:${lis.Stock} unidades.</div>`;
  lista.appendChild(li);
});

btnañade.addEventListener("click", () => {
  tipo.pedido();
  tipo.actualizarañadir();
});

btnelimina.addEventListener("click", () => {
  tipo.eliminar();
  tipo.actualizarcancelar();
});
btnfinal.addEventListener("click", () => {
  gracias.className = "";
  btnmenu.setAttribute("disabled", "true");
  btnañadir.setAttribute("disabled", "true");
  btncancelar.setAttribute("disabled", "true");
});
