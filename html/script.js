console.log("Welcome to script.js");

// Example 1
document.getElementById('changeTextButton').addEventListener('click', function() {
    let paragraph = document.getElementById('myParagraph');
    // console.log(paragraph.textContent);
    paragraph.textContent = 'The paragraph is changed';
});

// Example 2
document.getElementById('highlightFirstCity').addEventListener('click', function () {
    let citiesList = document.getElementById('citiesList');
    // console.log(citiesList.firstElementChild);
    citiesList.firstElementChild.classList.add('highlight');
    // citiesList.style.fontStyle = "italic";
});

// Example 3
document.getElementById('changeOrderToEspresso').addEventListener('click', function () {
    let coffeeType = document.getElementById('coffeeType');
    coffeeType.textContent = 'Espresso';
    coffeeType.style.fontStyle = "italic";
    coffeeType.style.color = "brown";
});

// Example 4
document.getElementById('addItemToList').addEventListener('click', function() {
    let newTask = document.createElement('li');
    newTask.textContent = 'Cereals';
    let shoppingList = document.getElementById('shoppingList');
    shoppingList.appendChild(newTask);
});

// Example 5
document.getElementById('removeLastTask').addEventListener('click', function () {
    let tasks = document.getElementById('taskList');
    tasks.lastElementChild.remove();
});

// Example 6
document.getElementById('clickMe').addEventListener('click', function () {
    alert('You Clicked!');
});

// Example 7
document.getElementById('teaList').addEventListener('click', function (event) {
    // console.log(event);
    if (event.target && event.target.matches('#teaItem')) {
        alert(`You selected: ${event.target.textContent}`);
    }
});

// Example 8
document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let feedback = document.getElementById('feedbackInput').value;
    // console.log(feedback);
    document.getElementById('feedbackDisplay').textContent = `Feedback is ${feedback}`;
});

// Example 9
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('domStatus').textContent = 'DOM Fully Loaded...';
});

// Example 10
document.getElementById('toggleHighlight').addEventListener('click', function () {
    let description = document.getElementById('descriptionText');
    description.classList.toggle('highlight');
});

// Example 11
let promiseCount = 0;

function testPromise() {
  const thisPromiseCount = ++promiseCount;
  const log = document.getElementById("log");

  // begin
  log.insertAdjacentHTML("beforeend", `${thisPromiseCount}) Started<br>`);
  // We make a new promise: we promise a numeric count of this promise,
  // starting from 1 (after waiting 3s)
  const p1 = new Promise((resolve, reject) => {
    // The executor function is called with the ability
    // to resolve or reject the promise
    log.insertAdjacentHTML(
      "beforeend",
      `${thisPromiseCount}) Promise constructor<br>`,
    );
    // This is only an example to create asynchronism
    const timeout = Math.random() * 2000 + 1000;
    setTimeout(
      () => {
        // We fulfill the promise
        console.log(`promise fulfilled... after ${timeout}sec`)
        resolve(thisPromiseCount);
      },
      timeout,
    );
  });

  // We define what to do when the promise is resolved with the then() call,
  // and what to do when the promise is rejected with the catch() call
  p1.then((val) => {
    // Log the fulfillment value
    log.insertAdjacentHTML("beforeend", `${val}) Promise fulfilled<br>`);
  }).catch((reason) => {
    // Log the rejection reason
    console.log(`Handle rejected promise (${reason}) here.`);
  });
  // end
  log.insertAdjacentHTML("beforeend", `${thisPromiseCount}) Promise made<br>`);
}

let btn = document.getElementById('make-promise');
btn.addEventListener('click', testPromise);


// 1. Change color of car and addToCart button color when a color is selected
// - Selecting Elements
const redColor = document.querySelector(".red");
const grayColor = document.getElementsByClassName("gray");
const blackColor = document.querySelector(".black");
const cartButton = document.getElementById("button");
const itemTag = document.getElementsByTagName("h3")[0];
const imageCard = document.querySelector(".product-image");
const feedbackBtn = document.querySelector(".feedback");

// Modifying Elements
// - Add Event Listeners
// - Red Color
redColor.addEventListener("click", function () {
  cartButton.style.backgroundColor = "red";
  itemTag.style.backgroundColor = "red";
  imageCard.style.backgroundImage = 'url("./img/red-benz.webp")';
});

// - Gray Color
grayColor[0].addEventListener("click", function () {
  cartButton.style.backgroundColor = "gray";
  itemTag.style.backgroundColor = "gray";
  imageCard.style.backgroundImage = 'url("./img/gray-benz.jpg")';
});

// - Black Color
blackColor.addEventListener("click", function () {
  cartButton.style.backgroundColor = "black";
  itemTag.style.backgroundColor = "black";
  imageCard.style.backgroundImage = 'url("./img/black-benz.jpg")';
});

// Button Click Implementation
// - Cart Button
const cart = () => {
  cartButton.style.display = "none";
  feedbackBtn.style.display = "block";
};
cartButton.addEventListener("click", cart);

// - Feedback Button
const feedback = () => {
  cartButton.style.display = "block";
  feedbackBtn.style.display = "none";
};
feedbackBtn.addEventListener("click", feedback);
