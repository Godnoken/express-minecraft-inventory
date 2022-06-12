function addItemInstance(itemInstance) {
    const personalInventory = document.querySelector(".personal-inventory");

    const square = document.createElement("div");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    square.classList.add("square", "pointer");
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
    
        crudContainer.style.opacity = 1;
        crudButtons.style.display = "flex";
    }
}