<?php include __DIR__ . '/includes/header.php'; ?>
<h1>Iniciar sesión</h1>
<form id="loginForm">
  <div>
    <label>Email</label>
    <input type="email" id="email" required />
  </div>
  <div>
    <label>Password</label>
    <input type="password" id="password" required />
  </div>
  <button type="submit">Entrar</button>
</form>
<p id="msg"></p>
<?php include __DIR__ . '/includes/footer.php'; ?>
