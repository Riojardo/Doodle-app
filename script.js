
import { displayForm } from "./assets/form.js";
import { hideForm } from "./assets/form.js";
import { toggleDeleteButtonVisibility } from "./assets/deleteButton.js";
import { addRow } from "./assets/checkUser.js";

let username;

let createButton = document.getElementById("addEventButton");
let eventSelect = document.getElementById("event-select");

document.addEventListener("DOMContentLoaded", (event) => {
  function enterName() {
    let validName = false;
    while (!validName) {
      event.preventDefault();
      username = prompt("Please enter your name:");
      if (username === null || username === "") {
        alert("Please enter a valid name");
      } else {
        let phraseElement = document.getElementById("phrase");
        phraseElement.innerHTML = `<i>"${username}, organises des évènements professionels ou avec tes proches quand tu le souhaites"</i>`;
        validName = true;
      }
    }
  }
  enterName();

  createButton.addEventListener("click", () => {
    if (createButton.innerHTML === "create +") {
      displayForm();
    } else {
      hideForm();
    }
  });

  eventSelect.addEventListener("change", function () {
    document.querySelectorAll(".event").forEach(function (eventDiv) {
      eventDiv.style.display = "none";
    });

    let selectedEvent = this.value;
    if (selectedEvent) {
      let eventDivToShow = document.querySelector(
        `.event.event${selectedEvent}`
      );
      if (eventDivToShow) {
        eventDivToShow.style.display = "flex";
      }
    }
  });
  eventSelect.addEventListener("change", toggleDeleteButtonVisibility);

  toggleDeleteButtonVisibility();
});

eventSelect.addEventListener("change", function () {
  document.querySelectorAll(".event").forEach(function (eventDiv) {
    eventDiv.style.display = "none";
  });

  let selectedEvent = this.value;
  if (selectedEvent) {
    if (username) {
      addRow(username);
    }

    let eventDivToShow = document.querySelector(`.event.event${selectedEvent}`);
    if (eventDivToShow) {
      eventDivToShow.style.display = "flex";
    }
  }
});

function formatDate(date) {
  let options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("fr-FR", options);
}

function getDatesBetween(startDate, endDate) {
  let dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

let startDate = new Date("2024-01-27");
let endDate = new Date("2024-02-10");

let datesBetween = getDatesBetween(startDate, endDate);
let formattedDates = datesBetween.map((date) => formatDate(date));
console.log(formattedDates);
function complete_event_list(data) {
  let menu = document.getElementById("event-select");
  data.forEach((element) => {
    let option = document.createElement("option");
    option.text = "Event " + menu.options.length + " - " + element.name;
    let options_number = menu.options.length;
    option.value = options_number.toString();
    option.id = element.id;
    menu.appendChild(option);
  });
}

fetch("http://localhost:3000/api/events/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Data successfully posted:", data);
    console.log("test");
    complete_event_list(data);
  })
  .catch((error) => {
    console.error("Error posting data:", error);
  });

