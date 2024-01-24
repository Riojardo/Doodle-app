const eventSelect = document.getElementById('event-select');
const tableContainer = document.querySelector('.table-container');

export function addRow(username) {
  const table = tableContainer.querySelector('table');
  const newRow = table.insertRow();

  const nameCell = newRow.insertCell();
  nameCell.textContent = username;
  
  
  for (let i = 0; i < 3; i++) {
    const cell = newRow.insertCell();
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    cell.appendChild(checkbox);
  }
}

