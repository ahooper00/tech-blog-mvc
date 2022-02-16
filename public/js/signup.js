const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert(
          "Please fill in all details and make sure password is 8 characters long."
        );
      }
    }
  };
  
  document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler)