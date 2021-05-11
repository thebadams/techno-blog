const newPostForm = document.querySelector('#new-post-form');
const newPostTitle = document.querySelector('#post-title');
const creatorId = document.querySelector('#user-name').dataset.user;

const newPost = async (event) => {
  event.preventDefault();
  const postContentEl = document.querySelector('#new-post');
  const contents = postContentEl.value.trim();
  const title = newPostTitle.value.trim();

  if (contents && title) {
    const response = await fetch('/api/posts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        creatorId,
        title,
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
