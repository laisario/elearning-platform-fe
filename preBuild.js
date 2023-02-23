const fs = require("fs");
const axios = require("axios");

axios
    .create({
        baseURL: "https://api.medcursos.online",
    })
    .get("/e-learning/categories")
    .then(({ data: { results: categories } = {} }) => {
        const menu = [
            {
                id: 1,
                label: "Especialidades",
                path: "/courses",
                submenu: categories.map((category) => ({
                    id: category.id,
                    label: category.name,
                    path: `/courses/${category.name}`,
                })),
            },
            {
                id: 2,
                label: "Carrinho",
                path: "/carrinho",
            },
        ];
        fs.writeFileSync("./src/data/menu.json", JSON.stringify(menu, null, 2));
    });
