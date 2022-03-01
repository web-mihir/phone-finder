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
      document.querySelector('.search-err').innerText = "Write Somthing...";
   } else {
      apiCall(searchInputValue);
   }
}


const displaySearchResults = (items) => {
   let displayResults = document.querySelector('.search-results');
   if (items.length > 0) {
      displayResults.innerHTML = "";
      items.forEach(item => {
         console.log(item);
         displayResults.innerHTML += `
            <div class="col-lg-4 col-sm-12">
               <div class="card">
               <img src="${item.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                     <h5 class="card-title">${item.phone_name}</h5>
                     <button id="item-details" onclick="displayDetails(${item.slug})" class="btn btn-primary">Details</button>
                  </div>
               </div>   
            </div>
         `;
      });

      document.querySelector('.search-err').innerText = "";
   } else {
      displayResults.innerHTML = "";
      document.querySelector('.search-err').innerText = "No results found.";
   }
}

searchBtn.addEventListener('click', () => {
   searchPhone();
})





      // const dataValue = items.map((item) => {

      //    return `
      //       <div class="col-lg-4 col-sm-12">
      //          <div class="card">
      //          <img src="${item.image}" class="card-img-top" alt="...">
      //             <div class="card-body">
      //                <h5 class="card-title">${item.phone_name}</h5>
      //                <button id="item-details" class="btn btn-primary">Details</button>
      //             </div>
      //          </div>
      //       </div>
      //       `;
      // });

      // displayResults.innerHTML = dataValue.join("");