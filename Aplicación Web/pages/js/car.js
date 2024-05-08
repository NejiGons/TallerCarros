jQuery(function () {
    $("#create").on("click", function () {
        $("#dvMensaje").html("");
        Insert();
    });

    $("#updte").on("click", function () {
        $("#dvMensaje").html("");
        Update();
    });

    $("#delete").on("click", function () {
        $("#dvMensaje").html("");
        Delete();
    });

    // Llenar selectores al cargar la página
    llenarSelectoresCars();
    llenarSelectoresPropietarios();
});

// Función para obtener y llenar los selectores con los carros de la API
function llenarSelectoresCars() {
    $.get("http://localhost:52535/api/cars", function(data) {
        var cars = data;
        console.log(cars);

        // Obtener el select
        var selectUpdate = $("select[name='updateSelect']");
        var selectDelete = $("select[name='deleteSelect']");

        // Limpiar opciones existentes
        selectUpdate.empty();
        selectDelete.empty();
    
        // Agregar una opción por cada carro
        cars.forEach(function(car) {
            selectUpdate.append($("<option>", {
                value: car.id,
                text: car.modelo
            }));
            selectDelete.append($("<option>", {
                value: car.id, 
                text: car.modelo
            }));
        });
    });
}

// Función para obtener y llenar los selectores con los propietarios de la API
function llenarSelectoresPropietarios() {
    // Obtener los usuarios de la API
    $.get("http://localhost:52535/api/users", function(data) {
        var users = data;

        // Obtener el select de propietario
        var selectOwner = $("#owner");

        // Limpiar opciones existentes
        selectOwner.empty();
    
        // Agregar una opción por cada usuario
        users.forEach(function(user) {
            selectOwner.append($("<option>", {
                value: user.id,
                text: user.nombre
            }));
        });

        // Después de llenar el selector de propietario con los nombres de los usuarios, llenar los selectores de carros
        llenarSelectoresCars();
    });
}

async function Delete() {
    // Obtener el valor seleccionado del select de carros a eliminar
    var selectedCarId = $("select[name='deleteSelect']").val();

    // Verificar si se ha seleccionado algún carro
    if (selectedCarId) {
        try {
            // Enviar una solicitud DELETE a la API para eliminar el carro seleccionado
            const response = await fetch(`http://localhost:52535/api/cars/${selectedCarId}`, {
                method: "DELETE",
                mode: "cors"
            });

            // Convertir la respuesta a formato JSON
            const result = await response.json();
            window.location.reload();

            // Mostrar el mensaje de resultado en el div de mensajes
            $("#dvMensaje").html(result);

        } catch (error) {
            // Mostrar un mensaje de error en el div de mensajes si ocurre algún problema con la solicitud
            $("#dvMensaje").html(error);
        }
    } else {
        // Mostrar una alerta si no se ha seleccionado ningún carro
        alert("No se ha seleccionado ningún carro.");
    }
}


async function Update() {
    // Obtener el valor seleccionado del select de carros a actualizar
    var selectedCarId = $("select[name='updateSelect']").val();

    // Verificar si se ha seleccionado algún carro
    if (selectedCarId) {
        // Obtener los valores de los campos del formulario
        let Matricula = $("#matricula").val();
        let Modelo = $("#model").val();
        let Marca = $("#marca").val();
        let Propietario = $("#owner").val(); // El propietario se obtiene del selector de propietario

        // Verificar si algún campo está vacío
        if (!Matricula || !Modelo || !Marca || !Propietario) {
            // Si algún campo está vacío, obtener la información actual del vehículo seleccionado
            $.get(`http://localhost:52535/api/cars/${selectedCarId}`, function(data) {
                var car = data;

                // Llenar los campos del formulario con la información actual del vehículo
                $("#matricula").val(car.matricula);
                $("#model").val(car.modelo);
                $("#marca").val(car.marca);
                $("#owner").val(car.id_user); // Establecer el valor del propietario en el selector de propietario
            });
        } else {
            // Si no hay campos vacíos, proceder con la actualización
            let datosCarro = {
                id: selectedCarId,
                id_user: Propietario,
                matricula: Matricula,
                modelo: Modelo,
                marca: Marca
                // Agregar otros campos según tu formulario
            };

            try {
                // Enviar una solicitud PUT a la API para actualizar el carro seleccionado
                const response = await fetch(`http://localhost:52535/api/cars/${selectedCarId}`, {
                    method: "PUT",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datosCarro)
                });
                window.location.reload();
                // Convertir la respuesta a formato JSON
                const result = await response.json();
                // Mostrar el mensaje de resultado en el div de mensajes
                $("#dvMensaje").html(result);
            } catch (error) {
                // Mostrar un mensaje de error en el div de mensajes si ocurre algún problema con la solicitud
                $("#dvMensaje").html(error);
            }
        }
    } else {
        // Mostrar una alerta si no se ha seleccionado ningún carro
        alert("No se ha seleccionado ningún carro.");
    }
}




async function Insert() {
    // Obtener los valores de los campos del formulario
    let Matricula = $("#matricula").val();
    let Modelo = $("#model").val();
    let Marca = $("#marca").val(); // Nuevo campo agregado: Marca
    let Propietario = $("#owner").val(); // El propietario se obtiene del selector de propietario

    // Verificar si algún campo está vacío
    if (!Matricula || !Modelo || !Marca || !Propietario) {
        // Si algún campo está vacío, mostrar un mensaje de alerta
        alert("Por favor, complete todos los campos.");
    } else {
        // Si no hay campos vacíos, proceder con la inserción
        let nuevoCarro = {
            id_user: Propietario,
            matricula: Matricula,
            marca: Marca,
            modelo: Modelo
        };

        try {
            const response = await fetch("http://localhost:52535/api/cars", {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoCarro)
            });

            const result = await response.json();
            window.location.reload();
            $("#dvMensaje").html(result);

        } catch (error) {
            $("#dvMensaje").html(error);
        }
    }
}
