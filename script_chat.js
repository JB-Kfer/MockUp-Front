const backendUrl = "https://mockup-lmf2.onrender.com";

let allMsgs = [];
let local = sessionStorage.getItem('username');

function fetchMessages() {
    fetch(backendUrl + '/msg/getAll')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            allMsgs = json.msgs;
            update(allMsgs);
        });
}

setInterval(fetchMessages, 5000);
fetchMessages();

async function sendMessage() {
    const textArea = document.querySelector("textarea");
    const textToSend = textArea.value.trim();

    if (textToSend === "") {
        alert("Veuillez entrer un message.");
        return;
    }

    textArea.value = "";

    try {
        const response = await fetch(backendUrl + "/msg/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: textToSend, user: local })
        });

        if (response.ok) {
            allMsgs.push({ content: textToSend, user: local });
            update(allMsgs);
        } else {
            alert("Failed to send message. Server responded with status: " + response.status);
        }
    } catch (error) {
        console.error(error);
        alert("Failed to send message. Error: " + error.message);
    }
}

function update(newMsgs) {
    if (!newMsgs) return;

    const list = document.getElementById("messageList");
    list.innerHTML = "";

    for (let i = 0; i < newMsgs.length; i++) {
        const msg = newMsgs[i];
        const li = document.createElement("li");

        if (msg.user === local) {
            const messageContainer = document.createElement("div");

            const usernameDiv = document.createElement("div");
            usernameDiv.classList.add("message-right-more");

            const messageRight = document.createElement("div");
            messageRight.classList.add("message-right");
            const message = document.createTextNode(msg.content);
            messageRight.appendChild(message);

            messageContainer.appendChild(usernameDiv);
            messageContainer.appendChild(messageRight);
            li.appendChild(messageContainer);

            const ul = document.querySelector("ul");
            ul.appendChild(li);
        } else {
            const messageContainer = document.createElement("div");

            const usernameDiv = document.createElement("div");
            usernameDiv.classList.add("message-left-more");
            const username = document.createTextNode(msg.user);
            usernameDiv.appendChild(username);

            const messageLeft = document.createElement("div");
            messageLeft.classList.add("message-left");
            const message = document.createTextNode(msg.content);
            messageLeft.appendChild(message);

            messageContainer.appendChild(usernameDiv);
            messageContainer.appendChild(messageLeft);
            li.appendChild(messageContainer);

            const ul = document.querySelector("ul");
            ul.appendChild(li);
        }

        list.appendChild(li);

        const separator = document.createElement("li");
        separator.classList.add("message-separator");
        list.appendChild(separator);
    }
}