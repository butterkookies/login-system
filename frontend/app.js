// const API_URL = "http://localhost:5000";
const API_URL = "https://login-system-2qxu.onrender.com";

async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    const msgEl = document.getElementById("message");
    msgEl.innerText = data.message || "Registration complete";
    msgEl.className = response.ok ? "msg-success" : "msg-error";

    if (response.ok && typeof switchTab === "function") {
      setTimeout(() => switchTab("login"), 1200);
    }
  } catch (error) {
    const msgEl = document.getElementById("message");
    msgEl.innerText = "Cannot connect to server. Please try again.";
    msgEl.className = "msg-error";
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msgEl = document.getElementById("message");

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      msgEl.innerText = data.message || "Login successful.";
      msgEl.className = "msg-success";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);
    } else {
      msgEl.innerText = data.message || "Login failed";
      msgEl.className = "msg-error";
    }
  } catch (error) {
    msgEl.innerText = "Cannot connect to server. Please try again.";
    msgEl.className = "msg-error";
  }
}
