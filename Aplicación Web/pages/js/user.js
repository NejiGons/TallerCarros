$(document).ready(function () {
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

    // Función para obtener y llenar los selectores con los usuarios de la API
    function llenarSelectores() {
        $.get("http://localhost:52535/api/users", function(data) {
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
                    text: user.nombre // Cambiado a user.nombre en lugar de user.name
                }));
                selectDelete.append($("<option>", {
                    value: user.id, 
                    text: user.nombre // Cambiado a user.nombre en lugar de user.name
                }));
            });
        });
    }

    // Llamar a la función para llenar los selectores cuando el documento esté listo
    llenarSelectores();
});

async function Delete() {
    // Obtener el ID del usuario seleccionado para eliminar
    var selectedUserId = $("#deleteSelect").val();

    // Verificar si se seleccionó algún usuario
    if (selectedUserId) {
        try {
            // Enviar la solicitud DELETE a la API para eliminar el usuario seleccionado
            const response = await fetch(`http://localhost:52535/api/users/${selectedUserId}`, {
                method: "DELETE"
            });

            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                // Mostrar mensaje de éxito
                $("#dvMensaje").html("¡Usuario eliminado correctamente!");
                // Recargar la página para actualizar los selectores sin el usuario eliminado

                alert("Usuario eliminado con exito")

                window.location.reload();
            } else {
                // Mostrar mensaje de error si la solicitud no fue exitosa
                $("#dvMensaje").html("Error al eliminar el usuario. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error("Error al eliminar usuario:", error);
            $("#dvMensaje").html("Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.");
        }
    } else {
        // Mostrar mensaje de alerta si no se seleccionó ningún usuario
        alert("No se ha seleccionado ningún usuario.");
    }
}


async function Update() {
    // Obtener el valor seleccionado del select de usuarios a actualizar
    var selectedUserId = $("#updateSelect").val();

    // Verificar si se ha seleccionado algún usuario
    if (selectedUserId) {
        // Obtener los valores de los campos del formulario
        let Nombre = $("#name").val();
        let Cedula = $("#identification").val();
        let Edad = $("#age").val();
        let Correo = $("#email").val();
        let Direccion = $("#adress").val();
        let Telefono = $("#phoneNumber").val();

        // Verificar si algún campo está vacío
        if (!Nombre || !Cedula || !Edad || !Correo || !Direccion || !Telefono) {
            // Si algún campo está vacío, obtener la información actual del usuario seleccionado
            $.get(`http://localhost:52535/api/users/${selectedUserId}`, function(data) {
                var user = data;

                // Llenar los campos del formulario con la información actual del usuario
                $("#name").val(user.nombre);
                $("#identification").val(user.cedula);
                $("#age").val(user.edad);
                $("#email").val(user.correo);
                $("#adress").val(user.direccion);
                $("#phoneNumber").val(user.telefono);
            });
        } else {
            // Si no hay campos vacíos, proceder con la actualización
            let datosUsuario = {
                id: selectedUserId,
                nombre: Nombre,
                cedula: Cedula,
                edad: Edad,
                correo: Correo,
                direccion: Direccion,
                telefono: Telefono
                // Agregar otros campos según tu formulario
            };

            try {
                // Enviar una solicitud PUT a la API para actualizar el usuario seleccionado
                const response = await fetch(`http://localhost:52535/api/users/${selectedUserId}`, {
                    method: "PUT",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datosUsuario)
                });
                alert("Datos actualizados con exito")


                window.location.reload();

                // Convertir la respuesta a formato JSON
                const result = await response.json();

                // Mostrar el mensaje de resultado en el div de mensajes
                $("#dvMensaje").html(result);

                // Recargar la página para volver a cargar todo
            } catch (error) {
                // Mostrar un mensaje de error en el div de mensajes si ocurre algún problema con la solicitud
                $("#dvMensaje").html(error);
            }
        }
    } else {
        // Mostrar una alerta si no se ha seleccionado ningún usuario
        alert("No se ha seleccionado ningún usuario.");
    }
}



async function Insertar() {
    // Obtener los valores de los campos del formulario
    var cedula = $("#identification").val();
    var nombre = $("#name").val();
    var edad = $("#age").val();
    var correo = $("#email").val();
    var direccion = $("#adress").val();
    var telefono = $("#phoneNumber").val();

    // Verificar que todos los campos estén completos
    if (cedula && nombre && edad && correo && direccion && telefono) {
        // Crear un objeto con los datos del nuevo usuario
        var nuevoUsuario = {
            cedula: cedula,
            nombre: nombre,
            edad: edad,
            correo: correo,
            direccion: direccion,
            telefono: telefono
        };

        try {
            // Enviar la solicitud POST a la API para agregar el nuevo usuario
            const respuesta = await fetch("http://localhost:52535/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoUsuario)
            });

            // Verificar si la solicitud fue exitosa
            if (respuesta.ok) {
                const datos = await respuesta.json();
                // Mostrar mensaje de éxito
                $("#dvMensaje").html("¡Usuario creado correctamente!");
                // Limpiar los campos del formulario después de agregar el usuario
                limpiarCampos();
                alert("Datos guardados con exito")
                // Actualizar la lista de usuarios en los selectores
                window.location.reload();
            } else {
                // Mostrar mensaje de error si la solicitud no fue exitosa
                $("#dvMensaje").html("Error al agregar el usuario. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error("Error al agregar usuario:", error);
            $("#dvMensaje").html("Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.");
        }
    } else {
        // Mostrar mensaje de alerta si algún campo está vacío
        $("#dvMensaje").html("Por favor completa todos los campos antes de agregar un usuario.");
    }
}

// Función para limpiar los campos del formulario después de agregar un usuario
function limpiarCampos() {
    $("#identification").val("");
    $("#name").val("");
    $("#age").val("");
    $("#email").val("");
    $("#adress").val("");
    $("#phoneNumber").val("");
}

