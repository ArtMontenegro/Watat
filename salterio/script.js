// Função para verificar se o arquivo do Salmo existe
async function verificarArquivoExiste(numero) {
    try {
        const response = await fetch(`salmos/salmo${numero}.html`, { method: "HEAD" });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Função para criar os elementos dos Salmos
async function carregarSalmos() {
    const container = document.querySelector(".salmos-container");

    for (let i = 1; i <= 150; i++) {
        const existe = await verificarArquivoExiste(i);

        const salmoElement = document.createElement(existe ? "a" : "div");
        salmoElement.className = existe ? "salmo-box" : "salmo-box disabled";
        salmoElement.textContent = i;

        if (existe) {
            salmoElement.href = `salmos/salmo${i}.html`;
            salmoElement.setAttribute("data-title", `Título do Salmo ${i}`);
        }

        container.appendChild(salmoElement);
    }
}

carregarSalmos();
