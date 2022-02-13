const addPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  const response = await fetch(`/api/post`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/homepage");
  } else {
    alert(response.statusText);
  }
};

const getSinglePost = async () => {
  const post = document.querySelector(".singlePost").value.trim();

  const response = await fetch(`api/post/:id`, {
    method: "GET",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.ok) {
    document.location.replace("api/post/:id");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".post-form")
  .addEventListener("submit", addPostFormHandler);

  document
  .querySelector(".singlePost")
  .addEventListener("submit", getSinglePost);