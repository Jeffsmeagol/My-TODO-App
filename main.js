const inputCreate = document.getElementById("input-create");
const buttonCreate = document.querySelector("#button-create");
const list = document.querySelector(".items-wrapper");

const inputSearch = document.getElementById("input-search");
const buttonSearch = document.getElementById("button-search");

buttonSearch.addEventListener("click", () => {
  const searchedVal = inputSearch.value;
  if (searchedVal == "") {
    return;
  }
  // const filteredToDoItems = toDoItems.filter((value) => {
  //   function filteredVals() {
  //     if (value.includes(searchedVal)) {
  //       return value;
  //     }
  //   }
  //   return value == filteredVals();
  // });

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  const filteredToDoItems = [];
  toDoItems.forEach((value) => {
    if (value.includes(searchedVal)) {
      filteredToDoItems.push(value);
    }
  });

  function job() {
    if (filteredToDoItems != []) {
      filteredToDoItems.forEach(createTheElements);
    }
  }

  function notJob() {
    if (filteredToDoItems.length == 0) {
      const notFoundElement = document.createElement("h3");
      notFoundElement.innerText = "NOT FOUND";
      list.append(notFoundElement);
    }
  }

  notJob();
  job();
});

const storageKey = "toDoKey";
let toDoItems = JSON.parse(localStorage.getItem(storageKey)) || [];

const deleteToDoItem = (valu) => {
  let newToDoItems = toDoItems.filter((value) => {
    return value != valu;
  });
  toDoItems = newToDoItems;
  localStorage.setItem(storageKey, JSON.stringify(toDoItems));
};

const updateToDoItem = (valu, newValu) => {
  let valuIndex = toDoItems.findIndex((value) => {
    return value == valu;
  });
  toDoItems[valuIndex] = newValu;
  localStorage.setItem(storageKey, JSON.stringify(toDoItems));
};

const createTheElements = (valu) => {
  const contDiv = document.createElement("div");
  contDiv.classList.add("item-cont");
  const listItem = document.createElement("input");
  listItem.classList.add("input--item");
  listItem.type = "text";
  listItem.setAttribute("readonly", "readonly");

  listItem.value = valu;

  const buttonEdit = document.createElement("button");
  buttonEdit.classList.add("button--edit");
  buttonEdit.innerText = "EDIT";
  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("button--delete");
  buttonDelete.innerText = "DEL";

  contDiv.append(listItem);
  list.append(contDiv);
  contDiv.append(buttonEdit);
  contDiv.append(buttonDelete);

  inputCreate.value = "";

  buttonEdit.addEventListener("click", () => {
    if (buttonEdit.innerText.toLowerCase() == "save") {
      let newValu = listItem.value;
      updateToDoItem(valu, newValu);
      buttonEdit.innerText = "EDIT";
      listItem.setAttribute("readonly", "readonly");
      return;
    }
    listItem.removeAttribute("readonly");
    listItem.focus();
    buttonEdit.innerText = "SAVE";
  });

  buttonDelete.addEventListener("click", () => {
    deleteToDoItem(valu);
    contDiv.classList.add("fall");
    contDiv.addEventListener("transitionend", () => {
      contDiv.remove();
    });
  });
};

toDoItems.forEach(createTheElements);

buttonCreate.addEventListener("click", () => {
  const val = inputCreate.value;
  if (val == "") {
    return;
  }

  toDoItems.push(val);
  localStorage.setItem(storageKey, JSON.stringify(toDoItems));

  createTheElements(val);
});
