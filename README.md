# Watat

Watat repo for testing collaboration in basic training projects.

# Como abrir o site

No terminal, escreve:

```
docker run --name Watat -d -it -p 80:80 -v /home/me/dev/projects/Watat:/usr/local/apache2/htdocs httpd:2.4
```

Isto criará um container para navegar o repositório no teu navegador.

Para acessá-lo, basta abrir o navegador e escrever *localhost*.

Para abri-lo novamente após fechar o container ou apagar a máquina, basta escrever ***docker start Watat*** no terminal, e assim poderás novamente usar o teu navegador.

[Custom configs](custom_configs.md)

[![Maverick](mc_numbas/assets/top-gun-maverick.gif "Mav with aviators")](https://github.com/ArtMontenegro/Watat)
