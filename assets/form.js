export function displayForm () {

    const form = document.querySelector(".form");
    form.style.display = "flex";

    const buttonCreate = document.getElementById("addEventButton")
    buttonCreate.innerHTML = "create -"

}

export function hideForm () {
    const form = document.querySelector(".form");
    form.style.display = "none";
    const buttonCreate = document.getElementById("addEventButton")
    buttonCreate.innerHTML = "create +"
}