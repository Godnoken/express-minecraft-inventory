function createItemInstanceDetails(itemInstance) {
    const innerContainer = document.querySelector(".crud-inner-container");
    const toolTipContainer = document.querySelector(".tool-tip-container");
    const titleParagrah = document.querySelector(".crud-title");
  
    removeContainerChildren(innerContainer);
    if (toolTipContainer) toolTipContainer.remove();
  
    const item = itemList.find((item) => item._id === itemInstance.item);
  
    const buttonContainer = document.createElement("div");
    const updateButton = createButton("Update");
    const deleteButton = createButton("Delete");
    const updateContainer = document.createElement("div");
    const itemSelect = document.createElement("select");
    const acquiredInput = createInput("date", null);
    const craftedInput = createInput("radio", "crafted");
    const boughtInput = createInput("radio", "crafted");
    const craftedLabel = document.createElement("label");
    const boughtLabel = document.createElement("label");
    const acquiredLabel = document.createElement("label");
  
    acquiredInput.max = new Date().toISOString().substring(0, 10);
  
    craftedLabel.textContent = "Crafted";
    boughtLabel.textContent = "Bought";
    acquiredLabel.textContent = "Acquired";
  
    innerContainer.classList.add("item-instance-list");
    updateContainer.classList.add("crud-update-container");
    itemSelect.classList.add("crud-update-select");
    craftedLabel.classList.add("radio-label");
    boughtLabel.classList.add("radio-label");
    buttonContainer.classList.add("crud-buttons-container");
  
    titleParagrah.textContent = "ItemInstance";
  
    if (itemInstance.crafted) craftedInput.checked = true;
    else boughtInput.checked = true;
  
    acquiredInput.value = itemInstance.acquired.substr(0, 10);
  
    const defaultItemOption = document.createElement("option");
    defaultItemOption.hidden = true;
    defaultItemOption.selected = true;
    defaultItemOption.textContent = item.name;
    defaultItemOption.value = itemInstance.item;
  
    for (let i = 0; i < itemList.length; i++) {
      const itemOption = document.createElement("option");
  
      itemOption.value = itemList[i]._id;
      itemOption.textContent = itemList[i].name;
  
      itemSelect.appendChild(itemOption);
    }
  
    updateButton.addEventListener("click", () => {
      updateItemInstance({
        itemInstance,
        itemSelect,
        acquiredInput,
        craftedInput,
      });
      hideCrud();
    });

    deleteButton.addEventListener("click", () => createDeleteConfirmation(itemInstance));
  
    innerContainer.appendChild(updateContainer);
    updateContainer.appendChild(itemSelect);
    updateContainer.appendChild(acquiredLabel);
    updateContainer.appendChild(craftedLabel);
    updateContainer.appendChild(boughtLabel);
    acquiredLabel.appendChild(acquiredInput);
    craftedLabel.appendChild(craftedInput);
    boughtLabel.appendChild(boughtInput);
    itemSelect.appendChild(defaultItemOption);
    innerContainer.appendChild(buttonContainer);
    buttonContainer.appendChild(updateButton);
    buttonContainer.appendChild(deleteButton);
  }



  
  function updateItemInstance(data) {
    fetch("inventory/iteminstance/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: data.itemInstance._id,
        item: data.itemSelect.value,
        acquired: data.acquiredInput.value !== "" ? data.acquiredInput.value : Date.now(),
        crafted: data.craftedInput.checked ? true : false,
      }),
    })
      .then(() => updateItemInstanceOnClient(data))
      .catch((error) => console.log(error));
  }


  function updateItemInstanceOnClient(data) {
    data.itemInstance.item = data.itemSelect.value;
    data.itemInstance.acquired = data.acquiredInput.value;
    data.itemInstance.crafted = data.craftedInput.checked ? true : false;
  }




  function deleteItemInstance(itemInstanceId) {
    fetch("inventory/iteminstance/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: itemInstanceId,
      }),
    })
      .then(() => deleteItemInstanceOnClient(itemInstanceId))
      .catch((error) => console.log(error));
  }


  function deleteItemInstanceOnClient(itemInstanceId) {
    let itemInstanceElements = document.querySelectorAll(".item-instance");
  
    itemInstanceElements.forEach((itemInstance, index) => {
      if (itemInstance.dataset.id === itemInstanceId) {
        itemInstancesList.splice(index, 1);
        itemInstance.remove();
        
        // Update indexes of all item instance DOM elements
        // that exist after current deleted item's index
        itemInstanceElements = document.querySelectorAll(".item-instance");

        for (let j = index; j < itemInstanceElements.length; j++) {
          itemInstanceElements[j].dataset.index = j;
        }
      }
    });
  }




  function addItemInstance(itemInstance) {
    const personalInventory = document.querySelector(".personal-inventory");

    const square = document.createElement("div");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    square.classList.add("item-instance", "square", "pointer");
    svg.classList.add("item-svg");

    svg.setAttribute("viewBox", "0 -0.5 32 32");
    path.setAttribute("d", "M11 1h8M9 2h12M8 3h14M8 4h15M7 5h6m4 0h7M7 6h5m6 0h6M7 7h4m8 0h5M7 8h4m8 0h5m-6 1h6m-7 1h6m-7 1h6m-7 1h6m-7 1h6m-6 1h5m-5 1h5m-5 1h4m-4 1h4m-4 1h4m-4 1h4m-4 1h4m-4 1h4m-4 1h4m-4 1h4m-4 4h4m-4 1h4m-4 1h4m-4 1h4");

    square.dataset.id = itemInstance._id;
    square.dataset.index = itemInstancesList.length;

    itemInstancesList.push(itemInstance);

    personalInventory.appendChild(square);
    square.appendChild(svg);
    svg.appendChild(path);
}