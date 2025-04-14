const fs = require('fs');
const mammoth = require('mammoth');

if (process.argv.length < 3) {
    console.error("Uso: node extrair_docx.js <caminho_do_docx>");
    process.exit(1);
}

const caminhoDOCX = process.argv[2];
const caminhoTXT = caminhoDOCX.replace(/\.docx$/, '.txt');

fs.readFile(caminhoDOCX, (err, data) => {
    if (err) {
        console.error("Erro ao ler o arquivo DOCX:", err);
        return;
    }

    mammoth.extractRawText({ buffer: data })
        .then(result => {
            // Substituir o símbolo '͜' por '_'
            const textoCorrigido = result.value.replace(/\u035C/g, '_');

            fs.writeFile(caminhoTXT, textoCorrigido, err => {
                if (err) {
                    console.error("Erro ao salvar o arquivo TXT:", err);
                } else {
                    console.log(`Texto extraído e salvo em: ${caminhoTXT}`);
                }
            });
        })
        .catch(err => {
            console.error("Erro ao processar o arquivo DOCX:", err);
        });
});
