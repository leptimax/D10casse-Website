# D10casse-Website
Web site developed during my studies for one of the most wonderfull club of my engineering school

## Install 

### Requirements

- Docker (follow installation guide [here](https://docs.docker.com/engine/install/) !)
- Docker-compose (follow installation guide [here](https://docs.docker.com/compose/install/) !)

### Dependancies

This website is based on HTML, PHP, Javascript, CSS and MySQL technologies however, you don't need to install a LAMP service to run it. Everything you need is managed by the docker-compose file which install and run different services needed by the website.

### D10casse deposit

First of all, clone the project.

Configure a local development `.env` file (`cp .env.example .env`) :

```
MYSQL_ROOT_PASSWORD=secret
MYSQL_USER=current_user
MYSQL_PASSWORD=secret

MYSQL_DATABASE=d10casse
MYSQL_HOST=mysql

PMA_HOST: mysql
PMA_PORT: 3306
PMA_ARBITRARY: 1
```

> You can set as you wish the three first lines, they determine the username and pasword for root user and a current user on MySQL database. They allow, you among other things, to access to the database from PHPMyAdmin.

Build the project `docker-compose build` then start it `docker-compose up -d `.

Now open http://127.0.0.1:8080 (**sans https**) to access to the website

If you want access to PHPMyAdmin, open http://127.0.0.1:10001

## Install for WAMP or other stack on windows

If you already have a stack configured and wish only copy file on your own servor, you will find all source files [here](https://github.com/leptimax/D10casse-Website/tree/source_files_for_windows)

## Licence

This project is the intellectual property of leptimax and can be used ONLY for a non commercial usage without authorization.  