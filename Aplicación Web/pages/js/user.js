jQuery(function () {
    $("#create").on("click", function () {
        $("#dvMensaje").html("");
        Insertar();
    });

    $("#updte").on("click", function () {
        $("#dvMensaje").html("");
        Update();
    });

    $("#delete").on("click", function () {
        $("#dvMensaje").html("");
        Delete();
    });

    $.get("https://localhost:44345/api/usuarios", function(data) {
        var users = data;
        console.log(users);

        // Obtener el select
        var selectUpdate = $("select[name='updateSelect']");
        var selectDelete = $("select[name='deleteSelect']");

        // Limpiar opciones existentes
        selectUpdate.empty();
        selectDelete.empty();
    
        // Agregar una opción por cada usuario
        users.forEach(function(user) {
            selectUpdate.append($("<option>", {
                value: user.id,
                text: user.name
            }));
            selectDelete.append($("<option>", {
                value: user.id, 
                text: user.name
            }));
        });
    });
});

async function Delete() {
    var selectedUserId = $("select[name='deleteSelect']").val();

    if (selectedUserId) {
        try {
            const Respuesta = await fetch(`https://localhost:44345/api/usuarios/${selectedUserId}`, {
                method: "DELETE",
                mode: "cors"
            });

            const Resultado = await Respuesta.json();
            $("#dvMensaje").html(Resultado);
        } catch (error) {
            $("#dvMensaje").html(error);
        }
    } else {
        alert("No se ha seleccionado ningún usuario.");
    }
}

async function Update() {
    // Obtener el valor seleccionado del select
    var selectedUserId = $("select[name='updateSelect']").val();

    // Verificar si se seleccionó algún usuario
    if (selectedUserId) {
        // Obtener los valores de los campos
        let Documento = $("#identification").val();
        let Nombre = $("#name").val();
        let Edad = $("#age").val();
        let Correo = $("#email").val();
        let Direccion = $("#adress").val();
        let Telefono = $("#phoneNumber").val();

        // Verificar si algún campo está vacío
        if (!Documento || !Nombre || !Edad || !Correo || !Direccion || !Telefono) {
            // Si algún campo está vacío, cargar la información del usuario
            // Aquí puedes cargar la información del usuario utilizando el ID seleccionado
            console.log("Alguno de los campos está vacío. Cargando información del usuario...");

            // Cambiar el texto del botón a "¿Confirmar?"
            $("#updte").text("¿Confirmar?");

            // Aquí puedes cargar la información del usuario utilizando el ID seleccionado
            // Por ejemplo:
            // cargarInformacionUsuario(selectedUserId);
        } else {
            // Si no hay campos vacíos, proceder con la actualización normal
            let DatosUsuario = {
                ID: selectedUserId,
                Documento: Documento,
                Nombre: Nombre,
                Edad: Edad,
                Correo: Correo,
                Direccion: Direccion,
                Telefono: Telefono
            };

            try {
                const Respuesta = await fetch(`https://localhost:44345/api/usuarios/${Documento}`, {
                    method: "PUT",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(DatosUsuario)
                });

                const Resultado = await Respuesta.json();
                $("#dvMensaje").html(Resultado);
            } catch (error) {
                $("#dvMensaje").html(error);
            }
        }
    } else {
        alert("No se ha seleccionado ningún usuario.");
    }
}


async function Insertar() {
    let Documento = $("#identification").val();
    let Nombre = $("#name").val();
    let Edad = $("#age").val();
    let Correo = $("#email").val();
    let Direccion = $("#adress").val();
    let Telefono = $("#phoneNumber").val();

    let DatosUsuario = {
        Documento: Documento,
        Nombre: Nombre,
        Edad: Edad,
        Correo: Correo,
        Direccion: Direccion,
        Telefono: Telefono
    };

    try {
        const Respuesta = await fetch("https://localhost:44345/api/usuarios", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(DatosUsuario)
        });

        const Resultado = await Respuesta.json();
        $("#dvMensaje").html(Resultado);
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}
