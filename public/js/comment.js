const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentText = document.querySelector("#addComment").value.trim();
  const postId = document.querySelector(".add-comment").getAttribute('post_id');

  if (commentText && postId) {
    const response = await fetch("/api/comment/", {
      method: "POST",
      body: JSON.stringify({
        post_id: postId,
        description: commentText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  } else {
    alert("400 Error with comment");
  }
};

document
  .querySelector(".add-comment")
  .addEventListener("submit", commentFormHandler);