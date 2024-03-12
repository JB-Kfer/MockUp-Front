const backendUrl = "https://mockup-lmf2.onrender.com";

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "") {
        alert("Veuillez entrer un nom d'utilisateur (admin).");
        return;
    }

    if (password === "") {
        alert("Veuillez entrer un mot de passe (admin).");
        return;
    }

    username.value = "";
    password.value = "";

    try {
        const response = await fetch(backendUrl + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password })
        });

        if (response.ok) {
            sessionStorage.setItem('username', username);
            window.location.href = 'chatchoice.html';
        } else {
            alert("Indentifiants incorrects (utilisez admin / admin)");
        }
    } catch (error) {
        console.error(error);
        alert("Failed to login. Error: " + error.message);
    }
}
