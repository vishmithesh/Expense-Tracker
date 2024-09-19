// Initialize variables
let totalAmount = 0;
let expenseData = [];
let chart;

// Get DOM elements
const form = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const expenseList = document.getElementById('expense-list');
const ctx = document.getElementById('expenseChart').getContext('2d');

// Function to update total amount
function updateTotalAmount() {
  totalAmountDisplay.textContent = totalAmount.toFixed(2);
}

// Function to update the expense list
function updateExpenseList(name, amount) {
  const li = document.createElement('li');
  li.textContent = `${name}: $${amount.toFixed(2)}`;
  expenseList.appendChild(li);
}

// Function to update the pie chart
function updateChart() {
  const labels = expenseData.map(expense => expense.name);
  const data = expenseData.map(expense => expense.amount);

  if (chart) {
    chart.destroy(); // Destroy existing chart before creating a new one
  }

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  });
}

// Function to handle form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const expenseName = expenseNameInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);

  if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
    // Update total amount
    totalAmount += expenseAmount;
    updateTotalAmount();

    // Update expense data
    expenseData.push({ name: expenseName, amount: expenseAmount });

    // Update expense list and chart
    updateExpenseList(expenseName, expenseAmount);
    updateChart();

    // Clear input fields
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
  }
});
