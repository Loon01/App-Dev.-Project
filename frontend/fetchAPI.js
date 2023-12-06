// Register form submission with fetch API
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(registerForm);
  try {
    const response = await fetch('/register', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data); // Handle success or error messages
  } catch (error) {
    console.error('Error:', error);
  }
});
