const searchBtn = document.getElementById('search-btn');
const displayResults = document.querySelector('.search-results');
const searchContainer = document.querySelector('.search-container');

// Api Calling function Here for all phone items
const apiCall = (searchText) => {
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   fetch(url).then(res => res.json()).then(data => {
      return displaySearchResults(data.data);
   })
}

// Phone searching function
const searchPhone = () => {
   const searchField = document.getElementById('search-field');
   const searchInputValue = searchField.value;

   if (searchInputValue == "") {
      document.querySelector('.search-err').innerText = "Write Somthing...";
   } else {
      apiCall(searchInputValue);
   }
}

// Displaying search phone results function
const displaySearchResults = (items) => {

   if (items.length > 0) {
      document.querySelector('.search-err').innerText = "";

      const mapItems = items.map(item => {
         return `
               <div class="col-lg-4 col-sm-12">
                  <div class="card m-3 search-card d-flex align-items-center justify-content-center p-2 shadow-lg">
                  <img src="${item.image}" class="card-img-top" alt="...">
                     <div class="card-body text-center">
                        <h5 class="card-title">${item.phone_name}</h5>
                        <h6 class="fs-6"><span>Brand : </span>${item.brand}</h6>
                        <button onclick="displayDetailsAction('${item.slug}')" class="btn btn-primary btn-sm">Details</button>
                     </div>
                  </div>   
               </div>
               `;
      });

      displayResults.innerHTML = mapItems.join("");
   } else {
      displayResults.innerHTML = "";
      document.querySelector('.search-err').innerText = "No results found.";
   }
}

// Displaying Phone details action trigger
const displayDetailsAction = (id) => {
   const detailsUrl = `https://openapi.programming-hero.com/api/phone/${id}`;
   fetch(detailsUrl).then(response => response.json()).then(responseData => {
      return displayPhoneDetails(responseData.data);
   })
}

// Displaying Phone details
const displayPhoneDetails = (data) => {

   document.getElementById('item-details').innerHTML = `
            <div class="col-lg-4 col-sm-12 py-3">
               <div class="item-details-img w-75 h-100 d-flex align-items-center justify-content-center mx-auto">
                  <img src="${data.image}" alt="product-image" class="w-100">
               </div>
            </div>
            <div class="col-lg-8 col-sm-12 py-3">
            
               <ul class="list-group p-4">
               <h3 class="fw-bold fs-4">Full Specification :</h3>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                     <span class="badge bg-primary rounded-pill me-3">Name : </span>
                     ${data.name}
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                     <span class="badge bg-primary rounded-pill me-3">Brand : </span>
                     ${data.brand}
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                     <div class="w-100">
                     <h6 class="text-center py-2">Features</h6>
                        <ul class="list-group">      
                           <li class="list-group-item d-flex justify-content-between align-items-center">
                              <span class="badge bg-primary rounded-pill me-3">Chipset : </span>
                              ${data.mainFeatures.chipSet}  
                           </li>
                           <li class="list-group-item d-flex justify-content-between align-items-center">
                              <span class="badge bg-primary rounded-pill me-3">Display Size : </span>
                              ${data.mainFeatures.displaySize}  
                           </li>
                           <li class="list-group-item d-flex justify-content-between align-items-center">
                              <span class="badge bg-primary rounded-pill me-3">Memory : </span>
                              ${data.mainFeatures.memory}  
                           </li>
                           <li class="list-group-item d-flex justify-content-between align-items-center">
                              <span class="badge bg-primary rounded-pill me-3">Storage : </span>
                              ${data.mainFeatures.storage}  
                           </li>
                           <li class="list-group-item d-flex justify-content-between align-items-center text-break">
                              <span class="badge bg-primary rounded-pill me-3">Sensor : </span>
                              ${data.mainFeatures.sensors}  
                           </li>   
                        </ul>
                     </div>
                  </li>

                  <li class="list-group-item d-flex justify-content-between align-items-center text-break">
                     <div class="w-100">
                        <h6 class="text-center py-2">Others</h6>
                        <ul class="list-group"> 
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                           <span class="badge bg-primary rounded-pill me-3">Bluetooth : </span>
                           ${data.others ? data.others.Bluetooth : "Not available"}  
                        </li>     
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                           <span class="badge bg-primary rounded-pill me-3">GPS : </span>
                           ${data.others ? data.others.GPS : "Not available"}  
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                           <span class="badge bg-primary rounded-pill me-3">NFC : </span>
                           ${data.others ? data.others.NFC : "Not available"}  
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                           <span class="badge bg-primary rounded-pill me-3">Radio : </span>
                           ${data.others ? data.others.Radio : "Not available"}  
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                           <span class="badge bg-primary rounded-pill me-3">USB : </span>
                           ${data.others ? data.others.USB : "Not available"}  
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center text-break">
                           <span class="badge bg-primary rounded-pill me-3">WLAN : </span>
                           ${data.others ? data.others.WLAN : "Not available"}  
                        </li>   
                     </ul> 
                     </div>
                  </li>

                  <li class="list-group-item d-flex justify-content-between align-items-center">
                     <span class="badge bg-primary rounded-pill me-3">Release Date : </span>
                     ${data.releaseDate ? data.releaseDate : "No release date found"}
                  </li>

               </ul>
            </div>
  `;
}

// Phone Search Trigger
searchBtn.addEventListener('click', () => {
   searchPhone();
   document.getElementById('item-details').innerHTML = "";
});