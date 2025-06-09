document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("joinForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("UserName").value.trim();
      if (username) {
        localStorage.setItem("username", username);
        window.location.href = "chat.html";
      }
    });
  }
});

const socket = io();

const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

const username = localStorage.getItem("username") || "Anonymous";
socket.emit("newUser", username);

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
    renderMessage("You", message);
    socket.emit("chat", { username, text: message });
    messageInput.value = "";
  }
});

socket.on("chat", (data) => {
  renderMessage(data.username, data.text);
});

socket.on("message", (msg) => {
  const div = document.createElement("div");
  div.textContent = msg;
  div.className = "text-gray-300 italic";
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});

function renderMessage(sender, message) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
