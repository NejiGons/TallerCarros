jQuery(function () {
    //Registrar los botones para responder al evento click
    $("#dvMenu").load("../Paginas/Menu.html");
    //Levantar el evento "click" del botón insertar
    $("#btnInsertar").on("click", function () {
        Insertar();
    });
});

async function Insertar() {
    let Documento = $("#txtDocumento").val();
    let Nombre = $("#txtNombre").val();
    let HoraReserva = $("#cboHoras").val();
    let DiaReserva = $("#txtDiaReserva").val();

    let DatosReserva = {
        Documento: Documento,
        Nombre: Nombre,
        HoraReserva: HoraReserva,
        DiaReserva: DiaReserva
    }

    try {
        const Respuesta = await fetch("http://localhost:52167/api/reservas",
            {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(DatosReserva)
            });
        //Leer la respuesta y presentarla en el div
        const Resultado = await Respuesta.json();
        $("#dvMensaje").html(Resultado);
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}