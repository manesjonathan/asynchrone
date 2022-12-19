const button = document.querySelector(".generate-button");
button.addEventListener("click", () => fetchString());

let ul = document.createElement("ul");
document.body.appendChild(ul);

function fetchString() {
    fetch("data.json")
        .then((response) => response.json())
        .then((json) => {
            json.stringList.forEach(string => {
                let li = document.createElement("li");
                li.innerText = string;
                ul.appendChild(li);
            });
        })
}