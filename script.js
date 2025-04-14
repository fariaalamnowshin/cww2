function validateLoginForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
  
    if (email === '' || password === '') {
      alert("Please fill out all fields.");
      return false;
    }
  
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return false;
    }
  
    return true;
  }
  function validateRegisterForm() {
    const pass = document.getElementById('password').value.trim();
    const confirm = document.getElementById('confirmPassword').value.trim();
  
    if (pass !== confirm) {
      alert("Passwords do not match.");
      return false;
    }
  
    // Redirect to homepage
    window.location.href = "index.html";
    return false; // prevent actual form submission
  }
  