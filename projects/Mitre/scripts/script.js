document.addEventListener("DOMContentLoaded", () => {
    const linkBoxes = document.querySelectorAll(".link-box");

    linkBoxes.forEach((box) => {
        const scrollable = box.querySelector(".scrollable-content");
        const button = box.querySelector(".link-button");
        const title = box.querySelector(".title-box");

        const updateShadow = () => {
            if (!scrollable || !button || !title) return;

            const scrollTop = scrollable.scrollTop;
            const scrollHeight = scrollable.scrollHeight;
            const clientHeight = scrollable.clientHeight;

            const scrolledToTop = scrollTop <= 0;
            const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 1;

            // Sombra no topo (title-box) se NÃO está no topo
            if (!scrolledToTop) {
                title.classList.add("shadow-visible");
            } else {
                title.classList.remove("shadow-visible");
            }

            // Sombra no fundo (link-button) se NÃO está no fim
            if (!scrolledToBottom) {
                button.classList.add("shadow-visible");
            } else {
                button.classList.remove("shadow-visible");
            }
        };

        scrollable.addEventListener("scroll", updateShadow);
        window.addEventListener("resize", updateShadow);
        updateShadow();
    });
});
