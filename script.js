document.getElementById('expense-form').addEventListener('submit', addExpense);

// initial array of expenses, reading from localStorage
const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense(e){
    e.preventDefault();

    // get type, name, date, and amount
     
    let name = document.getElementById('name').value;
    let date = document.getElementById('date').value;
    let amount = document.getElementById('amount').value;
    let category = document.getElementById('category').value;

    if(
        name.length > 0 
        && date != 0 
        && amount > 0){
        const expense = {
             category,
            name, 
            date,
            amount, 
            id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
        }

        expenses.push(expense);
        // localStorage 
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    document.getElementById('expense-form').reset();
    showExpenses();
}
 

function showExpenses() {
  const expenseTable = document.getElementById('expenseTable');
  const filterDate = document.getElementById('filter-date').value;
  const filterCategory = document.getElementById('filter-category').value;

  expenseTable.innerHTML = '';

  let filteredExpenses = expenses.filter((expense) => {
    if (filterDate && expense.date !== filterDate) {
      return false;
    }
    if (filterCategory && expense.category !== filterCategory) {
      return false;
    }
    return true;
  });

  for (let i = 0; i < filteredExpenses.length; i++) {
    expenseTable.innerHTML += `
      <tr>
        <td>${filteredExpenses[i].name}</td>
        <td>${filteredExpenses[i].amount}</td>
        <td>${filteredExpenses[i].date}</td>
        <td>${filteredExpenses[i].category}</td>
        <td><a class="deleteButton" onclick="deleteExpense(${filteredExpenses[i].id})">Delete</td>
      <td><button class="editButton" onclick="editExpense(${filteredExpenses[i].id})">Edit</button></td>
    
      </tr>
    `;
  }
  const editButtons = document.querySelectorAll('.editButton');
editButtons.forEach(button => {
  button.classList.add('adjacentButton');
});
}


const editExpense = (id) => {
  const expense = expenses.find(expense => expense.id == id);

  // fill the form with the expense details
  document.getElementById('name').value = expense.name;
  document.getElementById('date').value = expense.date;
  document.getElementById('amount').value = expense.amount;
  document.getElementById('category').value = expense.category;

  // remove the original expense from the array
  expenses.splice(expenses.indexOf(expense), 1);

  // update the localStorage with the new expenses array
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // update the table
  showExpenses();
}




function filterExpenses() {
  showExpenses();
}

function resetFilters() {
  document.getElementById('filter-date').value = '';
  document.getElementById('filter-category').value = '';
  showExpenses();
}

const deleteExpense = (id) => {
    for(let i = 0; i < expenses.length; i++){
        if(expenses[i].id == id){
            expenses.splice(i, 1);
        }
    }

    // localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    showExpenses();
}

showExpenses();





 







 
