var url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
var urlId = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='; //search by id
const mealdetails = document.getElementById('details-list-container');
const mealdetailsImage = document.getElementById(
  'details-list-container-image'
);

const mealdetailsHeading = document.getElementById(
  'details-list-container-heading'
);
var input = document.getElementById('inputText');
const mealList = document.getElementById('list-Items-container');
const mealListFavorites = document.getElementById(
  'list-Items-container-favorites'
);
// .getElementById('get-details')
//get everything first
//now the functions
function handleRemoveFavorites(e) {
  e.preventDefault();
  console.log('clicked');

  console.log(e.target.value);
}
function handleGetDetailsOrAddToFavorites(e) {
  e.preventDefault();
  console.log('clicked');
  if (e.target.value === 'details') {
    let mealItem = e.target.parentElement.parentElement;

    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        mealRecipeModal(data.meals);
      });
  } else if (e.target.value == 'favour') {
    let mealItem = e.target.parentElement.parentElement;
    console.log(mealItem);

    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        window.localStorage.setItem(
          mealItem.dataset.id,
          JSON.stringify(data.meals)
        );
      });
  }

  console.log(Object.entries(localStorage));
}

function mealRecipeModal(meal) {
  console.log(meal[0], 'meal0');
  const destination = meal[0].strSource;
  console.log(destination, 'destination');
  window.open(`${meal[0].strSource}`);
}

function handleSubmitForm(e) {
  e.preventDefault();

  let input = document.querySelector('input');
  console.log(input);
  findFood(url + input.value);
  input.value = '';
}
function renderFavorites() {
  const urlArray = [];
  console.log(Object.entries(localStorage));
  for (var i = 0; i < localStorage.length; i++) {
    console.log(Object.entries(localStorage)[i][0]);
    urlArray.push(Object.entries(localStorage)[i][0]);
  }
  console.log(urlArray);
  if (urlArray.length == 0) {
    let text = '';
    text = `<p>No Items in the favorite</p>`;

    mealListFavorites.innerHTML = text;
  } else {
    urlArray.forEach((id) => findFoodFavorite(urlId + id));
  }
}
function findFood(address) {
  fetch(address)
    .then(function (res) {
      //console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);

      let html = '';
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `<div class="food-card" data-id="${meal.idMeal}">
          <div class="food-card-image">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" >
              </div>
              <div class="food-card-info">
                  <h3>${meal.strMeal}</h3>
                  </div>
                  <div class="food-card-features">
                  <button id="favorites" value="favour">Add</button>
                  <button id="get-details" value="details" >Details</button>
                  </div>
              </div>`;
        });
      }
      console.log(html);
      mealList.innerHTML = html;
    });
}

var html1 = '';
function findFoodFavorite(address) {
  if (address != undefined) {
    fetch(address)
      .then(function (res) {
        //console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);

        if (data.meals) {
          data.meals.forEach((meal) => {
            html1 += `<div class="food-card" data-id="${meal.idMeal}">
          <div class="food-card-image">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" >
              </div>
              <div class="food-card-info">
                  <h3>${meal.strMeal}</h3>
                  </div>
                  <div class="food-card-features">
                  <button class="favorites" value="defavour" onClick="checkId(this)" >Remove</button>
                  <button id="get-details" value="details" onClick="getFoodDetails(this)" >Details</button>
                  </div>
              </div>`;
          });
        }
        console.log(html1);

        mealListFavorites.innerHTML = html1;
      });
  }
}
function checkId(elem) {
  console.log(elem.parentElement.parentElement.getAttribute('data-id'));
  let mealItem = elem.parentElement.parentElement;
  fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
  ).then((data) => {
    window.localStorage.removeItem(
      mealItem.dataset.id,
      JSON.stringify(data.meals)
    );
  });
  mealItem.remove();
}
function getFoodDetails(elem) {
  console.log(elem.parentElement.parentElement.getAttribute('data-id'));
  let foodId = elem.parentElement.parentElement.getAttribute('data-id');
  localStorage.setItem('foodkey', foodId);
  window.open('details.html');
}
window.onload = function () {
  document.querySelector('form').addEventListener('submit', handleSubmitForm);
  mealList.addEventListener('click', handleGetDetailsOrAddToFavorites);
  mealListFavorites.addEventListener('click', handleRemoveFavorites);
};

renderFavorites();
