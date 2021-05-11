const newPostForm = document.querySelector('#new-post-form');

const userID = document.querySelector('user-name').dataset.user;

const newPost = async (event) => {
  event.preventDefault();
  const postContentEl = document.querySelector('#new-post');
  const postContent = postContentEl.value.trim();

  if (postContent) {
    const response = await fetch('/api/posts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postContent,
        userID,
      }),
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

newPostForm.addEventListener('submit', newPost);
