const billInput = document.querySelector("#bill");
const tipButtons = document.querySelectorAll(".filter_btn");
const noPeoInput = document.querySelector("#People");
const tipAmount = document.querySelector(".tip_amount .para_num");
const totAmount = document.querySelector(".tip_amount ~ .tip_amount .para_num");
const resetButton = document.querySelector(".reset");
const errorMsg = document.querySelector(".error-message");
const customInput = document.querySelector("#custom_input");

let billAmount = 0;
let tipPercentage = 0;
let numberOfPeople = 1;

billInput.addEventListener("input", handleBillInput);

tipButtons.forEach((button) => {
  button.addEventListener("click", handleTipSelect);
});

noPeoInput.addEventListener("input", handlePeopleInput);

resetButton.addEventListener("click", handleReset);

customInput.addEventListener("input", customButton);

function handleBillInput(e) {
  let value = parseFloat(e.target.value);
  console.log(billAmount);
  if (isNaN(value) || value <= 0) {
    billAmount = 0;
  } else {
    billAmount = value;
    tipCalculation();
  }
}

function handleTipSelect(e) {
  buttonText = e.target.textContent;
  clearActiveButtons();
  changefocus = e.target.classList.toggle("active");
  let value = parseFloat(buttonText);
  console.log(tipPercentage);
  if (isNaN(value) || value <= 0) {
    tipPercentage = 0;
  } else {
    tipPercentage = value;
  }
  tipCalculation();
}

function clearActiveButtons() {
  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });
}

function handlePeopleInput(e) {
  let value = parseFloat(e.target.value);
  if (value === 0) {
    noPeoInput.classList.add("error");
    errorMsg.style.display = "block";
  } else {
    noPeoInput.classList.remove("error");
    errorMsg.style.display = "none";
    console.log(value);
    if (isNaN(value) || value <= 0) {
      numberOfPeople = 0;
    } else {
      numberOfPeople = value;
      tipCalculation();
    }
  }
}

function tipCalculation() {
  if (billAmount <= 0 || tipPercentage <= 0 || numberOfPeople <= 0) {
    tipAmount.textContent = "$0.00";
    totAmount.textContent = "$0.00";
    return;
  }
  let tipAmtForOnePerson = (billAmount * tipPercentage) / 100 / numberOfPeople;
  let totPerPerson =
    (billAmount + (billAmount * tipPercentage) / 100) / numberOfPeople;
  tipAmount.textContent = `$${tipAmtForOnePerson.toFixed(2)}`;
  totAmount.textContent = `$${totPerPerson.toFixed(2)}`;
}

function customButton(e) {
  clearActiveButtons();
  let value = parseFloat(e.target.value);

  if (isNaN(value) || value <= 0) {
    tipPercentage = 0;
  } else {
    tipPercentage = value;
  }

  tipCalculation();
}

function handleReset() {
  billAmount = 0;
  tipPercentage = 0;
  numberOfPeople = 1;
  billInput.value = "";
  noPeoInput.value = "";
  tipAmount.textContent = `$0.00`;
  totAmount.textContent = `$0.00`;
  clearActiveButtons();
  customInput.value = "";
  noPeoInput.classList.remove("error");
  errorMsg.style.display = "none";
}
