$(document).ready(function () {
  // Show/hide password
  $('#showPassword').on('change', function () {
    const type = $(this).is(':checked') ? 'text' : 'password';
    $('#password, #confirmPassword').attr('type', type);
  });

  // Form submit handler
  $('#registrationForm').submit(function (e) {
    e.preventDefault();
    let isValid = true;
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    const messageBox = $('#message');

    // Reset message
    messageBox.hide().removeClass('error success');

    // Validate fields
    if (!name || !email || !phone || !password || !confirmPassword) {
      showMessage('All fields are required.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showMessage('Invalid email format.', 'error');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      showMessage('Phone number must be exactly 10 digits.', 'error');
      return;
    }

    if (!validatePassword(password)) {
      showMessage('Password must be at least 8 characters long and include uppercase, lowercase, and a number.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showMessage('Passwords do not match.', 'error');
      return;
    }

    showMessage('Registration successful!', 'success');
  });

  function validateEmail(email) {
    const regex = /^[^@]+@[^@]+\.[^@]+$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  }

  function showMessage(msg, type) {
    $('#message').text(msg).addClass(type).show();
  }

  // Prevent non-digit input in phone field
  $('#phone').on('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
  });
});
