import { services } from "../../model/articleModel.js";
import { utils } from "../../js/utils.js";

const url = new URL(window.location);
const id = url.searchParams.get("id");
const categoryUrl = url.searchParams.get("category");

const { showToast } = utils;

const backButton = document.getElementById("back-button");
backButton.href = `./showAllArticles.html?category=${categoryUrl}`;

const setData = () => {
    document.getElementById("image").value = url.searchParams.get("image");
    document.getElementById("category").value = categoryUrl;
    document.getElementById("product-name").value = url.searchParams.get("name");
    document.getElementById("price").value = url.searchParams.get("price");
    document.getElementById("description").value = url.searchParams.get("description");
};

const updateButton = document.getElementById("button-update-article");
updateButton.addEventListener("click", async e => {
    e.preventDefault();
    try {
        const image = document.getElementById("image").value;
        const category = document.getElementById("category").value;
        const name = document.getElementById("product-name").value;
        const price = document.getElementById("price").value;
        const description = document.getElementById("description").value;
        if (image === "" || category === "" || name === "" || price === "" || description === "")
            throw new Error("Debes llenar todos los campos");
        await services.update(id, image, category, name, price, description);
        window.location.href = `./showAllArticles.html?category=${categoryUrl}`;
        localStorage.setItem("success-update", true);
    } catch (error) {
        showToast(error.message, "error");
    }
});

setData();
