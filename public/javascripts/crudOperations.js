function hideCrud() {
    const crudContainer = document.querySelector(".crud-container");

    crudContainer.style.visibility = "hidden";
}

function showCrud(event) {

    if (itemInstancesList[event.target.dataset.index] && event.target.classList.contains("square") || event.target.classList.contains("shared-square")) {
        const crudContainer = document.querySelector(".crud-container");
        const crudItem = document.querySelector(".crud-item");
        const crudButtons = document.querySelector(".crud-buttons");
        const crudUpdateContainer = document.querySelector(".crud-update-container");
  
        if (crudUpdateContainer) crudUpdateContainer.remove();
    
        const item = itemList.find(item => item._id === itemInstancesList[event.target.dataset.index].item);
  
        crudItem.dataset.index = event.target.dataset.index;
        crudItem.dataset.id = event.target.dataset.id;
        crudItem.dataset.itemId = item._id;
        crudItem.dataset.name = item.name;
  
        crudItem.textContent = item.name;
    
        crudContainer.style.visibility = "visible";
        crudButtons.style.display = "flex";
    }
  }

function showItemInstanceUpdate() {
    const crudContainer = document.querySelector(".crud-container");
    const crudButtons = document.querySelector(".crud-buttons");
    const crudItem = document.querySelector(".crud-item");

    crudButtons.style.display = "none";
    
    const crudUpdateContainer = document.createElement("div");
    const crudItemSelect = document.createElement("select");
    const crudAcquired = document.createElement("input");
    const crudCrafted = document.createElement("input");
    const crudBought = document.createElement("input");
    const crudCraftedLabel = document.createElement("label");
    const crudBoughtLabel = document.createElement("label");
    const crudSubmit = document.createElement("button");

    crudAcquired.max = new Date().toISOString().substring(0,10);
    crudAcquired.setAttribute("type", "date");
    crudCrafted.setAttribute("type", "radio");
    crudBought.setAttribute("type", "radio");
    crudCrafted.setAttribute("name", "crafted");
    crudBought.setAttribute("name", "crafted");

    crudCraftedLabel.textContent = "Crafted";
    crudBoughtLabel.textContent = "Bought";
    crudSubmit.textContent = "Confirm";

    crudUpdateContainer.classList.add("crud-update-container");
    crudItemSelect.classList.add("crud-update-select");
    crudAcquired.classList.add("crud-update-acquired");
    crudCraftedLabel.classList.add("crud-update-crafted");
    crudBoughtLabel.classList.add("crud-update-bought");
    crudSubmit.classList.add("crud-button");

    if (itemInstancesList[crudItem.dataset.index].crafted) crudCrafted.checked = true;
    else crudBought.checked = true;

    crudAcquired.value = itemInstancesList[crudItem.dataset.index].acquired.substr(0, 10);

    const defaultOption = document.createElement("option");
    defaultOption.hidden = true;
    defaultOption.selected = true;
    defaultOption.textContent = crudItem.dataset.name;
    defaultOption.value = crudItem.dataset.itemId;
    
    for (let i = 0; i < itemList.length; i++) {
        const option = document.createElement("option");
        
        option.value = itemList[i]._id;
        option.textContent = itemList[i].name;
        
        crudItemSelect.appendChild(option);
    }
    
    crudSubmit.addEventListener("click", (event) => {
        updateItemInstance(event, crudItem.dataset.id, crudItemSelect, crudAcquired, crudCrafted, crudItem);
        crudContainer.style.visibility = "hidden";
    });
    
    crudContainer.appendChild(crudUpdateContainer);
    crudUpdateContainer.appendChild(crudItemSelect);
    crudUpdateContainer.appendChild(crudAcquired);
    crudUpdateContainer.appendChild(crudCraftedLabel);
    crudUpdateContainer.appendChild(crudBoughtLabel);
    crudUpdateContainer.appendChild(crudSubmit);
    crudCraftedLabel.appendChild(crudCrafted);
    crudBoughtLabel.appendChild(crudBought);
    crudItemSelect.appendChild(defaultOption);
}


function updateItemInstance(event, crudItemInstanceId, crudItemSelect, crudAcquired, crudCrafted, crudItem) {
    fetch("inventory/iteminstance/update", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: crudItemInstanceId,
            item: crudItemSelect.value,
            acquired: crudAcquired.value,
            crafted: crudCrafted.checked ? true : false
         })
      })
      .then(() => updateItemInstanceOnClient(crudItemSelect, crudAcquired, crudCrafted, crudItem))
      .catch((error) => console.log(error))
}

function updateItemInstanceOnClient(crudItemSelect, crudAcquired, crudCrafted, crudItem) {
    const itemInstance = itemInstancesList[crudItem.dataset.index];

    itemInstance.item = crudItemSelect.value;
    itemInstance.acquired = crudAcquired.value;
    itemInstance.crafted = crudCrafted.checked ? true : false;
}