document.addEventListener("DOMContentLoaded", () => {
  let head = {
    "Content-Type": "application/json",
  };
  let all_data = [];
  let form = document.querySelector(".content__form__todo");
  let titre = document.querySelector(".form__titre");
  let description = document.querySelector(".form__description");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        let date_begin = new Date(document.querySelector("#form__date").value);
        let date_end = new Date(
          document.querySelector("#form__date__end").value
        );
        console.log("Ddfdfdfdf", date_begin);
        console.log("Ddfdfdfdf", date_end);
        let dateArray = [];

        while (date_begin <= date_end) {
          dateArray.push(new Date(date_begin));
          date_begin.setDate(date_begin.getDate() + 1);
        }

        console.log("Dates:", dateArray);
        let response = await fetch("http://localhost:3000/api/events/", {
          method: "POST",
          headers: head,
          body: JSON.stringify({
            name: titre.value,
            dates: dateArray,
            author: username,
            description: description.value,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let posted_Data = await response.json();
        console.log("Data successfully posted:", posted_Data);

        //---fonction noé data-----
        console.log(posted_Data.id, "letsgooooo");
        function createEvent(posted_Data) {
          let eventContainer = document.querySelector(".eventContainer");

          let eventDiv = document.createElement("div");
          eventDiv.className = `${posted_Data.id}`;

          let eventName = document.createElement("h2");
          eventName.className = "event1__name";
          eventName.textContent = posted_Data.name;

          let eventDescription = document.createElement("p");
          eventDescription.className = "event1__description";
          eventDescription.textContent = posted_Data.description;

          let tableContainer = document.createElement("div");
          tableContainer.className = "table-container";

          let table = document.createElement("table");
          table.className = "event1";
          table.id = posted_Data.id;

          let thead = document.createElement("thead");
          let theadRow = document.createElement("tr");
          let tbody = document.createElement("tbody");
          let td_check = document.createElement("td");
          td_check.classList.add("td_" + username);
          td_check.textContent = username;

          let columnHeaderDates = getDatesBetween(startDate, endDate);

          columnHeaderDates.forEach((date) => {
            let thDate = document.createElement("th");
            thDate.textContent = formatDate(date);
            theadRow.appendChild(thDate);
            let tdInput = document.createElement("td");
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add(formatDate(date));
            tdInput.appendChild(checkbox);
            tbody.appendChild(tdInput);
          });

          thead.appendChild(theadRow);

          table.appendChild(thead);
          table.appendChild(tbody);
          tableContainer.appendChild(table);
          eventDiv.appendChild(eventName);
          eventDiv.appendChild(eventDescription);
          eventDiv.appendChild(tableContainer);
          eventContainer.appendChild(eventDiv);
        }
        //----fin fonction noé data--------

        let menu = document.getElementById("event-select");
        let option = document.createElement("option");
        option.text = "Event " + menu.options.length + " - " + posted_Data.name;
        let options_number = menu.options.length;
        option.value = options_number.toString();
        option.id = posted_Data.id;
        menu.appendChild(option);

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
        document
          .getElementById("event-select")
          .addEventListener("input", function (event) {
            console.log("Selected fruit:", event.target.value);
            console.log(data, "bip bbioo  bip");
          });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });
  }

  async function delete_occurrence(data) {
    try {
      for (let element of data) {
        console.log(element.id);
        let delete_Response = await fetch(
          `http://localhost:3000/api/events/${element.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!delete_Response.ok) {
          throw new Error(`HTTP error! Status: ${delete_Response.status}`);
        }
        let deleteData = await delete_Response.json();
        console.log("Data successfully deleted:", deleteData);
      }
      console.log(all_data);
    } catch (deleteError) {
      console.error("Error deleting data:", deleteError);
    }
  }

  function createEvent(data) {
    let eventContainer = document.querySelector(".eventContainer");
    eventContainer.innerHTML = "";

    let eventDiv = document.createElement("div");
    eventDiv.className = `${data.id}`;

    let eventName = document.createElement("h2");
    eventName.className = "event1__name";
    eventName.textContent = data.name + " (by : " + data.author + ")";

    let eventDescription = document.createElement("p");
    eventDescription.className = "event1__description";
    eventDescription.textContent = data.description;

    let tableContainer = document.createElement("div");
    tableContainer.className = "table-container";

    let table = document.createElement("table");
    table.className = "event1";
    table.id = data.id;

    let thead = document.createElement("thead");
    let theadRow = document.createElement("tr");
    thead.style.border = "1px solid black";
    let th_empty = document.createElement("th");
    th_empty.innerHTML = "<u>USERNAME</u>";
    let tbody = document.createElement("tbody");
    let td_check = document.createElement("td");
    td_check.classList.add("td_" + username);
    td_check.textContent = username;

    async function attendees_td() {
      let childElement = document.querySelector("h2");
      let parentElement = childElement.parentNode;
      let parentClass = parentElement.classList.value;
      console.log(`http://localhost:3000/api/events/${parentClass}`);

      try {
        let response = await fetch(
          `http://localhost:3000/api/events/${parentClass}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        data = await response.json();
      } catch (error) {
        console.error("Error in the main try block:", error);
      }
    }
    let name_attendees = new Set();
    let map_row = new Map();

    data.dates.forEach((ele) => {
      if (ele.attendees) {
        ele.attendees.forEach((attendee) => {
          let tr_attendees;
          if (!name_attendees.has(attendee.name)) {
            tr_attendees = document.createElement("tr");
            tr_attendees.textContent = attendee.name;
            tbody.appendChild(tr_attendees);
            name_attendees.add(attendee.name);
            map_row.set(attendee.name, tr_attendees);
          } else {
            tr_attendees = map_row.get(attendee.name);
          }
          let td_dispo = document.createElement("td");
          td_dispo.textContent = attendee.available ? "yep" : " ";
          tr_attendees.appendChild(td_dispo);
        });
      }
    });

    attendees_td();

    theadRow.appendChild(th_empty);
    tbody.appendChild(td_check);

    let startDate = new Date(data.dates[0].date);
    let endDate = new Date(data.dates[data.dates.length - 1].date);

    let columnHeaderDates = getDatesBetween(startDate, endDate);

    columnHeaderDates.forEach((date) => {
      let thDate = document.createElement("th");
      thDate.textContent = formatDate(date);
      theadRow.appendChild(thDate);
      let tdInput = document.createElement("td");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add(formatDate(date));
      tdInput.appendChild(checkbox);
      tbody.appendChild(tdInput);
    });

    thead.appendChild(theadRow);

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    eventDiv.appendChild(eventName);
    eventDiv.appendChild(eventDescription);
    eventDiv.appendChild(tableContainer);
    eventContainer.appendChild(eventDiv);
  }

  let THE_BUTTON = document.getElementById("delete");
  THE_BUTTON.addEventListener("click", delete_event);

  async function delete_event() {
    let childElement = document.querySelector("h2");

    if (childElement) {
      let parentElement = childElement.parentNode;
      let parentClass = parentElement.classList.value;
      console.log("Parent Class:", parentClass);
      let THE_EVENT = document.querySelector(`[class="${parentClass}"]`);

      if (THE_EVENT) {
        let confirm_delete = confirm(
          "Are you sure you want to delete this event?"
        );
        if (confirm_delete) {
          try {
            THE_EVENT.remove();
            let option_delete = document.querySelector(`[id="${parentClass}"]`);

            if (option_delete) {
              option_delete.remove();
            }
            await fetch(`http://localhost:3000/api/events/${parentClass}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log("Event deleted successfully.");
          } catch (deleteError) {
            console.error("Error deleting event:", deleteError);
          }
        } else {
          alert("tch...pussy...");
        }
      } else {
        alert("No event found with the specified class");
      }
    } else {
      alert("No child element found");
    }
  }

  document
    .getElementById("event-select")
    .addEventListener("input", function (event) {
      let option_Id = event.target.options[event.target.selectedIndex].id;

      fetch(`http://localhost:3000/api/events/${option_Id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data successfully retrieved:", data);
          createEvent(data);
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });
    });

  let eventContainer = document.querySelector(".eventContainer");

  eventContainer.addEventListener("change", function (event) {
    if (event.target.type === "checkbox") {
      add_attendees(event, event.target.classList.value);
    }
  });

  function transformDateFormat(inputDate) {
    let parts = inputDate.split("/");
    let dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    let formattedDate = dateObject.toISOString().split("T")[0];
    return formattedDate;
  }

  async function add_attendees(event, date_cible) {
    let childElement = document.querySelector("h2");
    if (childElement) {
      let adapted_date = transformDateFormat(date_cible);
      let parentElement = childElement.parentNode;
      let parentClass = parentElement.classList.value;
      console.log(`http://localhost:3000/api/events/${parentClass}`);

      try {
        let response = await fetch(
          `http://localhost:3000/api/events/${parentClass}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log(data);
        console.log(username);
        console.log(date_cible);

        let index = data.dates.findIndex(
          (dateItem) => dateItem.date === adapted_date
        );
        console.log(index);
        console.log(`http://localhost:3000/api/events/${parentClass}/attend`);
        let attendees_modified = {
          dates: data.dates.map((dateItem, i) => {
            if (i === index) {
              return {
                date: adapted_date,
                available: true,
              };
            }
            return {
              date: dateItem.date,
              available: dateItem.available || false,
            };
          }),
          name: username,
        };

        try {
          let postResponse = await fetch(
            `http://localhost:3000/api/events/${parentClass}/attend`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(attendees_modified),
            }
          );
          if (!postResponse.ok) {
            throw new Error(`HTTP error! Status: ${postResponse.status}`);
          }
          let postedData = await postResponse.json();
          console.log("Data successfully posted:", postedData);
        } catch (error) {
          console.error("Error posting data:", error);
        }
      } catch (error) {
        console.error("Error in the main try block:", error);
      }
    }
  }
});

//---------------------CODE NOE-------WAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH---------------
