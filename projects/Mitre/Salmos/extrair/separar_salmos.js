const fs = require('fs');
const path = require('path');

const arquivoEntrada = "salmos.txt";
const pastaSaida = "salmos";

// Criar a pasta de saída se não existir
if (!fs.existsSync(pastaSaida)) {
    fs.mkdirSync(pastaSaida);
}

// Ler o arquivo original
fs.readFile(arquivoEntrada, 'utf8', (err, data) => {
    if (err) {
        console.error("Erro ao ler o arquivo:", err);
        return;
    }

    const linhas = data.split('\n');
    let salmos = {};
    let salmoAtual = "";
    let numeroAtual = "";

    linhas.forEach(linha => {
        const match = linha.match(/^Salmo\s*(\d+)/i); // Identifica "Salmo 1", "Salmo 23A", etc.

        if (match) {
            if (salmoAtual && numeroAtual) {
                // Adiciona o conteúdo ao Salmo correspondente
                salmos[numeroAtual] = (salmos[numeroAtual] || "") + salmoAtual.trim() + "\n\n";
            }

            // Pega apenas o número do Salmo
            numeroAtual = `salmo${match[1]}`;
            salmoAtual = `\n${linha}\n\n`; // Inicia um novo bloco
        } else {
            salmoAtual += linha + "\n";
        }
    });

    // Salvar o último Salmo processado
    if (salmoAtual && numeroAtual) {
        salmos[numeroAtual] = (salmos[numeroAtual] || "") + salmoAtual.trim() + "\n";
    }

    // Escrever os arquivos separados
    Object.keys(salmos).forEach(numero => {
        const nomeArquivo = `${numero}.txt`;
        fs.writeFileSync(path.join(pastaSaida, nomeArquivo), salmos[numero].trim(), 'utf8');
        console.log(`Salvo: ${nomeArquivo}`);
    });

    console.log("Salmos separados com sucesso na pasta 'salmos'!");
});
