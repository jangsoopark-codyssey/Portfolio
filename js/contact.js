export function initContactForm(endpoint) {
    const form = document.querySelector("#contact-form");
    const submitButton = document.querySelector("#contact-submit");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.querySelector("#contact-name");
        const email = document.querySelector("#contact-email");
        const message = document.querySelector("#contact-message");

        clearMessages(form);

        let isValid = true;

        if (!name.value.trim()) {
            showError(name, "Please enter your name.");
            isValid = false;
        }

        if (!email.value.trim()) {
            showError(email, "Please enter your email.");
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, "Please enter a valid email address.");
            isValid = false;
        }

        if (!message.value.trim()) {
            showError(message, "Please enter a message.");
            isValid = false;
        }

        if (!isValid)
            return;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              name: name.value.trim(),
              email: email.value.trim(),
              message: message.value.trim()
            })
          });
          
          if (!response.ok) {
            throw new Error(`Failed to send message: ${response.status}`);
          }

          showSuccess(form, "Message sent successfully.");
          form.reset();
        } catch (error) {
          console.error(error);
          showFormError(
            form,
            "Failed to send message. Please try again."
          );
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
        }
    });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
  const error = document.createElement("p");

  error.classList.add("form-field__error");
  error.textContent = message;

  input.parentElement.appendChild(error);
}

function clearMessages(form) {
  form
    .querySelectorAll(
      ".form-field__error, .contact-form__success, .contact-form__error"
    )
    .forEach((element) => {
      element.remove();
    });
}

function showSuccess(form, message) {
  const success = document.createElement("p");

  success.classList.add("contact-form__success");
  success.textContent = message;

  form.appendChild(success);
}

function showFormError(form, message) {
  const error = document.createElement("p");

  error.classList.add("contact-form__error");
  error.textContent = message;

  form.appendChild(error);
}
