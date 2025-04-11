function atualizarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let contador = document.getElementById("cart-count");

  
    if (carrinho.length > 0) {
        contador.textContent = carrinho.length;
        contador.style.display = "flex";
    } else {
    
        contador.style.display = "none";
    }
}


function adicionarAoCarrinho(nome, preco, imagem) {
    
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push({ nome, preco, imagem });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    
    alert("Produto adicionado ao carrinho!");
    atualizarCarrinho();
}


document.addEventListener("DOMContentLoaded", () => {
    
    localStorage.setItem("carrinho", JSON.stringify([]));

   atualizarCarrinho();
});