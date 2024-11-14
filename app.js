// Lógica para el envío de formulario de registro
document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    // Capturamos los valores ingresados
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    try {
        // Realizamos la llamada a la API de registro (URL de Azure Functions se configurará más adelante)
        const response = await fetch("URL_DE_LA_FUNCTION_REGISTRO", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            alert("Usuario registrado exitosamente");
            document.getElementById("registerForm").reset();
        } else {
            alert("Error al registrar usuario");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

// Lógica para consultar usuarios
document.getElementById("fetchUsersBtn").addEventListener("click", async () => {
    try {
        // Realizamos la llamada a la API de consulta de usuarios
        const response = await fetch("URL_DE_LA_FUNCTION_CONSULTA");
        
        if (response.ok) {
            const users = await response.json();
            // Mostramos la lista de usuarios
            document.getElementById("usersList").innerHTML = users.map(user => `<p>${user.username}</p>`).join("");
        } else {
            alert("Error al consultar usuarios");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
