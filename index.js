document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.getElementById("login-container");
    const chatContainer = document.getElementById("chat-container");
    const usernameInput = document.getElementById("username");
    const messageInput = document.getElementById("message");
    const chatOutput = document.getElementById("chat-output");
    const sendButton = document.getElementById("send");
    const loginButton = document.getElementById("login-btn");
    const logoutButton = document.getElementById("logout-btn");

    let username = "";

    // WebSocket connection
    const socket = new WebSocket("ws://localhost:5501/");

    // Login logic
    loginButton.addEventListener("click", () => {
        username = usernameInput.value.trim();
        if (username) {
            loginContainer.style.display = "none";
            chatContainer.style.display = "block";
        }
    });

    // Logout logic
    logoutButton.addEventListener("click", () => {
        username = "";
        loginContainer.style.display = "flex";
        chatContainer.style.display = "none";
    });

    // Handle incoming messages
    socket.addEventListener("message", async (event) => {
        const message = JSON.parse(await event.data.text());
        chatOutput.innerHTML += `<p><strong>${message.username}:</strong> ${message.text}</p>`;
        chatOutput.scrollTop = chatOutput.scrollHeight;
    });

    // Send message logic
    sendButton.addEventListener("click", () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const message = { username, text: messageText };
            socket.send(JSON.stringify(message));
            messageInput.value = "";
        }
    });
});
