document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let total = calculateTotal();

    renderExpenses();

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if (name !== '' && !isNaN(amount) && amount > 0.0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount,
            };

            expenses.push(newExpense);

            saveExpensesToLocal();
            renderExpenses();
            updateTotal();

            // clear the input
            expenseAmountInput.value = '';
            expenseNameInput.value = '';
        }
    });

    function calculateTotal() {
        return expenses.reduce((acc, expense) => (acc + expense.amount), 0);
    }

    function saveExpensesToLocal() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function updateTotal() {
        total = calculateTotal();
        totalAmount.textContent = total.toFixed(2);
    }

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${expense.name} - $${expense.amount}</span>
                <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    expenseList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const expenseId = parseInt(event.target.getAttribute('data-id'));
            expenses = expenses.filter((expense) => expense.id !== expenseId);

            saveExpensesToLocal();
            renderExpenses();
            updateTotal();
        }
    });
});