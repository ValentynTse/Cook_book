function app() {
   const form = document.querySelector('form');
   const input = document.querySelector('input');
   const wrapper = document.querySelector('.results-wrapper')
   const renderItem = (itemData) => {
      return `
         <div class="item-wrapper">
         <img src="${itemData.strMealThumb}" />
         <h3>${itemData.strMeal}</h3>
         <p>${itemData.strCategory}</p>
         <p>${itemData.strArea}</p>
         <p>${itemData.strInstructions}</p>
         </div>
         `;
   };

   const showLoading = () => {
      wrapper.innerHTML = '<p>Loading...</p>';
   };
   const hideLoading = () => {
      wrapper.innerHTML = '';
   };
   form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Form submitted');
      console.log(input.value);

      showLoading(); //display loading message

      setTimeout(() => {
         fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + input.value)
            .then((response) => {
               return response.json();
            })
            .then((data) => {
               let content = '';
               for (let meal of data.meals) {
                  content += renderItem(meal);
               }
               console.log(data);
               wrapper.innerHTML = content;
            })
            .catch(err => {
               console.error(err);
               alert('Something went wrong!')
            })            
      }, 2000);
   });
}
app();