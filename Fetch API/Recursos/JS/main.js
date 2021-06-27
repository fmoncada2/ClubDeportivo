// Defino el contenedor HTML en donde colocaré los datos a cargar dinamicamente.
let tagTBody = document.querySelector("#listaPlanes tbody");
// indicando la direccion donde esta mi API
let pUrl = "https://my-json-server.typicode.com/fmoncada2/ClubDeportivo/Planes";


fetch (pUrl,
      {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          } 
      }
) 
 .then(response => response.json()) 
 .then(data => { 

   let listaComentario = data;

    listaComentario.forEach(element => {
        // Crear los objetos filas y columnas de la tabla con el DOM HTML
        let tagFila = document.createElement("tr");
        let tagCodigo = document.createElement("td");
        let tagPlan = document.createElement("td");
        let tagPlaza = document.createElement("td");
        let tagAnualidad = document.createElement("td");

        tagFila.setAttribute("id", element.id);
        tagFila.setAttribute("data-bs-toggle", "modal");
        tagFila.setAttribute("data-bs-target", "#ventanaModal");
        tagCodigo.innerHTML = element.Codigo;
        tagPlan.innerHTML = element.Plan;
        tagPlaza.innerHTML = element.Plaza;
        tagAnualidad.innerHTML = element.Anualidad;


        // Agrego los objetos DOM HTML a su contenedor
        tagFila.appendChild(tagCodigo);
        tagFila.appendChild(tagPlan);
        tagFila.appendChild(tagPlaza);
        tagFila.appendChild(tagAnualidad);

        tagTBody.appendChild(tagFila);

        

        // Programar el evento onclick de la fila
        let tagDet = document.querySelector("#ventanaModal #ventana");
        let pUrl = "https://my-json-server.typicode.com/fmoncada2/ClubDeportivo/Detalles";
        tagFila.onclick = function (e){
            let container = e.target.parentElement;
           
           let urlNew = pUrl + "/"+ container.id;
           fetch (urlNew)
           .then (resp => resp.json())
           .then (datos => {
            let listaDetalles = datos;
            console.log(listaDetalles)
            // Crear los Section de ventanas
            let tagSec = document.createElement('section');
            let tagTit = document.createElement('h5');
            let tagCod = document.createElement('strong');
            let tagPla = document.createElement('span');
            let tagAnu = document.createElement('span');
            let tagBen = document.createElement('p');
            let tagRes = document.createElement('p');
            let tagCom = document.createElement('p');
            let tagBut = document.createElement('button')
            
            tagBut.setAttribute("data-bs-dismiss","modal" );
            tagBut.setAttribute("class", "btn btn-danger" );

            tagSec.setAttribute("id", listaDetalles.id);
            tagTit.innerHTML = listaDetalles.Plan;
            tagCod.innerHTML = listaDetalles.Codigo;
            tagPla.innerHTML = listaDetalles.Plaza;
            tagAnu.innerHTML = listaDetalles.Anualidad;
            tagBen.innerHTML = listaDetalles.Beneficios;
            tagRes.innerHTML = listaDetalles.Restricciones;
            tagCom.innerHTML = listaDetalles.Cometarios;

            // Agrego los objetos DOM a su contenedor
            tagSec.appendChild(tagTit);
            tagSec.appendChild(tagCod);
            tagSec.appendChild(tagPla);
            tagSec.appendChild(tagAnu);
            tagSec.appendChild(tagBen);
            tagSec.appendChild(tagRes);
            tagSec.appendChild(tagCom);
            tagSec.appendChild(tagBut);

            //console.log(listaDetalles.id);

            tagDet.appendChild(tagSec);

               
            
           });
        }        
    });        
    }     
     ); 
