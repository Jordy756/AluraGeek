import { services } from "../model/consoleModel.js";

const getAll = async () => {
    try {
        const consoles = await services.getAll();
        const container = document.getElementById("console-articles");
        if (consoles.length === 0) throw new Error();

        consoles.forEach(({ id, image, name, price }) => {
            const article = `
                <article class="article">
                    <picture class="article-container-image">
                        <img class="article-image" src="${image}" alt="Imagen del producto" loading="lazy"/>
                    </picture>
                    <span class="article-name">${name}</span>
                    <span class="article-price">${price}</span>
                    <a class="article-link" href="./html/showArticle.html?category=consoles&id=${id}">Ver producto</a>
                </article>`;
            container.insertAdjacentHTML("afterbegin", article);
        });
    } catch (error) {
        console.log(error);
    }
};

getAll();