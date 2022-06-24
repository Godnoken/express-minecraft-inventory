function createInventorDetails(inventor) {
    const innerContainer = document.querySelector(".crud-inner-container");
    const toolTipContainer = document.querySelector(".tool-tip-container");
    const titleParagrah = document.querySelector(".crud-title");
  
    removeContainerChildren(innerContainer);
    if (toolTipContainer) toolTipContainer.remove();
  
  
    const buttonContainer = document.createElement("div");
    const updateButton = createButton("Update");
    const deleteButton = createButton("Delete");
    const addButton = createButton("Add");
    const updateContainer = document.createElement("div");
    const nameInput = createInput("text", null);
    const birthInput = createInput("date", null);
    const deathInput = createInput("date", null);
    const countryInput = createInput("text", null);
    const nameInputContainer = document.createElement("div");
    const nameLabel = document.createElement("label");
    const birthLabel = document.createElement("label");
    const deathLabel = document.createElement("label");
    const countryInputContainer = document.createElement("div");
    const countryLabel = document.createElement("label");
  
    nameLabel.textContent = "Name";
    birthLabel.textContent = "Birth";
    deathLabel.textContent = "Death";
    countryLabel.textContent = "Country";
    
    updateContainer.classList.add("crud-update-container");
    buttonContainer.classList.add("crud-buttons-container");
    nameInput.classList.add("text-input");
    nameInputContainer.classList.add("text-input-container");
    birthLabel.classList.add("crud-text-color");
    deathLabel.classList.add("crud-text-color");
    countryInput.classList.add("text-input");
    countryInputContainer.classList.add("text-input-container");
    
    titleParagrah.textContent = "Inventor";
    
    if (inventor !== null) {

      nameInput.value = inventor.name;
      if (inventor.country) countryInput.value = inventor.country;
      if (inventor.birth) birthInput.value = inventor.birth.substr(0, 10);
      if (inventor.death) deathInput.value = inventor.death.substr(0, 10);
      deathInput.max = new Date().toISOString().substring(0, 10);
    
      updateButton.addEventListener("click", () => {
        updateInventor({
          inventor,
          nameInput,
          birthInput,
          deathInput,
          countryInput
        });

        hideCrud();
      });
  
      deleteButton.addEventListener("click", () => createDeleteConfirmation(inventor));

      buttonContainer.appendChild(updateButton);
      buttonContainer.appendChild(deleteButton);
    }
    else {
      buttonContainer.appendChild(addButton);

      addButton.addEventListener("click", () => {
        addInventor({
          nameInput,
          birthInput,
          deathInput,
          countryInput
        });

        hideCrud();
      })
    }

    innerContainer.appendChild(updateContainer);
    updateContainer.appendChild(nameLabel);
    updateContainer.appendChild(birthLabel);
    updateContainer.appendChild(deathLabel);
    updateContainer.appendChild(countryLabel);
    nameLabel.appendChild(nameInputContainer);
    nameInputContainer.appendChild(nameInput);
    birthLabel.appendChild(birthInput);
    deathLabel.appendChild(deathInput);
    countryLabel.appendChild(countryInputContainer);
    countryInputContainer.appendChild(countryInput);
    innerContainer.appendChild(buttonContainer);
  }




  function updateInventor(data) {
    fetch("inventory/inventor/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: data.inventor._id,
        name: data.nameInput.value,
        birth: data.birthInput.value,
        death: data.deathInput.value,
        country: data.countryInput.value
      }),
    })
      .then(() => updateInventorOnClient(data))
      .catch((error) => console.log(error));
  }


  function updateInventorOnClient(data) {
    data.inventor.name = data.nameInput.value;
    data.inventor.birth = data.birthInput.value;
    data.inventor.death = data.deathInput.value;
    data.inventor.country = data.countryInput.value;
  }




  function addInventor(data) {
    fetch("inventory/inventor/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.nameInput.value,
        birth: data.birthInput.value,
        death: data.deathInput.value,
        country: data.countryInput.value
      }),
    })
      .then((response) => response.json())
      .then((jsonData) =>  addInventorOnClient(jsonData))
      .catch((error) => console.log(error));
  }


  function addInventorOnClient(data) {
    inventorsList.push(data.inventor);
  }