// object with data
const rates = {
  EUR: { USD: 1.09, GBP: 0.86, PLN: 4.35 },
  USD: { EUR: 0.92, GBP: 0.79, PLN: 4.02 },
  GBP: { EUR: 1.16, USD: 1.27, PLN: 5.05 },
  PLN: { EUR: 0.23, USD: 0.25, GBP: 0.2 },
};

// elements
const form = document.getElementById("form");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");
const resultMain = document.getElementById("resultMain");
const resultRate = document.getElementById("resultRate");
const convertBtn = document.getElementById("convertBtn");
const resetBtn = document.getElementById("resetBtn");
const spinner = convertBtn.querySelector(".spinner");
const btnText = convertBtn.querySelector(".btn-text");

const fromSelect = document.querySelector('[data-name="from"]');
const toSelect = document.querySelector('[data-name="to"]');

// custom select instead of option select
const customSelects = document.querySelectorAll(".custom-select");

customSelects.forEach((select) => {
  const trigger = select.querySelector(".select-trigger");
  const valueEl = select.querySelector(".select-value");

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    customSelects.forEach((s) => s.classList.remove("open"));
    select.classList.toggle("open");
  });

  select.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      valueEl.textContent = option.textContent;
      select.dataset.value = option.dataset.value;
      select.classList.remove("open");
    });
  });
});

document.addEventListener("click", () => {
  customSelects.forEach((s) => s.classList.remove("open"));
});

// submits form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = Number(amountInput.value);
  const from = fromSelect.dataset.value;
  const to = toSelect.dataset.value;

  amountInput.classList.remove("input-error");

  if (value <= 0 || from === to) {
    amountInput.classList.add("input-error");
    amountInput.focus();
    return;
  }

  convertBtn.disabled = true;
  btnText.classList.add("hidden");
  spinner.classList.remove("hidden");
  spinner.classList.add("spin");

  setTimeout(() => {
    const rate = rates[from][to];
    const resultValue = (value * rate).toFixed(2);

    resultMain.innerHTML = `
      <span>${value} ${from}</span> yra
      <span>${resultValue} ${to}</span>
    `;
    resultRate.textContent = `Santykis: 1 ${from} = ${rate} ${to}`;

    result.classList.remove("hidden");
    resetBtn.classList.remove("hidden");

    spinner.classList.remove("spin");
    spinner.classList.add("hidden");
    btnText.classList.remove("hidden");
  }, 1500);
});

// removes error
amountInput.addEventListener("input", () => {
  if (amountInput.value > 0) {
    amountInput.classList.remove("input-error");
  }
});

// resets whole form
resetBtn.addEventListener("click", () => {
  form.reset();
  result.classList.add("hidden");
  resetBtn.classList.add("hidden");
  spinner.classList.add("hidden");
  spinner.classList.remove("spin");
  btnText.classList.remove("hidden");
  amountInput.classList.remove("input-error");
  convertBtn.disabled = false;
});
