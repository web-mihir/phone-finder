const searchBtn = document.getElementById('search-btn');
const displayResults = document.querySelector('.search-results');

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

const displayDetailsAction = (id) => {
   const detailsUrl = `https://openapi.programming-hero.com/api/phone/${id}`;
   fetch(detailsUrl).then(response => response.json()).then(responseData => {
      return displayItemDetails(responseData.data);
   })
}

const displayItemDetails = (data) => {

   document.getElementById('item-details').innerHTML = `
            <div class="col-lg-6 col-sm-12">
               <div class="item-details-img w-75">
                  <img src="${data.image}" alt="product-image" class="w-100">
               </div>
            </div>
            <div class="col-lg-6 col-sm-12 p-4">
               <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                     <span class="badge bg-primary rounded-pill">Name : </span>
                     ${data.name}
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                     <span class="badge bg-primary rounded-pill">Brand : </span>
                     ${data.brand}
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                     <div class="w-100">
                     <h6 class="text-center py-2">Features</h6>
                        <ul class="list-group">      
                           <li class="list-group-item d-flex justify-content-between align-items-center">
                              <span class="badge bg-primary rounded-pill">Chipset : </span>
                              ${data.mainFeatures.chipSet}  
                           </li>
                           <li class="list-group-item d-flex justify-content-between align-items-center">
                              <span class="badge bg-primary rounded-pill">Display Size : </span>
                              ${data.mainFeatures.displaySize}  
                           </li>
                           <li class="list-group-item d-flex justify-content-between align-items-center">
                              <span class="badge bg-primary rounded-pill">Memory : </span>
                              ${data.mainFeatures.memory}  
                           </li>
                           <li class="list-group-item d-flex justify-content-between align-items-center">
                              <span class="badge bg-primary rounded-pill">Storage : </span>
                              ${data.mainFeatures.storage}  
                           </li>
                           <li class="list-group-item d-flex justify-content-between align-items-center text-break">
                              <span class="badge bg-primary rounded-pill">Sensor : </span>
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
                           <span class="badge bg-primary rounded-pill">Bluetooth : </span>
                           ${data.others ? data.others.Bluetooth : "Not available"}  
                        </li>     
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                           <span class="badge bg-primary rounded-pill">GPS : </span>
                           ${data.others ? data.others.GPS : "Not available"}  
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                           <span class="badge bg-primary rounded-pill">NFC : </span>
                           ${data.others ? data.others.NFC : "Not available"}  
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                           <span class="badge bg-primary rounded-pill">Radio : </span>
                           ${data.others ? data.others.Radio : "Not available"}  
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                           <span class="badge bg-primary rounded-pill">USB : </span>
                           ${data.others ? data.others.USB : "Not available"}  
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center text-break">
                           <span class="badge bg-primary rounded-pill">WLAN : </span>
                           ${data.others ? data.others.WLAN : "Not available"}  
                        </li>   
                     </ul> 
                     </div>
                  </li>

                  <li class="list-group-item d-flex justify-content-between align-items-center">
                     <span class="badge bg-primary rounded-pill">Release Date : </span>
                     ${data.releaseDate ? data.releaseDate : "No release date found"}
                  </li>

               </ul>
            </div>
  `;
}


const displaySearchResults = (items) => {

   if (items.length > 0) {
      displayResults.innerHTML = "";
      items.forEach(item => {
         displayResults.innerHTML += `
            <div class="col-lg-4 col-sm-12">
               <div class="card">
               <img src="${item.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                     <h5 class="card-title">${item.phone_name}</h5>
                     <button id="item-details" onclick="displayDetailsAction('${item.slug}')" class="btn btn-primary">Details</button>
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

