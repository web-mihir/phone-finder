const searchBtn = document.getElementById('search-btn');


const apiCall = (searchText) => {
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   fetch(url).then(res => res.json()).then(data => {

      return displaySearchResults(data.data);

   })
}


const searchPhone = () => {
   const searchField = document.getElementById('search-field');
   const searchInputValue = searchField.value;

   if (searchInputValue == "") {
      document.querySelector('.search-err').innerHTML = "Write Somthing...";
   } else {
      apiCall(searchInputValue);
   }
}


const displaySearchResults = (items) => {
   const displayResults = document.querySelector('.search-results');

   if (items.length < 0) {
      document.querySelector('.search-err').innerHTML = "not Somthing...";
   } else {
      const dataValue = items.map((item) => {

         return `
            <div class="col-lg-4 col-sm-12">
               <div class="card">
               <img src="${item.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                     <h5 class="card-title">${item.phone_name}</h5>
                     <button id="item-details" class="btn btn-primary">Details</button>
                  </div>
               </div>
            </div>
            `;
      });

      displayResults.innerHTML = dataValue.join("");
   }
}

searchBtn.addEventListener('click', () => {
   searchPhone();
})



