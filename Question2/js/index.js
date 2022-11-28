let showData=""; 

async function findCafe() {
    
    const search = document.getElementById("text").value;
    showData = document.getElementById("data");

    // if(search.length!=0 && search!== " ")

    let cafes =[]; //variable to store cafes data
    let places = [];  //variable to store data of the cafes

// fetching cafes data and store in cafes
    try {
        const response = await fetch("https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json");
        var data = await response.json();
        cafes=data.cafes;
    } catch (error) {
        console.log(error);
    }

// fetching data of the cafes and store in places
    try {
        const response = await fetch("https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json");
        var data = await response.json();
        places=data.places;
    } catch (error) {
        console.log(error);
    }

// variable to store places id which is searched by the user
    const results = await getId(cafes,search);
    
    // variable to store cafes data with help of place_id
    const cafesData = await getCafesData(places,results);

    // condition to control display data onload/search
   if (search.length<0) {
    printData(cafes,places);
   } else {
    printData(results,cafesData);
   }
}


// function for geting cafes id which searched by the user
function getId(cafes,search){
    showData = document.getElementById("data");
    const results = cafes.filter((ele) =>{
        if( ele.name.toUpperCase().includes(search.toUpperCase())){
            return ele.location_id
        }
    })
    return results;
} 

// function for geting cafes data with help of cafes id
function getCafesData(places,results) {
    const data = places.filter((ele)=>{
        for(let i=0; i<results.length; i++){
            if(ele.id==results[i].location_id){
                return ele;
            }
        }
    })
    return data;
}

// Display the data which is searched by user.
function printData(results,data) {
    showData.innerHTML="";
        for (let i=0; i<data.length;i++) {
            showData.innerHTML+=`<tr>
            <td class="column1">${i+1}</td>
            <td class="column2">${results[i].name}</td>
            <td class="column3">${data[i].street_no} ${data[i].locality}</td>
            <td class="column4">${data[i].postal_code}</td>
            <td class="column5">${data[i].lat}</td>
            <td class="column6">${data[i].long}</td> 
            </tr>` ;              
        }
}