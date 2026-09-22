// API endpoint for authentication
const API_URL = "https://login-system-2qxu.onrender.com";

// Proactive backend pre-warming to mitigate Render free-tier cold starts
let isPrewarmed = false;
function prewarmBackend() {
  if (isPrewarmed) return;
  isPrewarmed = true;
  fetch(`${API_URL}/`, { method: "GET", cache: "no-store" })
    .catch(() => {
      // Non-blocking, ignore background network errors
    });
}

// Pre-warm as soon as the page is idle or loaded
if (typeof window !== "undefined") {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(prewarmBackend, { timeout: 2000 });
  } else {
    setTimeout(prewarmBackend, 1000);
  }
}

// Modal controls for index.html
function openAuthModal(mode = 'login') {
  prewarmBackend();
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.add('active');
    switchTab(mode);
    const msg = document.getElementById('message');
    if (msg) {
      msg.innerText = '';
      msg.className = '';
    }
  }
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal when clicking outside of modal-card
window.addEventListener('click', (e) => {
  const modal = document.getElementById('authModal');
  if (e.target === modal) {
    closeAuthModal();
  }
});

// Escape key closes modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAuthModal();
  }
});

// Tab switcher between Log In and Register
function switchTab(mode) {
  const isLogin = mode === 'login';
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const nameGroup = document.getElementById('nameGroup');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const formTitle = document.getElementById('formTitle');
  const formSubtitle = document.getElementById('formSubtitle');
  const msg = document.getElementById('message');

  if (tabLogin) tabLogin.classList.toggle('active', isLogin);
  if (tabRegister) tabRegister.classList.toggle('active', !isLogin);
  if (nameGroup) nameGroup.style.display = isLogin ? 'none' : 'block';
  if (loginBtn) loginBtn.style.display = isLogin ? 'block' : 'none';
  if (registerBtn) registerBtn.style.display = isLogin ? 'none' : 'block';
  if (formTitle) formTitle.innerText = isLogin ? 'Welcome Back' : 'Join Coffee Club';
  if (formSubtitle) formSubtitle.innerText = isLogin 
    ? 'Sign in to enjoy 15% member pricing on all roasts' 
    : 'Create your account to unlock exclusive member rates';
  
  if (msg) {
    msg.innerText = '';
    msg.className = '';
  }
}

// Authentication: Register
async function register() {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const registerBtn = document.getElementById("registerBtn");
  const msgEl = document.getElementById("message");

  const name = nameEl ? nameEl.value.trim() : "";
  const email = emailEl ? emailEl.value.trim() : "";
  const password = passwordEl ? passwordEl.value : "";

  if (!name || !email || !password) {
    if (msgEl) {
      msgEl.innerText = "Please complete all fields.";
      msgEl.className = "msg-error";
    }
    return;
  }

  // Set loading state
  const originalBtnText = registerBtn ? registerBtn.innerHTML : "Create Membership";
  if (registerBtn) {
    registerBtn.disabled = true;
    registerBtn.innerHTML = `<span class="btn-spinner"></span> Creating membership...`;
  }
  if (msgEl) {
    msgEl.innerText = "";
    msgEl.className = "";
  }

  // Cold start feedback timer
  const coldStartTimer = setTimeout(() => {
    if (msgEl && registerBtn && registerBtn.disabled) {
      msgEl.innerText = "Waking up cloud server... please hold on a moment.";
      msgEl.className = "msg-info";
    }
  }, 3500);

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    clearTimeout(coldStartTimer);
    const data = await response.json();

    if (msgEl) {
      msgEl.innerText = data.message || "Registration complete!";
      msgEl.className = response.ok ? "msg-success" : "msg-error";
    }

    if (response.ok) {
      // Pre-fill email in login tab and switch quickly
      setTimeout(() => {
        switchTab("login");
        const loginEmailEl = document.getElementById("email");
        if (loginEmailEl) loginEmailEl.value = email;
        const loginPassEl = document.getElementById("password");
        if (loginPassEl) {
          loginPassEl.value = "";
          loginPassEl.focus();
        }
      }, 400);
    }
  } catch (error) {
    clearTimeout(coldStartTimer);
    if (msgEl) {
      msgEl.innerText = "Cannot connect to server. Please try again.";
      msgEl.className = "msg-error";
    }
  } finally {
    if (registerBtn) {
      registerBtn.disabled = false;
      registerBtn.innerHTML = originalBtnText;
    }
  }
}

// Authentication: Login
async function login() {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const msgEl = document.getElementById("message");

  const email = emailEl ? emailEl.value.trim() : "";
  const password = passwordEl ? passwordEl.value : "";

  if (!email || !password) {
    if (msgEl) {
      msgEl.innerText = "Please enter both email and password.";
      msgEl.className = "msg-error";
    }
    return;
  }

  // Set loading state
  const originalBtnText = loginBtn ? loginBtn.innerHTML : "Sign In";
  if (loginBtn) {
    loginBtn.disabled = true;
    loginBtn.innerHTML = `<span class="btn-spinner"></span> Signing in...`;
  }
  if (msgEl) {
    msgEl.innerText = "";
    msgEl.className = "";
  }

  // Cold start feedback timer
  const coldStartTimer = setTimeout(() => {
    if (msgEl && loginBtn && loginBtn.disabled) {
      msgEl.innerText = "Waking up cloud server... please hold on a moment.";
      msgEl.className = "msg-info";
    }
  }, 3500);

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    clearTimeout(coldStartTimer);
    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      if (msgEl) {
        msgEl.innerText = data.message || "Login successful. Entering cafe...";
        msgEl.className = "msg-success";
      }
      // Instant redirect without artificial delay
      window.location.href = "dashboard.html";
    } else {
      if (msgEl) {
        msgEl.innerText = data.message || "Login failed. Please check credentials.";
        msgEl.className = "msg-error";
      }
    }
  } catch (error) {
    clearTimeout(coldStartTimer);
    if (msgEl) {
      msgEl.innerText = "Cannot connect to server. Please try again.";
      msgEl.className = "msg-error";
    }
  } finally {
    if (loginBtn) {
      loginBtn.disabled = false;
      loginBtn.innerHTML = originalBtnText;
    }
  }
}
