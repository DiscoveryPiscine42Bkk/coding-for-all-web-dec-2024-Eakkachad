$(document).ready(function() {
    $('#calculateBtn').on('click', function() {
        const leftOperand = $('#leftOperand').val();
        const rightOperand = $('#rightOperand').val();
        const operator = $('#operator').val();

        if (!isPositiveInteger(leftOperand) || !isPositiveInteger(rightOperand)) {
            alert("Error :(");
            return;
        }

        const num1 = parseInt(leftOperand);
        const num2 = parseInt(rightOperand);
        let result;

        if ((operator === '/' || operator === '%') && num2 === 0) {
            alert("It's over 9000!");
            return;
        }

        switch (operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num1 / num2; break;
            case '%': result = num1 % num2; break;
            default: result = 'Invalid Operator';
        }

        alert(`Result: ${result}`);
    });

    function isPositiveInteger(value) {
        return /^\d+$/.test(value);
    }

    setInterval(function() {
        alert("Please, use me...");
    }, 30000);
});
