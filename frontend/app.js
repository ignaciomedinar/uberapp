// API para crear un nuevo auto
const createAuto = (auto) => {
    var url = "http://localhost:8080/api/auto";
    const data = JSON.stringify(auto);
    console.log(data);
    fetch(url, {
        method: "POST", // or 'PUT'
        body: data, // data can be `string` or {object}!
        headers: {
        "Content-Type": "application/json",
        },
    })
        .then((res) => {
        if ((res.status = 200)) {
            console.log("Status 200, sí se guardó!");
            getDatos();
        }
        })
        .catch((error) => console.error("Error:", error));
};

  // API para crear un nuevo chofer
const createChofer = (chofer) => {
    var url = "http://localhost:8080/api/chofer";
    const data = JSON.stringify(chofer);
    console.log(data);
    fetch(url, {
      method: "POST", // or 'PUT'
      body: data, // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if ((res.status = 200)) {
          console.log("Status 200, sí se guardó!");
          getDatos();
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // API para crear un nuevo gasto
const createGasto = (gasto) => {
    var url = "http://localhost:8080/api/gasto";
    const data = JSON.stringify(gasto);
    console.log(data);
    fetch(url, {
      method: "POST", // or 'PUT'
      body: data, // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if ((res.status = 200)) {
          console.log("Status 200, sí se guardó!");
          getDatos();
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // API para crear un nuevo ingreso
const createIngreso = (ingreso) => {
    var url = "http://localhost:8080/api/ingreso";
    const data = JSON.stringify(ingreso);
    console.log(data);
    fetch(url, {
      method: "POST", // or 'PUT'
      body: data, // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if ((res.status = 200)) {
          console.log("Status 200, sí se guardó!");
          getDatos();
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // API para crear un nuevo deuda
const createDeuda = (deuda) => {
    var url = "http://localhost:8080/api/deuda";
    const data = JSON.stringify(deuda);
    console.log(data);
    fetch(url, {
      method: "POST", // or 'PUT'
      body: data, // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if ((res.status = 200)) {
          console.log("Status 200, sí se guardó!");
          getDatos();
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  /////////////////////////

const tablaIngresos = document.getElementById("datos_ingresos");
let arregloIngresos = [];

// cargar ingresos y actualiza tabla ingresos
const loadIngresos = (ingresos) => {
    arregloIngresos = [...ingresos];
    cargaIngresos();
//  cargaEventosClickMenu();
};

// solicitar los ingresos al API
const getIngresos = () => {
    var url = "http://localhost:8080/api/ingresos";
    fetch(url)
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => loadIngresos(response.data));
  };
  
  getIngresos();

  const cargaIngresos = () => {
    // orden de ultima fecha a más reciente
    //const menu = document.getElementById("datos");
    const arrSort = arregloDatos.sort((a, b) => {
      // console.log(a.numero, typeof a.numero)
      return b.fecha - a.fecha;
    }); //(a, b) => b.id - a.id);
    // agarro los ultimos n elementos para mostrar
    arrSort.splice(5);
    menu.innerHTML = arrSort
      .map((dato) => {
        return `
        <tr id="${dato.id}">
          <td>${dato.semana}</td>
          <td>${dato.chofer}</td>
          <td>${dato.auto}</td>
          <td>${dato.fecha}</td>
          <td>${dato.uber}</td>
          <td>${dato.didi}</td>
          <td>${dato.renta}</td>
          <td>${dato.paraChofer}</td>
          <td>${dato.owner}</td>
          <td>${dato.utilidad}</td>
          <td><button onClick="Eliminar(${dato.id})">Borrar de la base</button></td>
          <td><button onClick="CambiarStatus(${dato.id})">Borrar (visible)</button></td>
          <td><button onClick="Editar(${dato.id})">Editar</button></td>
        </tr>
      `;
      })
      .join("");
  };