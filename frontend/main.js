const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

const backendURL = "https://YOUR-RENDER-APP.onrender.com/api/chat"; // update this after Step 2

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.textContent = text;
  div.className = "message " + sender;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = chatInput.value.trim();
  if (!input) return;
  addMessage(input, "user");
  chatInput.value = "";

  try {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();
    if (data.reply) {
      addMessage(data.reply, "bot");
    } else {
      addMessage("Sorry, no response.", "bot");
    }
  } catch (err) {
    addMessage("Error contacting backend.", "bot");
  }
});
