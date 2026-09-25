export function initContactForm() {
    const form = document.querySelector("#contact-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.querySelector("#contact-name");
        const email = document.querySelector("#contact-email");
        const message = document.querySelector("#contact-message");

        clearErrors(form);

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

        showSuccess(form);
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

function clearErrors(form) {
  form
    .querySelectorAll(".form-field__error, .contact-form__success")
    .forEach((element) => {
      element.remove();
    });
}

function showSuccess(form) {
  const success = document.createElement("p");

  success.classList.add("contact-form__success");
  success.textContent = "Your message is ready to send.";

  form.appendChild(success);
}
