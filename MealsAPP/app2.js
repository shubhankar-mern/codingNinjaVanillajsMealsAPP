window.onload = function getdetails() {
  let foodId = localStorage.getItem('foodkey');
  console.log(foodId, 'foodid');
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.meals[0].strMealThumb);
      let html2 = `<p>${data.meals[0].strInstructions}</p>`;
      let html3 = `<img src="${data.meals[0].strMealThumb}">`;
      let html4 = `<p>${data.meals[0].strMeal}</p>`;
      console.log(html3);
      console.log(html2);
      console.log(html4);
      mealdetails.innerHTML = html2;
      mealdetailsHeading.innerHTML = html4;
      mealdetailsImage.innerHTML = html3;
    });
  // localStorage.removeItem('foodkey');
};
