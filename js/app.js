const displayResults = document.querySelector('.search-results');
const searchContainer = document.querySelector('.search-container');

// Phone Search Trigger
document.getElementById('search-btn').addEventListener('click', () => {
   searchProduct();
   document.getElementById('item-details').innerHTML = "";
});

// Api Calling function Here for all phone items
const initApi = (searchText) => {
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   fetch(url).then(res => res.json()).then(responseData => {
      displaySearchProduct(responseData.data);
   })
}

// Phone searching function
const searchProduct = () => {
   const searchField = document.getElementById('search-field');
   const searchInputValue = searchField.value;

   if (searchInputValue == "") {
      document.querySelector('.search-err').innerText = "Write Somthing...";
   } else {
      initApi(searchInputValue);
   }
}

// Displaying search phone results function
const displaySearchProduct = (product) => {

   if (product.length > 0) {
      document.querySelector('.search-err').innerText = "";

      const maxProduct = product.slice(0, 20);

      const mapItems = maxProduct.map(item => {
         const { image, phone_name, brand, slug } = item;
         return `
               <div class="col-lg-4 col-sm-12">
                  <div class="card m-3 search-card d-flex align-items-center justify-content-center p-2 shadow-lg">
                  <img src="${image}" class="card-img-top pt-3" alt="...">
                     <div class="card-body text-center">
                        <h5 class="card-title">${phone_name}</h5>
                        <h6 class="fs-6"><span>Brand : </span>${brand}</h6>
                        <button onclick="productDetailsApiInit('${slug}')" class="btn btn-primary btn-sm">Details</button>
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

// Displaying Product details action trigger
const productDetailsApiInit = (id) => {
   const detailsUrl = `https://openapi.programming-hero.com/api/phone/${id}`;
   fetch(detailsUrl).then(response => response.json()).then(responseData => {
      return displayProductDetails(responseData.data);
   })
}

// Displaying Phone details
const displayProductDetails = (data) => {

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

