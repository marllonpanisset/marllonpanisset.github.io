# marllonpanisset.github.io

## Front-end Stack

Stack de Desenvolvimento Front-end com Vagrant que utilizo para meu site pessoal.

## Dependências
Para usar a stack, você precisa ter o Vagrant e o Virtualbox instalado, as depêndencias do projeto são instaladas automaticamente quando iniciar a maquina pela primeira vez.

## Oque tem na maquina vagrant?
- Git
- Nodejs
- Yarn
- Gulp
- Pug
- Sass (Node-sass)

## Dependências
Para usar a stack, você precisa ter o Vagrant e o Virtualbox instalado, as depêndencias do projeto são instaladas automaticamente quando iniciar a maquina pela primeira vez.

## Como Usar?
Abra o terminal e navegue até a pasta do projeto onde tem o arquivo Vagrantfile e digite os comandos abaixo:

```bash
$ vagrant up
$ vagrant ssh
```
O Comando vagrant up vai iniciar a maquina e instalar todas dependências do projeto, o comando vagrant ssh vai logar na maquina virtual via ssh.

**OBS:** Na primeira vez que for utilizar o projeto, precisa rodar a tarefa de sprite do gulp:

```bash
$ gulp sprite
```

Depois basta rodar o comando para iniciar o projeto em um servidor:

```bash
$ gulp serve
```

Para acessar, digite: **localhost:9000** no browser.

Para gerar build basta rodar o comando:

```bash
$ gulp
```
