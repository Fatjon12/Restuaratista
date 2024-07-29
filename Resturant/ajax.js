$(document).ready(function() {

    const form = $('#newsletter-form');
    const emailInput = $('#email');
    const checkBoxInput = $('#newsletter');
    const messageContainer = $('#message-container');

    form.on('submit', function(event) {

        event.preventDefault();
        const emailValue = emailInput.val().trim();
        const checkboxValue = checkBoxInput.prop('checked');

        if (!isEmailValid(emailValue)) {
            alert('Please enter a valid email');
            emailInput.focus();
        } else if (!checkboxValue) {
            alert('Please select the checkbox');
            checkBoxInput.focus();
        } else {
            alert('Thank you');
            form[0].reset();
        }
    });

    function isEmailValid(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    function showMessage(message, type) {
        let messageContainer = $('#message-container');
        messageContainer.text(message);

        messageContainer.removeClass().addClass(type)
    }

});
