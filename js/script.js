//object with data
const rates = {
  EUR: { USD: 1.09, GBP: 0.86, PLN: 4.35 },
  USD: { EUR: 0.92, GBP: 0.79, PLN: 4.02 },
  GBP: { EUR: 1.16, USD: 1.27, PLN: 5.05 },
  PLN: { EUR: 0.23, USD: 0.25, GBP: 0.2 },
};

//elements
const form = document.getElementById("form");
const amountInput = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");
const resultMain = document.getElementById("resultMain");
const resultRate = document.getElementById("resultRate");
const convertBtn = document.getElementById("convertBtn");
const resetBtn = document.getElementById("resetBtn");

// sambit event
form.addEventListener("submit", (a) => {
  a.preventDefault();

  const amount = amountInput.value;
  if (amount <= 0) return;

  const rate = rates[from.value][to.value];
  const converted = (amount * rate).toFixed(2);

  resultMain.innerHTML = `
  <span>${amount} ${from.value}</span> yra <span>${converted} ${to.value}</span>`;

  resultRate.textContent = `Santykis: 1 ${from.value} = ${rate} ${to.value}`;

  result.classList.remove("hidden");
  resetBtn.classList.remove("hidden");
  convertBtn.disabled = true;
});

//form reset
resetBtn.addEventListener("click", () => {
  form.reset();
  convertBtn.disabled = false;
  result.classList.add("hidden");
  resetBtn.classList.add("hidden");
});
