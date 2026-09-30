export function initContactForm(endpoint) {
    const form = document.querySelector("#contact-form");
    const submitButton = document.querySelector("#contact-submit");

    const name = document.querySelector("#contact-name");
    const email = document.querySelector("#contact-email");
    const message = document.querySelector("#contact-message");

    name.addEventListener("input", () => {
        validateName(name);
    });

    email.addEventListener("input", () => {
        validateEmail(email);
    });

    message.addEventListener("input", () => {
        validateMessage(message);
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        clearMessages(form);

        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);
        const isMessageValid = validateMessage(message);

        if (!isNameValid || !isEmailValid || !isMessageValid) {
            return;
        }

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
                throw new Error(
                    `Failed to send message: ${response.status}`
                );
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

function validateName(input) {
    clearFieldError(input);

    if (!input.value.trim()) {
        showError(input, "Please enter your name.");
        return false;
    }

    return true;
}

function validateEmail(input) {
    clearFieldError(input);

    if (!input.value.trim()) {
        showError(input, "Please enter your email.");
        return false;
    }

    if (!isValidEmail(input.value)) {
        showError(
            input,
            "Please enter a valid email address."
        );

        return false;
    }

    return true;
}

function validateMessage(input) {
    clearFieldError(input);

    if (!input.value.trim()) {
        showError(input, "Please enter a message.");
        return false;
    }

    return true;
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

function clearFieldError(input) {
    const error =
        input.parentElement.querySelector(".form-field__error");

    if (error) {
        error.remove();
    }
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