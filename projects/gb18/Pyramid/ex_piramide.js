//Piramide do Free Code / ex001
const character = "0";
const count = 10;
const rows = [];
let inverted = false;

function padRow(rowNumber, rowCount) {
return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

for (let i = 1; i <= count; i++) {
if (inverted) {
    rows.unshift(padRow(i, count));
} else {
    rows.push(padRow(i, count));
}
}

let result = ""

for (const row of rows) {
result = result + row + "\n";
}

document.getElementById("pyramid").textContent = result;