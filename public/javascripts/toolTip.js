function readItemInfo(event, list) {
  const currentToolTipContainer = document.querySelector(".tool-tip-container");
  if (currentToolTipContainer) currentToolTipContainer.remove();
    
  if (event.target.classList.contains("item-instance") || event.target.classList.contains("shared-square")) {
    const toolTipContainer = document.createElement("div");
    const name = document.createElement("h2");
    const description = document.createElement("p");
    const valueContainer = document.createElement("div");
    const value = document.createElement("p");
    const emeraldImg = document.createElement("img");
    const inventor = document.createElement("p");
    const type = document.createElement("p");
    const acquired = document.createElement("p");

    toolTipContainer.classList.add("tool-tip-container");
    name.classList.add("tool-tip-name");
    valueContainer.classList.add("tool-tip-value-container");
    emeraldImg.classList.add("tool-tip-emerald");

    let item;
    let itemInstanceInfo;
    
    if (list === itemList) {
        item = list.find((item) => item._id === event.target.dataset.id);
    } else {
        list.find((itemInstance) => {
            if (itemInstance._id === event.target.dataset.id) {
                itemInstanceInfo = itemInstance;
                item = itemList.find((item) => {
                    if (item._id === itemInstance.item) return item;
                });
            }
        });
    }
    
    
    toolTipContainer.style.left = event.x + 15 + "px";
    toolTipContainer.style.top = event.y + "px";
    
    name.textContent = item.name;
    description.textContent = item.description;
    value.textContent = item.value;
    inventor.textContent = item.inventor.name;
    type.textContent = item.type[0].name;
    if (list === itemInstancesList) {
        let itemAcquired = Math.abs(Math.ceil((new Date(itemInstanceInfo.acquired).getTime() - new Date().getTime()) / (1000 * 3600 * 24)));
        acquired.textContent = `${itemInstanceInfo.crafted ? "Crafted: " : "Bought: "} ${itemAcquired} ${itemAcquired === 1 ? "day ago" : "days ago"}`;
    }


    emeraldImg.srcset = "images/emerald.webp";
    emeraldImg.src = "images/emerald.png";

    toolTipContainer.appendChild(name);
    toolTipContainer.appendChild(description);
    toolTipContainer.appendChild(valueContainer);
    valueContainer.appendChild(value);
    valueContainer.appendChild(emeraldImg);
    toolTipContainer.appendChild(type);
    toolTipContainer.appendChild(inventor);
    toolTipContainer.appendChild(acquired);
    document.querySelector(".main").appendChild(toolTipContainer);

    // If tooltip goes out of bounds, position it back inside the window
    const toolTipRect = toolTipContainer.getBoundingClientRect();
    const outOfBoundsY = toolTipRect.y + (toolTipRect.height * 1.5) > window.innerHeight;
    const outOfBoundsX = toolTipRect.x + (toolTipRect.width * 1.5) > window.innerWidth;

    if (outOfBoundsX || outOfBoundsY) {
        toolTipContainer.style.transform = `translate(${outOfBoundsX ? -toolTipRect.width - 15 : 0}px, ${outOfBoundsY ? -toolTipRect.height : 0}px)`;
    }

  }
}