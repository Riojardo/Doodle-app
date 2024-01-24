export function createEvent(eventData) {
    const h1Element = document.querySelector(".event1__name");
    const h2Element = document.querySelector(".event1__description");

    if (data.length > 0) {
      h1Element.textContent = data[0].name;
      h2Element.textContent = data[0].description; 
    } else {
      console.log("Aucune donnée d'événement disponible.");
    }

    const eventContainer = document.querySelector(".eventContainer")
    
    const eventDiv = document.createElement('div');
    eventDiv.className = `event event__${data[0].id}`;
  

    const eventName = document.createElement('h2');
    eventName.className = 'event1__name';
    eventName.textContent = eventData.name;
  
   
    const eventDescription = document.createElement('p');
    eventDescription.className = 'event1__description';
    eventDescription.textContent = data[0].description;
  
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
  
    
    const table = document.createElement('table');
    table.className = 'steelBlueCols';
    table.id = eventData.id;
  
   
    const thead = document.createElement('thead');
    const theadRow = document.createElement('tr');
    theadRow.innerHTML = `
      <th></th>
      <th>date 1</th>
      <th>date 2</th>
      <th>date 3</th>
    `;
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
  


