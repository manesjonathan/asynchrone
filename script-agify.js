const button = document.querySelector(".fetch-button");
const input = document.querySelector(".text-input");
const select = document.querySelector(".countries");
const main = document.querySelector("main");

const fetchCountry = () => fetch("countries.json");
let messageList = [];

fetchCountry()
    .then((response) => response.json())
    .then((json) => {

        json.forEach(country => {
            const newOption = document.createElement("option");
            const optionText = document.createTextNode(country.name);
            newOption.appendChild(optionText);
            newOption.setAttribute("value", JSON.stringify([code = country.code, value = country.name]));
            select.appendChild(newOption);

        });
    });

button.addEventListener("click", () => fetchName(input.value, select.value));

function update() {
    main.innerHTML = null;
    let messageList = JSON.parse(localStorage.getItem("message-list"));
    for (let message of messageList) {
        let div = document.createElement("div");
        div.innerText = message
        main.appendChild(div);
    }
}

function fetchName(name, country) {
    response = JSON.parse(country);
    fetch("https://api.agify.io/?name=" + name + "&country_id=" + response[0])
        .then((response) => response.json())
        .then((json) => {
            let message = "Median age of " + json.name + " is " + json.age + " years old in " + response[1] + " and count " + json.count + " persons"
            messageList.push(message);
            localStorage.setItem("message-list", JSON.stringify(messageList));
            update();
        })
        .catch((error) => {
            console.log(error);
        });
}
update();