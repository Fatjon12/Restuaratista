document.addEventListener("DOMContentLoaded", function load() {

    const form = document.getElementById('newsletter-form');  // Corrected 'from' to 'form'
    const emailInput = document.getElementById('email');
    const checkBoxInput = document.getElementById('checkbox');
    const messageContainer = document.getElementById('message-container');

    form.addEventListener('submit', function(event) {

        event.preventDefault();
        const emailValue = emailInput.value.trim();
        const checkboxValue = checkBoxInput.checked;

        if (!isEmailValid(emailValue)) {  // Corrected condition to check for invalid email
            alert('Please enter a valid email');  // Corrected typo 'eamil' to 'email'
            emailInput.focus();
        } else if (!checkboxValue) {
            alert('Please select the checkbox');
            checkBoxInput.focus();
        } else {
            alert('Thank you');
            form.reset();
        }
    });

    function isEmailValid(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

});
