const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');
let bodyBgStatus = 'topYellow'

// fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://v6.exchangerate-api.com/v6/a22e9339cf609a425bae42d6/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[currency_two];
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
      // const rate = data.conversion_rates[currency_one];
      // rateEl.innerText = `1 ${currency_two} = ${rate} ${currency_one}`
      // amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    })
};

// change bg color's linear gradient direction
function changeBgColor() {
  if (bodyBgStatus === 'topYellow') {
    document.body.style.background = "linear-gradient(to top, #ffd400 0%, #ffd400 50%, #4e9ecb 50%, #4e9ecb 100%)";
    bodyBgStatus = 'topBlue';
  } else {
    document.body.style.background = "linear-gradient(to bottom, #ffd400 0%, #ffd400 50%, #4e9ecb 50%, #4e9ecb 100%)";
    bodyBgStatus = 'topYellow';
  }
}

// event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  changeBgColor();
  calculate();
});

calculate();

// load a webppage -> GET request
// posting on a page -> POST request
// updating on a page -> PUT or PATCH request
// delete on a page -> DELETE request