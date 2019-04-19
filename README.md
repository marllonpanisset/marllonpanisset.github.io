# App React com docker

para rodar o projeto execute os seguintes comandos
- *docker-compose build node* : Para buildar a imagem e permite instalar os componentes js.
- *docker-compose run node npm install* : Para instalar os componentes de JS.
- *docker-compose up* : para levantar o container. 

Os 2 primeiros passos só precisam ser executados uma vez.
Para executar comandos no projeto, basta usar o *docker-compose exec node xxx*, onde  xxx é o comando em questão. ex: *docker-compose exec node npm install bootstrap --save*