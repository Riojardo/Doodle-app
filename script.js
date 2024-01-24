

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
          console.log("Data successfully posted:", postData);
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
          console.log("waaaaaagh", data);
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

