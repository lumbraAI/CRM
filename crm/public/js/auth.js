// Simple frontend auth helper for login + crm page
document.addEventListener('DOMContentLoaded', () => {
  const API_BASE = window.API_BASE || '/api';
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const msg = document.getElementById('msg');
      // basic client-side validation
      if (!email || !password) { if (msg) msg.textContent = 'Email y password requeridos'; return; }
      if (!/^([^\s@]+@[^\s@]+\.[^\s@]+)$/.test(email)) { if (msg) msg.textContent = 'Email inválido'; return; }
      try {
        const res = await fetch(API_BASE + '/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');
        localStorage.setItem('crm_token', data.token);
        window.location.href = '/crm.php';
      } catch (err) {
        if (msg) msg.textContent = err.message;
      }
    });
    return;
  }

  // CRM page logic
  const token = localStorage.getItem('crm_token');
  const userInfo = document.getElementById('userInfo');
  const logoutBtn = document.getElementById('logout');
  if (!token) {
    window.location.href = '/index.php';
  } else if (userInfo) {
    fetch(API_BASE + '/auth/me', { headers: { Authorization: 'Bearer ' + token } })
      .then(r => r.json())
      .then(data => {
        if (data && data.email) {
          userInfo.textContent = `Conectado como ${data.email} ${data.name ? '- ' + data.name : ''}`;
        } else {
          localStorage.removeItem('crm_token');
          window.location.href = '/index.php';
        }
      }).catch(() => {
        localStorage.removeItem('crm_token');
        window.location.href = '/index.php';
      });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('crm_token');
      window.location.href = '/index.php';
    });
  }
});
