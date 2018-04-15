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

**N.B.** npm is installed automatically alongside Node.js, but it can cause permissions issues if you try to install a package globally. It's highly recommended to install npm using a version manager to avoid permissions issues for the next step.

After installing Node.js and npm, install the Angular CLI with the following command:

```bash
npm install -g @angular/cli
```

## Deployment

1. Clone the repository.

```bash
git clone https://github.com/TAASSK/Joule
cd Joule
```

2. Create the `.env` file and populate it (see comments in `.env.dist` for more details).

```bash
cp .env.dist .env
vim .env
```

3. Run the following command:

```bash
make deploy
```
