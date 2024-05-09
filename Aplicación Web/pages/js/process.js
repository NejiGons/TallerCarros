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
    let userData;

// Función para llenar el selector de carros según el propietario seleccionado
function llenarCarrosPorPropietario(idPropietario) {
    // Limpiar opciones existentes en el selector de carros
    $("#car").empty();

    // Obtener los carros asociados al propietario seleccionado
    $.get(`http://localhost:52535/api/cars/byOwner/${idPropietario}`, function(data) {
        var carros = data;


        
        $("#car").append($("<option>", {
            value: "",
            text: "Seleccionar"
        }));
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

            // Limpiar opciones existentes
            selectOwner.empty();

            selectOwner.append($("<option>", {
                value: "",
                text: "Seleccionar"
            }));

            // Agregar una opción por cada usuario
            users.forEach(function(user) {
                selectOwner.append($("<option>", {
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


            // Limpiar opciones existentes
            selectCar.empty();

        
            $("#car").append($("<option>", {
                value: "",
                text: "Seleccionar"
            }));

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

    async function Delete() {
        // Obtener el ID del proceso seleccionado para eliminar
        let procesoId = $("select[name='deleteSelect']").val();
    
        // Verificar si se seleccionó un proceso
        if (!procesoId) {
            // Mostrar un mensaje de alerta si no se seleccionó ningún proceso
            alert("Por favor selecciona un proceso para eliminar.");
        } else {
            // Confirmar si el usuario realmente desea eliminar el proceso
            if (confirm("¿Estás seguro de que deseas eliminar este proceso?")) {
                try {
                    // Enviar una solicitud DELETE a la API para eliminar el proceso
                    const response = await fetch(`http://localhost:52535/api/processes/${procesoId}`, {
                        method: "DELETE",
                        mode: "cors"
                    });
    
                    // Verificar si la solicitud fue exitosa
                    if (response.ok) {
                        // Mostrar un mensaje de éxito
                        alert("Proceso eliminado correctamente.");
                        // Recargar la página para actualizar los selectores
                        window.location.reload();
                    } else {
                        // Mostrar un mensaje de error si la solicitud no fue exitosa
                        alert("Error al eliminar el proceso.");
                    }
                } catch (error) {
                    // Mostrar un mensaje de error en caso de un error en la solicitud
                    alert("Error en la solicitud: " + error);
                }
            }
        }
    }

    async function Update() {
        $("#processID").val($("select[name='updateSelect']").val());

        let descripcion = $("#descripcion").val();
        let precio = $("#precio").val();
        let dia_ingreso = $("#dia_ingreso").val();
        let dia_salida = $("#dia_salida").val();
        let estado_proceso = $("#estado_proceso").val();
        let owner = $("#owner").val();
        let processID = $("#processID").val();
        var selectCar = $("#car");
        var selectUser = $("#owner");
        selectCar.empty();
        selectUser.empty();
    
        if (!descripcion || !precio || !dia_ingreso || !dia_salida || !estado_proceso) {
            try {
                console.log(processID)
                // Método GET para obtener datos del usuario desde la API
                let response = await fetch(`http://localhost:52535/api/processes/${processID}`);
                
                if (response.ok) {
                    userData = await response.json();
                    id_user = userData.id_user;
                    id_car = userData.id_car;

                    let user;
                    let car;

                    try {
                        // Método GET para obtener los datos del usuario desde la API
                        let userResponse = await fetch(`http://localhost:52535/api/users/${userData.id_user}`);
                        
                        if (userResponse.ok) {
                            user = await userResponse.json();
                        } else {
                            console.error('Error al obtener los datos del usuario');
                        }
                    } catch (error) {
                        console.error('Error en la solicitud:', error);
                    }

                    try {
                        // Método GET para obtener los datos del usuario desde la API
                        let carResponse = await fetch(`http://localhost:52535/api/cars/${userData.id_car}`);
                        
                        if (carResponse.ok) {
                            car = await carResponse.json();
                        } else {
                            console.error('Error al obtener los datos del usuario');
                        }
                    } catch (error) {
                        console.error('Error en la solicitud:', error);
                    }
                    console.log(userData.id_user)
                    $("#processID").val(userData.id)
                    $("#descripcion").val(userData.descripcion);
                    $("#precio").val(userData.precio);
                    $("#estado_proceso").val(userData.estado_proceso);
                    $("#dia_ingreso").val(userData.dia_ingreso.substring(0, 10));
                    $("#dia_salida").val(userData.dia_salida.substring(0, 10));
                    $("#owner").val(user.nombre);
                    $("#car").append($("<option>", {
                        value: userData.id_car,
                        text: car.modelo
                    }));
                    $("#owner").append($("<option>", {
                        value: userData.id_user,
                        text: user.nombre
                    }));
                    
                } 

            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        }else{
            try {
                console.log(userData.id_user + "" + userData.id_car)

                let idProceso = $("#processID").val();
                let newProcess = {
                    id: idProceso,
                    descripcion: $("#descripcion").val(),
                    precio: $("#precio").val(),
                    dia_ingreso: $("#dia_ingreso").val(),
                    dia_salida: $("#dia_salida").val(),
                    id_user: userData.id_user,
                    id_car: userData.id_car,
                    estado_proceso: $("#estado_proceso").val()
                };

                console.log(newProcess)
                let url = `http://localhost:52535/api/processes/${idProceso}`;
        
                let response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProcess)
                });
        
                if (response.ok) {
                    console.log('Proceso actualizado con éxito.');
                } else {
                    console.error('Error al actualizar el proceso:', response.statusText);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }  
            window.location.reload();
            alert("actualizado con exito");
        }
    }
    




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
    
            console.log("datosProceso")
    
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
    
    // Llamar a la función para llenar los selectores cuando el documento esté listo
    llenarSelectores();
});
