const fs = require('fs');
const path = require('path');

const inputFile = 'salmos.txt'; // Arquivo de entrada
const outputDir = 'salmos'; // Pasta de saída

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const content = fs.readFileSync(inputFile, 'utf8');
const salmos = {};

let currentSalmo = '';
let buffer = '';
let firstLine = true;

content.split('\n').forEach(line => {
    line = line.trim();
    if (!line) return;
    
    const match = line.match(/^Salmo\s*(\d+)/i);
    if (match) {
        if (currentSalmo) {
            salmos[currentSalmo] += buffer.trim() + '\n\n';
        }
        
        currentSalmo = `salmo${match[1]}`;
        firstLine = true;
        buffer = `${line}\n{}\n`;
        
        if (!salmos[currentSalmo]) {
            salmos[currentSalmo] = '';
        }
    } else {
        if (firstLine) {
            buffer += `${line}\n\n`;
            firstLine = false;
        } else {
            buffer += `${line}\n`;
        }
    }
});

if (currentSalmo) {
    salmos[currentSalmo] += buffer.trim() + '\n';
}

Object.keys(salmos).forEach(salmo => {
    const filePath = path.join(outputDir, `${salmo}.txt`);
    fs.writeFileSync(filePath, salmos[salmo].trim(), 'utf8');
});

console.log('Salmos formatados e salvos!');
