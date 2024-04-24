jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    $("#btnInsertar").on("click", function () {
        $("#dvMensaje").html("");
        Insertar();
    });
});

async function Insertar() {

    let Documento = $("#txtDocumento").val();
    let Nombre = $("#txtNombre").val();
    let FechaCredito = $("#txtFechaCredito").val();
    let Afiliado = $("#txtAfiliado").val();
    let ValorCredito = $("#txtValorCredito").val();
    let Plazo = $("#txtPlazo").val();

    let DatosNatillera = {
        Documento: Documento,
        Nombre: Nombre,
        FechaCredito: FechaCredito,
        Afiliado: Afiliado,
        ValorCredito: ValorCredito,
        Plazo: Plazo
    }

    try {

        const Respuesta = await fetch("https://localhost:44345/api/natilleras",
        {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(DatosNatillera)
            });

        const Resultado = await Respuesta.json();
        $("#dvMensaje").html(Resultado);

    } catch (error) {
        $("#dvMensaje").html(error);
    }
}