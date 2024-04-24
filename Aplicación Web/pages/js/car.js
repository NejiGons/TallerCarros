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

    $.get("https://localhost:44345/api/carros", function(data) {
        var cars = data;
        console.log(cars);

        // Obtener el select
        var selectUpdate = $("select[name='updateSelect']");
        var selectDelete = $("select[name='deleteSelect']");

        // Limpiar opciones existentes
        selectUpdate.empty();
        selectDelete.empty();
    
        // Agregar una opción por cada usuario
        cars.forEach(function(car) {
            selectUpdate.append($("<option>", {
                value: car.ID,
                text: car.model
            }));
            selectDelete.append($("<option>", {
                value: car.ID, 
                text: car.model
            }));
        });
    });
});

async function Delete() {
    var selectedCarId = $("select[name='deleteSelect']").val();

    if (selectedCarId) {
        try {
            const response = await fetch(`https://localhost:44345/api/carros/${selectedCarId}`, {
                method: "DELETE",
                mode: "cors"
            });

            const result = await response.json();
            $("#dvMensaje").html(result);
        } catch (error) {
            $("#dvMensaje").html(error);
        }
    } else {
        alert("No se ha seleccionado ningún carro.");
    }
}


async function Update() {
    // Obtener el valor seleccionado del select
    var selectedCarId = $("select[name='updateSelect']").val();

    // Verificar si se seleccionó algún carro
    if (selectedCarId) {
        // Obtener los valores de los campos del formulario
        let Matricula = $("#matricula").val();
        let Modelo = $("#model").val();
        let Propietario = $("#owner").val();
        // Obtener otros valores según tu formulario

        // Verificar si algún campo está vacío
        if (!Matricula || !Modelo || !Propietario) {
            // Si algún campo está vacío, mostrar un mensaje de alerta
            alert("Por favor, complete todos los campos.");
        } else {
            // Si no hay campos vacíos, proceder con la actualización
            let datosCarro = {
                ID: selectedCarId,
                Matricula: Matricula,
                Modelo: Modelo,
                Propietario: Propietario
                // Agregar otros campos según tu formulario
            };

            try {
                const response = await fetch(`https://localhost:44345/api/carros/${selectedCarId}`, {
                    method: "PUT",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datosCarro)
                });

                const result = await response.json();
                $("#dvMensaje").html(result);
            } catch (error) {
                $("#dvMensaje").html(error);
            }
        }
    } else {
        alert("No se ha seleccionado ningún carro.");
    }
}

async function Insert() {
    // Obtener los valores de los campos del formulario
    let Matricula = $("#matricula").val();
    let Modelo = $("#model").val();
    let Propietario = $("#owner").val();
    // Obtener otros valores según tu formulario

    // Verificar si algún campo está vacío
    if (!Matricula || !Modelo || !Propietario) {
        // Si algún campo está vacío, mostrar un mensaje de alerta
        alert("Por favor, complete todos los campos.");
    } else {
        // Si no hay campos vacíos, proceder con la inserción
        let datosCarro = {
            Matricula: Matricula,
            Modelo: Modelo,
            Propietario: Propietario
            // Agregar otros campos según tu formulario
        };

        try {
            const response = await fetch("URL_del_endpoint_para_insertar_carro", {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosCarro)
            });

            const result = await response.json();
            $("#dvMensaje").html(result);
        } catch (error) {
            $("#dvMensaje").html(error);
        }
    }
}

