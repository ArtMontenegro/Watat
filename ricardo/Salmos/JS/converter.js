const fs = require("fs");
const path = require("path");

const pastaSalmos = path.join(__dirname, "../salmos"); // Pasta onde estão os arquivos .txt
const arquivoJson = path.join(pastaSalmos, "salmos.json"); // Salva o JSON dentro da pasta salmos

// Função para converter os arquivos em JSON
function converterTxtParaJson() {
    if (!fs.existsSync(pastaSalmos)) {
        console.error(`❌ Erro: A pasta "${pastaSalmos}" não foi encontrada.`);
        process.exit(1);
    }

    const arquivos = fs.readdirSync(pastaSalmos);
    const salmos = [];

    arquivos.forEach((arquivo) => {
        if (arquivo.endsWith(".txt")) {
            // Extrai o número do Salmo do nome do arquivo
            const match = arquivo.match(/\d+/); // Encontra o número no nome do arquivo
            const id = match ? parseInt(match[0], 10) : null;

            if (id === null) {
                console.warn(`⚠️ Arquivo "${arquivo}" não segue o padrão "salmoX.txt" e foi ignorado.`);
                return;
            }

            const conteudo = fs.readFileSync(path.join(pastaSalmos, arquivo), "utf-8").trim();
            const linhas = conteudo.split("\n").map(linha => linha.trim());

            if (linhas.length >= 3) {
                const titulo = linhas[0];
                const tituloOriginal = linhas[1].replace(/[()]/g, ""); // Remove parênteses
                const letra = linhas.slice(2).join("\n"); // Junta o resto do texto

                salmos.push({
                    id,
                    titulo,
                    titulo_original: tituloOriginal,
                    texto: letra
                });
            } else {
                console.warn(`⚠️ Arquivo "${arquivo}" tem formato inválido e foi ignorado.`);
            }
        }
    });

    // Ordena os salmos pelo ID para garantir que fiquem na ordem correta
    salmos.sort((a, b) => a.id - b.id);

    fs.writeFileSync(arquivoJson, JSON.stringify(salmos, null, 4), "utf-8");
    console.log(`✅ Arquivo JSON gerado em: "${arquivoJson}"`);
}

// Executar a conversão
converterTxtParaJson();
