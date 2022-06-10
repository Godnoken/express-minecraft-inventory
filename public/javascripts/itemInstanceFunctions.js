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