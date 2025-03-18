// Função para obter o título do Salmo a partir do arquivo .txt
async function obterTituloSalmo(numero) {
    try {
        const response = await fetch(`salmos/salmo${numero}.txt`);
        if (!response.ok) return null;

        const texto = await response.text();
        const linhas = texto.split("\n").map(linha => linha.trim()); // Divide o texto em linhas e remove espaços extras
        return linhas[0] || `Salmo ${numero}`; // Usa a primeira linha como título ou um título genérico
    } catch (error) {
        return null;
    }
}

// Função para criar os elementos dos Salmos
async function carregarSalmos() {
    const container = document.querySelector(".salmos-container");

    for (let i = 1; i <= 150; i++) {
        const titulo = await obterTituloSalmo(i);

        const salmoElement = document.createElement(titulo ? "a" : "div");
        salmoElement.className = titulo ? "salmo-box" : "salmo-box disabled";
        salmoElement.textContent = i;

        if (titulo) {
            salmoElement.href = `salmo.html?numero=${i}`;
            salmoElement.setAttribute("data-title", titulo); // Define o tooltip com o título real
        }

        container.appendChild(salmoElement);
    }
}

// Inicia o carregamento dos Salmos
carregarSalmos();
