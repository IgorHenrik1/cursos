const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const button = document.querySelector('form button');
const modal = document.querySelector('.modal-wrapper');
const error = document.querySelector('.alert-error');
const close = document.querySelector('.close');

button.addEventListener('click', (e) => {
    e.preventDefault();
    validateInputs(weight.value, height.value);
});

function validateInputs(w, h) {
    if (!isNaN(w) && !isNaN(h)) {
        let regexHeight = /^\d{1,2}\.\d{1,2}$/;

        if (regexHeight.test(h)) {
            calculateBmi(w, h);
            error.classList.remove('open');
        } else {
            error.innerText = 'Digite sua altura em metros no formato x.xx';
            error.classList.add('open');
        }
    } else {
        error.innerText = 'Digite somente números';
        error.classList.add('open');
    }
}
function calculateBmi(w, h) {
    const bmi = w / (h * h);
    openModal(bmi);
}

function openModal(bmi) {
    modal.classList.add('open');
    modal.querySelector('h2').innerText = `Seu IMC é ${bmi.toFixed(2)}`;
}

close.addEventListener('click', () => {
    modal.classList.remove('open');
    height.value = '';
    weight.value = '';
});
