document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    const cardNumber = document.getElementById('cardNumber');
    const expDate = document.getElementById('expDate');
    const cvv = document.getElementById('cvv');
    const backToHome = document.getElementById('backToHome');

    cardNumber.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    cvv.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    expDate.addEventListener('input', function() {
        let val = this.value.replace(/[^0-9]/g, '');
        if (val.length > 2) {
            this.value = val.substring(0, 2) + '/' + val.substring(2, 4);
        } else {
            this.value = val;
        }
    });

    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('success-modal').style.display = 'flex';
    });

    backToHome.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});