let myLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')

const leadsFromLocalStorage = JSON.parse( localStorage.getItem('myLeads') ); // gets value from myLeads stored in local storage

// checks if the myLeads value is truthy so that it can render out the value stores in local storage
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads)
    })
})

// it reads through the entire myLeads array so that any new input can be rendered out into the screen
function render(leads) {
    let listItem = '';
    for (let i = 0; i < leads.length; i++) {
        // listItem += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>";
        listItem += `
            <li>
                <a href="${leads[i]}" target="_blank">
                    ${leads[i]}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItem;
}

// by double clicking the deleteBtn we clear the localStorage, myLeads value, and the DOM
deleteBtn.addEventListener('dblclick', function() {
    // myLeads = localStorage.clear();
    localStorage.clear()
    myLeads = []
    render(myLeads)
    // ulEl.textContent = '';
})

// listens for keydown events and if enter key is pressed it activates inputBtn 
inputEl.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        inputBtn.click();
    }
})

// listens for events and if inputBtn is clicked then it adds the new value into the myLeads array
inputBtn.addEventListener('click', function() {
    myLeads.push(inputEl.value);
    inputEl.value = '';
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
    // console.log(localStorage.getItem("myLeads"))
})
