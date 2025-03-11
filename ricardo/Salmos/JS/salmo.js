// Função para obter parâmetros da URL
function obterNumeroSalmo() {
    const params = new URLSearchParams(window.location.search);
    return params.get("numero");
}

// Função para carregar o Salmo
async function carregarSalmo() {
    const numero = obterNumeroSalmo();
    if (!numero) {
        document.getElementById("salmo-titulo").textContent = "Salmo não encontrado";
        return;
    }

    try {
        // Busca o arquivo do Salmo
        const response = await fetch(`salmos/salmo${numero}.txt`);
        if (!response.ok) throw new Error("Salmo não encontrado");

        // Lê o conteúdo do arquivo
        const texto = await response.text();
        const linhas = texto.trim().split("\n");

        // Define os elementos HTML
        document.getElementById("salmo-titulo").textContent = `Salmo ${numero}`;
        document.getElementById("salmo-titulo-principal").textContent = linhas[0];
        document.getElementById("salmo-titulo-original").textContent = linhas.at(-1).replace(/[()]/g, ""); // Remove parênteses
        document.getElementById("salmo-letra").textContent = linhas.slice(1, -1).join("\n");

    } catch (error) {
        document.getElementById("salmo-titulo").textContent = "Erro ao carregar o Salmo";
    }
}

// Inicia o carregamento
carregarSalmo();
