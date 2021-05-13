const itemWrapper = document.querySelector(".item-wrapper");

// create new article with the user inserted item and display it on the page
function createAndAppendNewListItem() {
  let newAddedItem = document.querySelector(".input-item").value;

  const itemTemplate = `
  <article class="item">
  <div class="item-textfield">${newAddedItem}</div>
  <div class="button-wrapper">
    <button class="edit item-button">
      <i class="far fa-edit"></i>
    </button>
    <button class="check item-button">
      <i class="far fa-check-square"></i>
    </button>
    <button class="delete item-button">
      <i class="far fa-trash-alt"></i>
  </button>
  </div>
  </article>`;

  itemWrapper.insertAdjacentHTML("afterbegin", itemTemplate);

  // Assign edit functionality to newly created items
  editItemsWrapper();
}

let addButton = document.querySelector("#input-button");

// trigger function on click
addButton.addEventListener("click", createAndAppendNewListItem);

let inputField = document.querySelector(".input-item");

const onEnter = (event) => {
  if (event.key === "Enter") {
    createAndAppendNewListItem();
  }
};
// trigger function on enter
inputField.addEventListener("keydown", onEnter);

// Edit function
// Steps involved:
// 1. onclick: grab the correct item from the array
//  1.1 focus element and enable editing (contentEditable=true)
//  1.2 when element loses focus, update array with new info

// get all list items
let listItems = document.querySelectorAll(".item");

// function for making item textfields editable on click
function clickEdit() {
  this.parentElement.previousElementSibling.contentEditable = "true";
  this.parentElement.previousElementSibling.focus();
}

// function for saving changes: make textfield not editable and update array
function leaveEdit() {
  this.contentEditable = "false";

  // Write local storage
  writeLocalStorage();
}

function editItemsWrapper() {
  // get textfields to be edited
  let itemsTextfield = document.querySelectorAll(".item-textfield");

  // get edit buttons
  let editButtons = document.querySelectorAll(".edit");

  //add event listener and tasks
  editButtons.forEach((button) => button.addEventListener("click", clickEdit));
  itemsTextfield.forEach((button) =>
    button.addEventListener("blur", leaveEdit)
  );
}

editItemsWrapper();

// remove closest article to the button clicked
function deleteClick() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.closest("article").remove();
    });
  });
}

deleteClick();

// ********************** Alin - the Check Button

// function checkButton() {
const checkButtons = document.querySelectorAll(".check");

const changeBackground = (event) => {
  const itemTextfield = event.currentTarget.closest("article").children[0];
  itemTextfield.classList.toggle("checked-item");
};

checkButtons.forEach((button) =>
  button.addEventListener("click", changeBackground)
);
// }

// **** New Comment

// 2. Added a newer Comment

// ************************** end of Alin

//////////////////////////////
// Local storage
//////////////////////////////

// functionality: store session information, restore to do list after browser refresh
// main function 1: write local storage on each userinput (add,check,delete)
// main function 2: load localStorage on each browser refresh

// Main function 1: write local storage on userInput

function writeLocalStorage() {
  // clear localStorage to avoid conflicts with existing items
  localStorage.clear();

  // grab all list items
  const items = document.querySelectorAll(".item");

  // write each list item's HTML to localStorage
  items.forEach((item, index) => {
    localStorage.setItem(`item${index}`, `${item.outerHTML}`);
  });
}

function loadLocalStorage() {
  // grab container for list items
  const itemWrapper = document.querySelector(".item-wrapper");

  // reset inner HTML of container
  itemWrapper.innerHTML = "";

  // populate container with list items from localStorage
  for (let item = 0; item < localStorage.length; item++) {
    const key = localStorage.key(item);
    const itemHTML = localStorage.getItem(key);
    itemWrapper.insertAdjacentHTML("beforeend", itemHTML);
  }
  editItemsWrapper();
  deleteClick();
}

// reset local storage
const resetStorageButton = document.querySelector(".reset-local-storage");
resetStorageButton.addEventListener("click", () => {
  localStorage.clear();
});

loadLocalStorage();
window.addEventListener("beforeunload", writeLocalStorage);
