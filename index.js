
//FOR RANDOM COLORS:

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//FOR THE LABELS
let dates = document.querySelectorAll("#table1 tbody tr")[0];//Select the 1st table row with dates

//console.log(dates) //=> entire 1st row
let labelsTableOne = [];

//create an Array with the proper dates
Array.from(dates.children).forEach(element => {//children property: inside TR, give back the TH elements that are his "children"
    labelsTableOne.push(parseInt(element.innerText))//parseInt becaused numbers
});

console.log(labelsTableOne);

labelsTableOne.shift();//to remove the first 2 elements of the array, because empty
labelsTableOne.shift();


//FOR THE DATASETS

let datasets = Array.from(document.querySelectorAll("#table1 tbody tr"));//array of TR
console.log(datasets)
datasets.shift();//to retrieve the 1st row which are the labels

let datasetsTableOne = []; // the array that gonna contains all the objects

datasets.forEach(element => {
    let objectData = {};//create an object
    let arData = [];//this array is gonna store all the real data, the numbers( without the cities)
    let data = Array.from(element.children);//select  every data (numbers + countries) (td) inside each row
    data.shift();//retrieve the 1st 2 elements, because they are  nb list and countries
    data.shift();
    data.forEach(y=>{
        arData.push(parseInt(y.innerText));
    })

    //here we insert all our key/values pairs inside our object
    objectData.data = arData;//we collected all the Data, the numbers inside each cells
    objectData.label = element.children[1].innerText;//select the country, the 2nd element (so index 1) of each rows
    objectData.borderColor = getRandomColor();
    objectData.fill = "false";
    datasetsTableOne.push(objectData);//insert our objects inside our empty array  
});

console.log(datasetsTableOne)


new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels: labelsTableOne,//=> our array of dates
        datasets: datasetsTableOne//=> our array of objects
        },

    /*options: {
        title: {
        display: true,
        text: 'World population per region (in millions)'
        }
    }*/
});

//SECOND GRAPH:


//LABELS:

let datesTableTwo = document.querySelectorAll("#table2 thead th");//select Data inside the thead
let labelTableTwo = [];

Array.from(datesTableTwo).forEach(element=>{
    labelTableTwo.push(element.innerText)
})

labelTableTwo.shift();//retrieve the first 2 elements, because we just want to keep the years
labelTableTwo.shift();

console.log(labelTableTwo)

//DATASETS

let dataRow = Array.from(document.querySelectorAll("#table2 tbody tr ")); //select all datas per row inside tbody
console.log(dataRow)

dataSetsTableTwo = [];//empty Array that is going to hold all the objects

dataRow.forEach(element=>{
    let objectDataTwo = {};
    let arrDataTwo= [];//array that will hold only the numbers
    let dataTwo = Array.from(element.children);//select the data inside the row
    dataTwo.shift();// retrieve the country and the 1st cell with the number
    dataTwo.shift();
    dataTwo.forEach( y =>{
        arrDataTwo.push(parseInt(y.innerText));
    })
    // here we insert all or keys/values pairs insode our object
    objectDataTwo.data = arrDataTwo;//we insert in our object the data hold in the array
    objectDataTwo.label = element.children[1].innerText;
    objectDataTwo.backgroundColor = getRandomColor();
    console.log(objectDataTwo)
    dataSetsTableTwo.push(objectDataTwo);// we push all our objects inside our array
})



new Chart(document.getElementById("bar-chart-grouped"), {
    type: 'bar',
    data: {
    labels: labelTableTwo,
    datasets: dataSetsTableTwo
    },
});





//THIRD GRAPH

setInterval(function () {
    
    fetch(`https://canvasjs.com/services/data/datapoints.php?xstart=${Math.round(Math.random()*10)}&ystart=${Math.round(Math.random()*10)}&length=10&type=json}`)//sends a HTTP request, GET random values for X and Y
    .then(response =>{//  response here is the file that's coming back
    return response.json();//convert the file into JSON
    })
    .then((data) =>{ // the converted file is now send to this next function, where I want to create a dataset to insert inside my chart
        let arrayOfData3 = [];// I want to create an array of objects, with x and y coordinates
        let dataSet3 = {};
        Array.from(data).forEach(element=>{//data is an array of array with 2 nb in each, that I want to convert into an object with 2 keys( x and Y)
            dataSet3 ={x : element[0], y: element[1]};
            arrayOfData3.push(dataSet3); 
        })
        console.log(arrayOfData3)//arrayOfData3 is now an array of objects with x and y coordinates

        new Chart(document.getElementById("line-chart2"), {
            type: 'line',
            data:{
                datasets: [{
                    label: ' Datasets',
                    data :  arrayOfData3
                }] 
            } ,
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                }
            }
        });
    })
    .catch(error =>{
        console.log(error)
    })
},1000)



/*
Basic structure of Fetch :

fetch (url) // connect to the API, send a request to get data from remote server
.then (response =>{ //response is send back by the API, so this is your data
    return response.json})// here convert your data to json which is a way of writing data
.then ((data) => {
    callback function //now you have you data, in this part you do what you want with this data, like console.log(data)...
})

*/