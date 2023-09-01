import { services as consoleServices } from "../../model/consoleModel.js";
import { services as starWarsServices } from "../../model/starWarsModel.js";
import { services as variousServices } from "../../model/variousModel.js";

const showToast = message => {
    const toast = document.querySelector(".toast");
    toast.classList.add("toast-active");
    toast.parentElement.querySelector(".toast-message").textContent = message;
    setTimeout(() => {
        toast.classList.remove("toast-active");
    }, 3000);
};

const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async event => {
    event.preventDefault();
    const inputSearch = document.querySelector("#search").value;
    try {
        if (inputSearch === "") throw new Error("El campo no debe estas vacío");
        const consoles = await consoleServices.search(inputSearch);
        const starWars = await starWarsServices.search(inputSearch);
        const various = await variousServices.search(inputSearch);

        if (consoles.length === 0 && starWars.length === 0 && various.length === 0) throw new Error("No se encontraron artículos");
        localStorage.setItem("articles", JSON.stringify({ consoles, starWars, various }));
        window.location.href = "../../html/searchArticle.html";
    } catch (error) {
        showToast(error.message);
    }
});