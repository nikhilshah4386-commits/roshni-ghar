function addMessage(text, type) {
  const output = document.getElementById("assistantOutput");
  if (!output) return;

  const div = document.createElement("div");
  div.className = "message " + type;
  div.textContent = text;

  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("assistantInput");

  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  addMessage("सोच रहा हूँ...", "assistant");

  try {
    const response = await fetch("http://127.0.0.1:8090/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    const messages = document.querySelectorAll(".assistant");
    const thinking = messages[messages.length - 1];

    if (thinking && thinking.textContent === "सोच रहा हूँ...") {
      thinking.remove();
    }

    if (data.reply) {
      addMessage(data.reply, "assistant");
    } else {
      addMessage("AI से जवाब नहीं मिला।", "assistant");
    }

  } catch (error) {
    const messages = document.querySelectorAll(".assistant");
    const thinking = messages[messages.length - 1];

    if (thinking && thinking.textContent === "सोच रहा हूँ...") {
      thinking.textContent = "Roshni AI से connection नहीं हो पाया।";
    } else {
      addMessage("Roshni AI से connection नहीं हो पाया।", "assistant");
    }

    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("assistantInput");

  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
      }
    });
  }
});


// Roshni Voice Assistant
let recognition;

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  recognition = new SpeechRecognition();
  recognition.lang = "hi-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = function () {
    const mic = document.getElementById("micButton");
    if (mic) mic.textContent = "🔴";
  };

  recognition.onend = function () {
    const mic = document.getElementById("micButton");
    if (mic) mic.textContent = "🎤";
  };

  recognition.onerror = function (event) {
    const mic = document.getElementById("micButton");
    if (mic) mic.textContent = "🎤";
    addMessage("Voice में समस्या हुई: " + event.error, "assistant");
  };

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;

    const input = document.getElementById("assistantInput");
    if (input) {
      input.value = text;
      sendMessage();
    }
  };
}

function startVoice() {
  if (!recognition) {
    addMessage("इस browser में Voice Recognition उपलब्ध नहीं है।", "assistant");
    return;
  }

  recognition.start();
}
