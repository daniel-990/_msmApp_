const init = () =>{
    const numeroPropio = document.getElementById("numero-wap");
    const mensaje = document.getElementById("mensaje");
    const destino = document.getElementById("numero");
    //boton enviar
    const btnEnviar = document.getElementById("btn-enviar");

    //render de los mensajes
    const htmlMensajes = document.getElementById("render-mensajes");

    const enviarMensaje = (event) => {
        event.preventDefault();
        if (destino.value == "" && mensaje.value == ""){
            alert("Todos los datos son obligatorios");
        }else{
            axios.post('/enviarmensaje', {
                mensaje: mensaje.value,
                wap: numeroPropio.value,
                destino: destino.value
              })
              .then(function (response) {
                console.log(`mensaje enviado: ${JSON.stringify(response)}`);
                destino.value = "";
                mensaje.value = "";
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }
      setInterval(() => {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function(data) {

        const datos = JSON.parse(this.responseText);
        //console.log(datos.body);
        htmlMensajes.innerHTML = `
          <div class="contenedor-msm">
            <h4 class="ultimo-mensaje text-left"><i class="bi bi-chat-dots"></i> Ultimo mensaje</h4>
            <i class="bi bi-caret-right-fill"></i> ${datos.body}
          </div>
        `;
        }
        xhttp.open("GET", "/tomarmensajes");
        xhttp.send();
      },1000);
      
      //boton enviar
      btnEnviar.addEventListener('click', enviarMensaje);
}
init();