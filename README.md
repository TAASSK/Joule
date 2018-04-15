# Joule

Joule is a web app that keeps track of coworker ratings.

## Initial Setup

The Joule application has three major depedencies: the Docker CE Engine, Docker Compose, and the Angular CLI.

Installation for the first two are beyond the scope of this document, but the links below should be plenty:

* [Docker CE Engine](https://docs.docker.com/engine/installation/)
* [Docker Compose](https://docs.docker.com/compose/install/)

As for the last requirement, the Angular CLI itself requires Node.js and npm:

* [Node.js](https://nodejs.org/en/download/package-manager/)
* [npm](https://docs.npmjs.com/getting-started/installing-node#using-a-version-manager-to-install-nodejs-and-npm)

**N.B.** `npm` is installed automatically alongside Node.js, but it can cause permissions issues if you try to install a package globally. It's highly recommended to install `npm` using a version manager to avoid permissions issues for the next step.

After installing Node.js and `npm`, install the Angular CLI with the following command:

```bash
npm install -g @angular/cli
```

## Development

To get started, clone the repository.

```bash
git clone https://github.com/TAASSK/Joule
cd Joule
```

### Web App

It is recommended to use the built-in development server packaged with the Angular CLI when developing the web app. The root of the Angular app is at `Joule/src/public`. Once inside this directory, the development server can be started with the command 

```bash
ng serve
```

### API

Directly developing with the database requires that the database's credentials be registered as environment variables in the database's Docker container. This is accomplished through the use of a `.env` file. Since these files contain sensitive information, they should not be included with Git check-ins. A `.env.dist` file with the proper environment variables and formatting has been provided. Simply copy this file to another file named `.env` and populate it. **This must happen before moving forward to avoid errors.**

```bash
cp .env.dist .env
vim .env
```

Once this has been done, run the following command to start up the development server:

```bash
make deploy_dev
```

After this command has completed, simply use a web browser or other API  testing tool to navigate to `localhost:8080/api/<route-name>`.

**N.B.** Due to a conflict between the Caddy webserver and a requirement for Angular routing, calls to the API must be prefixed with `/api`.


## Deployment

Run the following command when deploying to production:

```bash
make deploy_prod
```

This command will build both the Angular app _and_ start up the API server.
