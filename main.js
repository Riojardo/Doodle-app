import { displayForm } from "./assets/form.js";
import { hideForm } from "./assets/form.js";
import { toggleDeleteButtonVisibility } from "./assets/deleteButton.js";
import { addRow } from "./assets/checkUser.js";
let username;

const createButton = document.getElementById("addEventButton");
const form = document.querySelector(".content__form__todo");
const eventSelect = document.getElementById('event-select');

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault()
  username = prompt("Please enter your name:");
  if (username !== null && username !== "") {
    const phraseElement = document.getElementById("phrase");
    phraseElement.innerHTML = `<i>"${username}, organises des évènements professionels ou avec tes proches quand tu le souhaites"</i>`;
  };

  createButton.addEventListener("click", () => {
    if (createButton.innerHTML === "create +") {
     displayForm();
    } else {
       hideForm();
    }
 });
 
 eventSelect.addEventListener('change', function() {
 
   document.querySelectorAll('.event').forEach(function(eventDiv) {
     eventDiv.style.display = 'none';
   });
 
   const selectedEvent = this.value;
   if (selectedEvent) {
     const eventDivToShow = document.querySelector(`.event.event${selectedEvent}`);
     if (eventDivToShow) {
       eventDivToShow.style.display = 'flex'; 
     }
   }
 });
 eventSelect.addEventListener('change', toggleDeleteButtonVisibility);

// Appelez la fonction une fois au chargement de la page pour définir l'état initial
toggleDeleteButtonVisibility();

 
});

eventSelect.addEventListener('change', function() {
  document.querySelectorAll('.event').forEach(function(eventDiv) {
    eventDiv.style.display = 'none';
  });

  const selectedEvent = this.value;
  if (selectedEvent) {
    if (username) { // Utilisez le nom d'utilisateur stocké
      addRow(username);
    }
    
    const eventDivToShow = document.querySelector(`.event.event${selectedEvent}`);
    if (eventDivToShow) {
      eventDivToShow.style.display = 'flex'; 
    }
  }
});

