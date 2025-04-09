function build() {
  const rows = [];
  const character = document.getElementById('characterInput').value;
  const height = document.getElementById('heightInput').value;
  const inverted = document.getElementById('invertedInput').checked;
  console.log({ character, height, inverted });
  //format pyramid
  function padRow(rowNumber, rowCount) {
    return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
  }

  //loop to build pyramid
  for (let i = 1; i <= height; i++) {
    if (inverted) {
      rows.unshift(padRow(i, height));
    } else {
      rows.push(padRow(i, height));
    }
  }

  //set result on string
  let result = ""

  //add rows to result
  for (const row of rows) {
    result = result + row + "\n";
  }

  //update html to show result
  pyramid.innerText = result;
}

//fisher yates shuffle: random array sort function
const p = [];
function fisherYates() {
  for (let i = p.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = p[i];
    p[i] = p[j];
    p[j] = k;
  }
}
