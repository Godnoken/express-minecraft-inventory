function goBack() {
  const crudUpdateContainer = document.querySelector(".crud-update-container");
  const crudDeleteContainer = document.querySelector(".crud-delete-container");
  const buttonContainer = document.querySelector(".crud-buttons-container");

  if (crudUpdateContainer) {
    crudUpdateContainer.remove();
    buttonContainer.style.display = "flex";
  } else if (crudDeleteContainer) {
    crudDeleteContainer.remove();
    buttonContainer.style.display = "flex";
  }

  handleGoBackVisibility("hidden");
}


function handleGoBackVisibility(choice) {
  const crudGoBack = document.querySelector(".crud-go-back");

  crudGoBack.style.visibility = choice;
}




function hideCrud() {
  const backgroundContainer = document.querySelector(".crud-background-container");
  const crudContainer = document.querySelector(".crud-container");

  
  backgroundContainer.classList.remove("crud-background-transition-in");
  backgroundContainer.classList.add("crud-background-transition-out");
  crudContainer.classList.remove("crud-container-transition-in");
  crudContainer.classList.add("crud-container-transition-out");
  
  setTimeout(() => {
    handleGoBackVisibility("hidden");
    backgroundContainer.style.visibility = "hidden";
  }, 500);
}


function showCrud() {
  const backgroundContainer = document.querySelector(".crud-background-container");
  const crudContainer = document.querySelector(".crud-container");
  const innerContainerDiv = document.querySelector(".crud-inner-container");
  const title = document.querySelector(".crud-title");

  removeContainerChildren(innerContainerDiv);
  handleGoBackVisibility("hidden");

  backgroundContainer.style.visibility = "visible";
  backgroundContainer.classList.remove("crud-background-transition-out");
  backgroundContainer.classList.add("crud-background-transition-in");
  crudContainer.classList.remove("crud-container-transition-out");
  crudContainer.classList.add("crud-container-transition-in");

  title.textContent = "CRUD";
}





function createCrudChoices() {
  const innerContainer = document.querySelector(".crud-inner-container");

  const inventorsButton = createButton("Inventors");
  const itemsButton = createButton("Items");
  const itemInstancesButton = createButton("ItemInstances");

  inventorsButton.addEventListener("click", () => createList("Inventor"));
  itemsButton.addEventListener("click", () => createList("Item"));
  itemInstancesButton.addEventListener("click", () =>
    createList("ItemInstance")
  );

  innerContainer.appendChild(inventorsButton);
  innerContainer.appendChild(itemsButton);
  innerContainer.appendChild(itemInstancesButton);
}




function createList(element) {
  const innerContainerDiv = document.querySelector(".crud-inner-container");
  const listDiv = document.createElement("div");
  const createNewButton = createButton(`New ${element}`);

  removeContainerChildren(innerContainerDiv);
  handleGoBackVisibility("visible");

  let list;

  if (element === "Item") {
    list = itemList;
    listDiv.addEventListener("click", (event) =>
      createItemDetails(list[event.target.dataset.index])
    );
    createNewButton.addEventListener("click", () => {
      createItemDetails(null);
    });
  } else if (element === "Inventor") {
    list = inventorsList;
    listDiv.addEventListener("click", (event) =>
      createInventorDetails(list[event.target.dataset.index])
    );
    createNewButton.addEventListener("click", () => {
      createInventorDetails(null);
    });
  } else {
    list = itemInstancesList;
    listDiv.addEventListener("click", (event) =>
      createItemInstanceDetails(list[event.target.dataset.index])
    );
    createNewButton.addEventListener("click", () => {
      createItemInstanceDetails(null);
    });
  }

  for (let i = 0; i < list.length; i++) {
    const name = document.createElement("p");

    list[i].name
      ? (name.textContent = list[i].name)
      : (name.textContent = list[i]._id);

    name.classList.add("text-hover", "pointer");

    name.dataset.index = i;

    listDiv.appendChild(name);
  }

  listDiv.classList.add("crud-list");

  innerContainerDiv.appendChild(listDiv);
  innerContainerDiv.appendChild(createNewButton);
}




function createDeleteConfirmation(elementData) {
  const innerContainer = document.querySelector(".crud-inner-container");

  handleGoBackVisibility("visible");
  removeContainerChildren(innerContainer);

  const deleteContainer = document.createElement("div");
  const deleteQuestionP = document.createElement("p");
  const deleteConfirmButton = createButton("Confirm");

  deleteQuestionP.textContent = `Are you sure you want to delete ID: ${elementData._id} ?`;

  deleteContainer.classList.add("crud-delete-container");

  deleteConfirmButton.addEventListener("click", () => {
    deleteItemInstance(elementData._id);
    hideCrud();
  });

  innerContainer.appendChild(deleteContainer);
  deleteContainer.appendChild(deleteQuestionP);
  deleteContainer.appendChild(deleteConfirmButton);
}