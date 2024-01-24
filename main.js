

// let dataFolder = '/mnt/c/Users/robin/doodle-app/backend/data';
// let productsFolder = 'products';
// let productsFile = 'products.json';

// let fullPath = `${dataFolder}/${productsFolder}/${productsFile}`;

// let postData = {
//   name: 'Sample Event',
//   dates: [
//     { date: '2024-02-01', available: true },
//     { date: '2024-02-15', available: false },
//     // Add more dates as needed
//   ],
// };

/*
fetch('http://localhost:3000/api/events/',{
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Data successfully posted:', data);
    console.log("test");
  })
  .catch(error => {
    console.error('Error posting data:', error);
  });
  

  let postData = {
    name: 'New Event',
    dates: ['2024-03-01', '2024-03-15'],
    author: 'John Doe',
    description: 'A new event description',
  };
  
  fetch('http://localhost:3000/api/events/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data successfully posted:', data);
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });



    let name = document.querySelector(".form__titre");
    let description = document.querySelector(".form__description");
    let date = document.querySelector(".form__date");
    let button = document.querySelector(".form__submitt");
    
    button.addEventListener("click", add_data);
    
    function add_data() {
      console.log(description.value);
    }



  let Data_API= {
    name: 'New Event',
    dates: ['2024-03-01', '2024-03-15'],
    author: 'John Doe',
    description: 'A new event description',
  };


  document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector(".content__form__todo");
    let titre = document.querySelector(".form__titre");
    let description = document.querySelector(".form__description");
    let date = document.querySelector("#form__date");
    let dateArray = []; // Array to store multiple date values
  
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
  
        console.log("Titre:", titre.value);
        console.log("Description:", description.value);
        
        // Push each date value into the array
        dateArray.push(date.value);
  
        console.log("Dates:", dateArray);
  
        // You can add additional logic here, e.g., sending data to the server
      });
    } else {
      console.error("Form with class 'content__form__todo' not found.");
    }
  });
 
  */

  document.addEventListener("DOMContentLoaded", () => {
    let head = {
      "Content-Type": "application/json",
    };
  
    let all_data = [];
    let form = document.querySelector(".content__form__todo");
    let titre = document.querySelector(".form__titre");
    let description = document.querySelector(".form__description");
    let date = document.querySelector("#form__date");
    let dateArray = [];
  
    if (form) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
  
        try {
          let response = await fetch("http://localhost:3000/api/events/", {
            method: "POST",
            headers: head,
            body: JSON.stringify({
              name: titre.value,
              dates: dateArray,
              author: "John Doe",
              description: description.value,
            }),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          let postData = await response.json();
          //---fonction noé data-----
          function createEvent(postData) {
            const eventContainer = document.querySelector(".eventContainer");
          
            const eventDiv = document.createElement('div');
            eventDiv.className = `event event__${postData.id}`;
          
            const eventName = document.createElement('h2');
            eventName.className = 'event1__name';
            eventName.textContent = postData.name;
          
            const eventDescription = document.createElement('p');
            eventDescription.className = 'event1__description';
            eventDescription.textContent = postData.description;
          
            const tableContainer = document.createElement('div');
            tableContainer.className = 'table-container';
          
            const table = document.createElement('table');
            table.className = 'steelBlueCols';
            table.id = postData.id;
          
            const thead = document.createElement('thead');
            const theadRow = document.createElement('tr');
          
            // Ajoutez ici la logique pour générer les en-têtes en fonction des dates
            const columnHeaderDates = getDatesBetween(startDate, endDate);
            columnHeaderDates.forEach(date => {
              const thDate = document.createElement("th");
              thDate.textContent = formatDate(date);
              theadRow.appendChild(thDate);
            });
          
            thead.appendChild(theadRow);
          
            const tbody = document.createElement('tbody');
          
            table.appendChild(thead);
            table.appendChild(tbody);
            tableContainer.appendChild(table);
            eventDiv.appendChild(eventName);
            eventDiv.appendChild(eventDescription);
            eventDiv.appendChild(tableContainer);
          
            eventContainer.appendChild(eventDiv);
          }
          
        
//----fin fonction noé data--------        
          console.log("Data successfully posted:", postData);
          createEvent(postData);

          dateArray.push(date.value);
          console.log("Dates:", dateArray);
  
          response = await fetch("http://localhost:3000/api/events/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          let data = await response.json();
         console.log("List" ,data)
          all_data = data;
        } catch (error) {
          console.error("An error occurred:", error);
        }
      });
    }
  });
  
  async function delete_occurrence(data) {
    try {
      for (let element of data) {
        console.log(element.id);
        const deleteResponse = await fetch(
          `http://localhost:3000/api/events/${element.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!deleteResponse.ok) {
          throw new Error(`HTTP error! Status: ${deleteResponse.status}`);
        }
  
        const deleteData = await deleteResponse.json();
        console.log("Data successfully deleted:", deleteData);
      }
  
      console.log(all_data);
    } catch (deleteError) {
      console.error("Error deleting data:", deleteError);
    }
  }
  
//---------------------CODE NOE-------WAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH---------------

import { displayForm } from "./assets/form.js";
import { hideForm } from "./assets/form.js";
import { toggleDeleteButtonVisibility } from "./assets/deleteButton.js";
import { addRow } from "./assets/checkUser.js";

let username;

const createButton = document.getElementById("addEventButton");
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


toggleDeleteButtonVisibility();

 
});

eventSelect.addEventListener('change', function() {
  document.querySelectorAll('.event').forEach(function(eventDiv) {
    eventDiv.style.display = 'none';
  });

  const selectedEvent = this.value;
  if (selectedEvent) {
    if (username) { 
      addRow(username);
    }
    
    const eventDivToShow = document.querySelector(`.event.event${selectedEvent}`);
    if (eventDivToShow) {
      eventDivToShow.style.display = 'flex'; 
    }
  }
});


function formatDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('fr-FR', options);
}

function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1); 
  }

  return dates;
}

const startDate = new Date('2024-01-27'); 
const endDate = new Date('2024-02-10');   

const datesBetween = getDatesBetween(startDate, endDate);
const formattedDates = datesBetween.map(date => formatDate(date));
console.log(formattedDates)