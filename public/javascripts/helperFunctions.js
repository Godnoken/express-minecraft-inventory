function removeContainerChildren(container) {
  for (let i = 0, length = container.children.length; i < length; i++) {
    container.children[0].remove();
  }
}




const getUnique = (array, key) => {
  const flag = {};
  const unique = [];
  array.forEach((element) => {
    if (!flag[element[key]._id]) {
      flag[element[key]._id] = true;
      unique.push(element[key]);
    }
  });

  return unique;
};




function createButton(text) {
  const button = document.createElement("button");

  button.classList.add("button");

  button.textContent = text;

  return button;
}


function createInput(typeOfInput, name = null) {
  const input = document.createElement("input");

  input.setAttribute("type", typeOfInput);
  if (name !== null) input.setAttribute("name", name);

  input.classList.add("crud-text-color");

  return input;
}