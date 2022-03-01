const searchBtn = document.getElementById('search-btn');

const apiCall = (searchText) => {
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   fetch(url).then(res => res.json()).then(data => {
      //return data.data;
      return displaySearchResults(data.data);
   })
}

const displaySearchResults = (items) => {
   const displayResults = document.querySelector('.search-results');
   const dataValue = items.map((phone) => {
      return `
      <div class="col-lg-4 col-sm-12">
         <div class="card">
         <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 class="card-title">${phone.phone_name}</h5>
               <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
               <button id="item-details" class="btn btn-primary">Details</button>
            </div>
         </div>
      </div>
      `;
   });

   displayResults.innerHTML = dataValue.join("");
}

searchBtn.addEventListener('click', () => {
   const searchField = document.getElementById('search-field');
   const searchInputValue = searchField.value;
   apiCall(searchInputValue);
})



