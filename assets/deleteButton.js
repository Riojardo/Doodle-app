const eventSelect = document.getElementById('event-select');
const deleteButton = document.getElementById('delete');

export function toggleDeleteButtonVisibility() {
  if (eventSelect.value === "") {
    deleteButton.style.display = "none"; 
  } else {
    deleteButton.style.display = "block"; 
  }
}

// export function deleteEvent {

// }
