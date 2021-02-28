// Select buttons

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Initialize data array
let dataArray = [];

// Start with three people when page loads
getRandomUser();
getRandomUser();
getRandomUser();



// Use fetch API to grab random users & add money

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const dataObj = await res.json();

    // Store entired fetched object in 'user' variable
    const user = dataObj.results[0]

    // Pull first and last name out of object
    // Store name in newUser variable
    // Generate number 1 to one million
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

//Double everyones money MAP
function doubleMoney() {
    dataArray = dataArray.map((person) => {
        return { ...person, money: person.money * 2 }
        
    })
    updateDOM();
}

// Sort list by richest person SORT
function sortByRichest() {
    dataArray.sort((a,b) => b.money - a.money); 
    updateDOM();
}


// Filter to show only millionaires FILTER
function showMillionaires() {
    dataArray = dataArray.filter((person) => {
    return person.money > 1000000;
    })

    updateDOM();
}
// function showMillionaires() {
//   dataArray = dataArray.filter(person => person.money > 1000000);

//   updateDOM();
// }


//Calculate total wealth REDUCE
function calculateWealth() {
    const wealth = dataArray.reduce((acc, person) => (acc +=
        person.money), 0);

        wealthEl = document.createElement('div');
        wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
        main.appendChild(wealthEl);
}

// Add new object (stored in newUser) to the data array
function addData(obj){
    dataArray.push(obj);

    updateDOM();
}


// Update DOM
function updateDOM(providedData = dataArray) {
    //Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach((person) => {

        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong>
         ${formatMoney(person.money)}`;
        main.appendChild(element);
    });
}

//Format number as money
function formatMoney(number) {
   return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth)
