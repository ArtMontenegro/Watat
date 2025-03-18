// Função para obter parâmetros da URL
function obterNumeroSalmo() {
    const params = new URLSearchParams(window.location.search);
    return params.get("numero"); // Obtém o número do Salmo na URL
}

// Função para carregar os Salmos do JSON
async function carregarSalmo() {
    const numero = obterNumeroSalmo();
    if (!numero) {
        document.getElementById("salmo-titulo").textContent = "Salmo não encontrado";
        return;
    }

    try {
        // Busca o arquivo JSON
        const response = await fetch("./salmos/salmos.json");
        if (!response.ok) throw new Error("Erro ao carregar os Salmos");

        // Converte o JSON para um array de objetos
        const salmos = await response.json();
        
        // Procura pelo Salmo correspondente
        const salmo = salmos.find(s => s.id == numero);
        if (!salmo) throw new Error("Salmo não encontrado");

        // Atualiza os elementos HTML com os dados do JSON
        document.getElementById("salmo-titulo").textContent = `Salmo ${salmo.id}`;
        document.getElementById("salmo-titulo-principal").textContent = salmo.titulo;
        
        // Se o título original estiver vazio, insere uma quebra de linha
        document.getElementById("salmo-titulo-original").innerHTML = salmo.titulo_original ? salmo.titulo_original : "<br>";

        document.getElementById("salmo-letra").textContent = salmo.texto;

    } catch (error) {
        document.getElementById("salmo-titulo").textContent = "Erro ao carregar o Salmo";
        console.error(error);
    }
}

// Inicia o carregamento
carregarSalmo();
