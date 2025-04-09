document.addEventListener("DOMContentLoaded", () => {
    // Adiciona funcionalidades aos botões

    document.getElementById("menu-button")?.addEventListener("click", () => {
        alert("Função de menu ainda não implementada!");
    });

    document.getElementById("back-button")?.addEventListener("click", () => {
        window.history.back();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchBox = document.getElementById("search-box");
    const resultsContainer = document.getElementById("search-results");
    let salmos = [];

    // Carregar os salmos do JSON
    fetch("salmos/salmos.json")
        .then(response => response.json())
        .then(data => {
            salmos = data;
        });

    // Exibir ou ocultar a caixa de pesquisa ao clicar no botão
    searchButton.addEventListener("click", (event) => {
        event.stopPropagation();
        searchBox.classList.toggle("search-visible");

        if (searchBox.classList.contains("search-visible")) {
            searchBox.focus();
        }
    });

    // Fechar a caixa de pesquisa ao clicar fora dela
    document.addEventListener("click", (event) => {
        if (!searchBox.contains(event.target) && event.target !== searchButton) {
            searchBox.classList.remove("search-visible");
            resultsContainer.innerHTML = ""; // Limpa os resultados ao fechar
        }
    });

    // Evitar que a caixa feche ao clicar dentro dela
    searchBox.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // Filtrar e exibir resultados ao digitar na busca
    searchBox.addEventListener("input", (event) => {
        const termo = event.target.value.toLowerCase();
        resultsContainer.innerHTML = ""; // Limpa os resultados anteriores

        if (termo.trim() === "") return; // Não busca se o campo estiver vazio

        const resultados = salmos.filter(salmo => 
            salmo.titulo.toLowerCase().includes(termo) || 
            salmo.titulo_original.toLowerCase().includes(termo) || 
            salmo.texto.toLowerCase().includes(termo)
        );

        resultados.forEach(salmo => {
            const item = document.createElement("a");
            item.href = `salmo.html?numero=${salmo.id}`;
            item.className = "search-result";
            item.textContent = `${salmo.id} - ${salmo.titulo}`;
            resultsContainer.appendChild(item);
        });
    });
});
