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
// Función para llenar el selector de carros según el propietario seleccionado
function llenarCarrosPorPropietario(idPropietario) {
    // Limpiar opciones existentes en el selector de carros
    $("#car").empty();

    // Obtener los carros asociados al propietario seleccionado
    $.get(`http://localhost:52535/api/users/${idPropietario}/cars`, function(data) {
        var carros = data;

        // Agregar una opción por cada carro
        carros.forEach(function(carro) {
            $("#car").append($("<option>", {
                value: carro.id,
                text: `${carro.marca} - ${carro.modelo}` // Puedes cambiar esta línea para mostrar la información deseada del carro
            }));
        });
    });
}

// Cuando cambia la selección del propietario, llenar el selector de carros correspondiente
$("#owner").on("change", function() {
    var idPropietario = $(this).val();
    llenarCarrosPorPropietario(idPropietario);
});


    // Función para obtener y llenar los selectores con los usuarios de la API
    function llenarSelectores() {
        $.get("http://localhost:52535/api/users", function(data) {
            var users = data;
            console.log(users);

            // Obtener los selectores
            var selectOwner = $("#owner");
            var selectUpdate = $("select[name='updateSelect']");
            var selectDelete = $("select[name='deleteSelect']");

            // Limpiar opciones existentes
            selectOwner.empty();
            selectUpdate.empty();
            selectDelete.empty();
        
            // Agregar una opción por cada usuario
            users.forEach(function(user) {
                selectOwner.append($("<option>", {
                    value: user.id,
                    text: user.nombre
                }));
                selectUpdate.append($("<option>", {
                    value: user.id,
                    text: user.nombre
                }));
                selectDelete.append($("<option>", {
                    value: user.id,
                    text: user.nombre
                }));
            });
        });

        // Función para obtener y llenar los selectores con los carros de la API
        $.get("http://localhost:52535/api/cars", function(data) {
            var cars = data;
            console.log(cars);

            // Obtener los selectores
            var selectCar = $("#car");
            var selectUpdate = $("select[name='updateSelect']");
            var selectDelete = $("select[name='deleteSelect']");

            // Limpiar opciones existentes
            selectCar.empty();
            selectUpdate.empty();
            selectDelete.empty();
        
            // Agregar una opción por cada carro
            cars.forEach(function(car) {
                selectCar.append($("<option>", {
                    value: car.id,
                    text: car.modelo
                }));
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

        // Función para insertar un nuevo proceso
async function Insertar() {
    // Obtener los valores de los campos del formulario
    let Descripcion = $("#descripcion").val();
    let Precio = $("#precio").val();
    let DiaIngreso = $("#dia_ingreso").val();
    let DiaSalida = $("#dia_salida").val();
    let EstadoProceso = $("#estado_proceso").val();
    let Propietario = $("#owner").val();
    let Carro = $("#car").val();

    // Verificar si algún campo está vacío
    if (!Descripcion || !Precio || !DiaIngreso || !EstadoProceso || !Propietario || !Carro) {
        // Si algún campo está vacío, mostrar un mensaje de alerta
        alert("Por favor complete todos los campos.");
    } else {
        // Crear el objeto con los datos del proceso
        let datosProceso = {
            descripcion: Descripcion,
            precio: Precio,
            dia_ingreso: DiaIngreso,
            dia_salida: DiaSalida,
            estado_proceso: EstadoProceso,
            id_user: Propietario,
            id_car: Carro
        };

        try {
            // Enviar una solicitud POST a la API para insertar el nuevo proceso
            const response = await fetch("http://localhost:52535/api/processes", {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosProceso)
            });

            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                // Mostrar un mensaje de éxito
                alert("Proceso insertado correctamente.");
                // Recargar la página para actualizar los selectores
                window.location.reload();
            } else {
                // Mostrar un mensaje de error si la solicitud no fue exitosa
                alert("Error al insertar el proceso.");
            }
        } catch (error) {
            // Mostrar un mensaje de error en caso de un error en la solicitud
            alert("Error en la solicitud: " + error);
        }
    }
}


        // Función para obtener y llenar los selectores con los procesos de la API
        $.get("http://localhost:52535/api/processes", function(data) {
            var processes = data;
            console.log(processes);
        
            // Obtener los selectores
            var selectUpdate = $("select[name='updateSelect']");
            var selectDelete = $("select[name='deleteSelect']");
        
            // Limpiar opciones existentes
            selectUpdate.empty();
            selectDelete.empty();
            
            // Agregar una opción por cada proceso
            processes.forEach(function(process) {
                // Obtener el nombre del carro asociado al proceso
                $.get(`http://localhost:52535/api/cars/${process.id_car}`, function(carData) {
                    var car = carData;
                    console.log(car);
                    
                    // Agregar opción al selector de actualización
                    selectUpdate.append($("<option>", {
                        value: process.id,
                        text: car.modelo
                    }));
                    
                    // Agregar opción al selector de eliminación
                    selectDelete.append($("<option>", {
                        value: process.id,
                        text: car.modelo
                    }));
                });
            });
        });
    }

    // Llamar a la función para llenar los selectores cuando el documento esté listo
    llenarSelectores();
});
