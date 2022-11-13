const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const addTransactionPanel = document.querySelector(".add-transaction-panel");

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");

const addTransactionBtn = document.querySelector(".add-transaction");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const deleteBtn = document.querySelector(".delete");
const deleteAllBtn = document.querySelector(".delete-all");

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const showPanel = () => {
  addTransactionPanel.style.display = "flex";
};

const closePanel = () => {
  addTransactionPanel.style.display = "none";
  clearInputs();
};

const checkForm = () => {
  if (
    nameInput.value !== "" &&
    amountInput.value !== "" &&
    categorySelect.value !== "none"
  ) {
    createNewTransaction();
  } else {
    alert("Wypełnij wszystkie pola!");
  }
};

const createNewTransaction = () => {
  const newTransaction = document.createElement("div");
  newTransaction.classList.add("transaction");
  newTransaction.setAttribute("id", ID);

  checkCategory(selectedCategory);

  newTransaction.innerHTML = `
        <p class="transaction-name">
            ${categoryIcon} ${nameInput.value}
        </p>
        <p class="transaction-amount">${amountInput.value}
            <button class="delete" onclick="deleteTransaction(${ID}zł)>< class="fas fa-times"></</button>
        </p>
    `;

  amountInput.value > 0
    ? incomeSection.appendChild(newTransaction) &&
      newTransaction.classList.add("income")
    : expensesSection.appendChild(newTransaction) &&
      newTransaction.classList.add("expenses");

  moneyArr.push(+amountInput.value);
  countMoney(moneyArr);
  closePanel();
  ID++;
  clearInputs();
};

const checkCategory = (transaction) => {
  switch (transaction) {
    case "[ + ] Przychód":
      categoryIcon = `<i class="fas fa-money-bill-wave"></i>`;
      break;
    case "[ - ] Zakupy":
      categoryIcon = `<i class="fas fa-cart-arrow-down"></i>`;
      break;
    case "[ - ] Jedzenie":
      categoryIcon = `<i class="fas fa-hamburger"></i>`;
      break;
    case "[ - ] Kino":
      categoryIcon = `<i class="fas fa-film"></i>`;
      break;
  }
};

const selectCategory = () => {
  selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

const clearInputs = () => {
  nameInput.value = "";
  amountInput.value = "";
  categorySelect.selectedIndex = 0;
};

const countMoney = (money) => {
  const newMoney = money.reduce((a, b) => a + b);
  availableMoney.textContent = `${newMoney}zł`;
};

addTransactionBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", closePanel);
saveBtn.addEventListener("click", checkForm);
