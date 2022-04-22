let listaRestaurantes = [];
const categorias = [
    "Africana",
    "Alemã",
    "Árabe",
    "Argentina",
    "Asiática",
    "Açaí",
    "Baiana",
    "Bebidas",
    "Brasileira",
    "Cafeteria",
    "Carnes",
    "Casa de Sucos",
    "Chinesa",
    "Colombiana",
    "Congelados Fit",
    "Congelados",
    "Contemporânea",
    "Conveniência",
    "Coreana",
    "Cozinha rápida",
    "Crepe",
    "Doces & Bolos",
    "Espanhola",
    "Francesa",
    "Frangos",
    "Frutos do mar",
    "Gaúcha",
    "Grega",
    "Hambúrguer",
    "Indiana",
    "Italiana",
    "Japonesa",
    "Lanches",
    "Marmita",
    "Marroquina",
    "Mediterrânea",
    "Mercado",
    "Mexicana",
    "Mineira",
    "Nordestina",
    "Padaria",
    "Panqueca",
    "Paranaense",
    "Pastel",
    "Peixes",
    "Peruana",
    "Pizza",
    "Portuguesa",
    "Presentes",
    "Salgados",
    "Saudável",
    "Sopas & Caldos",
    "Sorvetes",
    "Tailandesa",
    "Tapioca",
    "Típica do Norte",
    "Variada",
    "Vegana",
    "Vegetariana",
    "Xis",
    "Yakisoba",
];

verificarCarregamentoPagina();

function verificarCarregamentoPagina() {
    const raizPagina = document.querySelector("html");
    raizPagina.addEventListener("DOMNodeInserted", inicializarFiltro);
}

function inicializarFiltro() {
    const intervaloChecagem = setInterval(() => {
        let restaurantesWrapper = document.querySelector(
            '[data-card-name="MERCHANT_LIST_V2"]'
        );

        const divFiltro = document.querySelector(".div-extensao");

        if (restaurantesWrapper && !divFiltro) {
            console.log("adicionei");

            listaRestaurantes = pegarListaRestaurantes();
            restaurantesWrapper.addEventListener(
                "DOMNodeInserted",
                checarFiltro
            );

            adicionarInputFiltro(categorias, restaurantesWrapper);
            clearInterval(intervaloChecagem);
        }
    }, 1000);
}

function pegarListaRestaurantes() {
    return [...document.querySelectorAll(".merchant-list-v2__item-wrapper")];
}

// Temporariamente as categorias estão hard-coded
// const categorias = pegarCategorias(listaRestaurantes);
function pegarCategorias() {
    const categorias = listaRestaurantes.map((card) => {
        const nomeCategoria =
            card.querySelector(".merchant-v2__info").childNodes[2].textContent;

        return nomeCategoria;
    });

    return [...new Set(categorias)].sort();
}

function adicionarInputFiltro(categorias, restaurantesWrapper) {
    conteudoDetails = criarCheckboxes(categorias);

    novoNode = criarDivFiltros(conteudoDetails);

    const containerRestaurantes = document.querySelector(".merchant-list-v2");

    restaurantesWrapper.insertBefore(novoNode, containerRestaurantes);

    const checkBoxes = [...document.querySelectorAll(".form-filtro input")];

    checkBoxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (event) =>
            handleCheckboxFiltro(event)
        );
    });
}

function criarDivFiltros() {
    let novoNode = document.createElement("div");
    novoNode.classList.add("div-extensao");

    novoNode.innerHTML = `
    <details>
        <summary>Filtre aqui o que você NÃO quer ver</summary>
        <form class="form-filtro"> 
        ${conteudoDetails}
        </form>
    </details>
    `;

    return novoNode;
}

function criarCheckboxes(categorias) {
    let conteudoDetails = "";

    categorias.forEach((categoria) => {
        conteudoDetails += `
        <div>
        <input " type="checkbox" name=${categoria} id=${categoria} value=${categoria}/>
        <label for=${categoria}>${categoria}</label>
        </div>`;
    });

    return conteudoDetails;
}

function handleCheckboxFiltro(event) {
    filtrarListaRestaurantes(event.target.id, event.target.checked);
}

function checarFiltro() {
    listaRestaurantes = pegarListaRestaurantes();

    const checkBoxes = [...document.querySelectorAll(".form-filtro input")];
    checkBoxes.forEach((checkBox) => {
        filtrarListaRestaurantes(checkBox.id, checkBox.checked);
    });
}

function filtrarListaRestaurantes(tipo, valor) {
    const listaFiltrada = listaRestaurantes.filter((card) => {
        if (card.querySelector(".merchant-v2__info").textContent.includes(tipo))
            return true;
        else return false;
    });

    listaFiltrada.forEach((card) => {
        if (valor) {
            card.setAttribute("style", "display: none");
        } else if (!valor) {
            card.removeAttribute("style");
        }
    });
}
