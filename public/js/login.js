const logInForm = document.querySelector('#log-in-form');

const handleLogin = async (event) => {
  event.preventDefault();
  const userNameEl = document.querySelector('#user-name');
  const passwordEl = document.querySelector('#password');

  const userName = userNameEl.value.trim();
  const password = passwordEl.value;

  if (userName && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response.body);
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

logInForm.addEventListener('submit', handleLogin);
