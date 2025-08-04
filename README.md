# Watat

Watat repo for testing collaboration in basic training projects.

Para acessar o site, basta clicar no GIF do Maverick ou abrir este link:
<https://artmontenegro.github.io/Watat/>

Alternativamente, podes criar um container no docker para o Watat

No terminal, escreve:

```
docker run --name Watat -d -it -p 80:80 -v /home/me/dev/projects/Watat:/usr/local/apache2/htdocs httpd:2.4
```

Isto criará um container para navegar o repositório no teu navegador.

Para acessá-lo, basta abrir o navegador e escrever *localhost*.

Para abri-lo novamente após fechar o container ou apagar a máquina, basta escrever ***docker start Watat*** no terminal, e assim poderás novamente usar o teu navegador.

[Custom configs](configs.md)

[![Maverick](projects/mc-numbas/assets/top-gun-maverick.gif "Mav with aviators")](https://artmontenegro.github.io/Watat/)
