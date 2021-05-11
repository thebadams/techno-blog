const signupForm = document.querySelector('#sign-up-form');

const signup = async (event) => {
  event.preventDefault();
  const userNameEl = document.querySelector('#user-name');
  const passwordEl = document.querySelector('#password');

  const userName = userNameEl.value.trim();
  const password = passwordEl.value;

  if (userName && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application.json' },
      body: JSON.stringify({ userName, password }),
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

signupForm.addEventListener('submit', signup);
