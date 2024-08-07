document.addEventListener("DOMContentLoaded", ()=>{
    const formEditarPaquetes = document.querySelector("#formulario-editar-paquetes");

    const servidorURL="http://yanina.alwaysdata.net";
    //const servidorURL = "http://localhost:3001"

    const parametrosURL = new URLSearchParams(window.location.search);
    const IdPosteo =parametrosURL.get("id");

    const listarUnPaquete = async (id)=>{
        try {
            const respuesta =  await axios.get(`${servidorURL}/paquetes/${id}`);
            const paquete = respuesta.data;

            console.log(paquete);

           
            document.querySelector("#titulo").value = paquete.titulo_paquete;
            document.querySelector("#descripcion").value = paquete.descripcion_paquete;
            document.querySelector("#imagen").value = paquete.img_paquete;
            document.querySelector("#precio").value = paquete.precio_paquete;
            document.querySelector("#dias").value = paquete.dias_paquete;
            document.querySelector("#destino").value = paquete.destino_paquete;
            document.querySelector("#id_destino").value = paquete.id_destinos;

        } catch (error) {
            console.error("Error al editar el paquete", error)
        }

    } 

    if(IdPosteo){
    listarUnPaquete(IdPosteo);
    }else{
        console.log("algo falló");
    }

    formEditarPaquetes.addEventListener("submit", async function (event){
        event.preventDefault();
        const editarPaquete = {
            titulo_paquete: document.querySelector("#titulo").value,
            descripcion_paquete: document.querySelector("#descripcion").value,
            img_paquete: document.querySelector("#imagen").value,
            precio_paquete: document.querySelector("#precio").value,
            dias_paquete: document.querySelector("#dias").value,
            destino_paquete: document.querySelector("#destino").value,
            id_destinos: document.querySelector("#id_destino").value,
        };
        try {
            //console.log(editarPaquete +" "+ IdPosteo);
            await axios.put(`${servidorURL}/paquetes/${IdPosteo}`,editarPaquete);
            //console.log(editarPaquete);
            //limpiar formulario
            formEditarPaquetes.reset();
            //alert o modal y regresar a listar paquetes
            window.location.href = `./listarPaquetes.html`;
        } catch (error) {
            console.error("Error al crear el paquete", error)
        }

    }) 

})