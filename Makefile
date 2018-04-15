#
# Makefile
# Joule
#
# Created by Andy Rash on 2018-04-11
#

DOCKER_ROOT = ./
DOCKER_COMPOSE_FILE = $(DOCKER_ROOT)docker-compose.yml
ROOT = $(shell pwd)/
SERVER_ROOT = $(ROOT)src/
ANGULAR_ROOT = $(SERVER_ROOT)public/

#################################
#  Build                        #
#################################

build:
	cd $(ANGULAR_ROOT) ; ng build --prod --build-optimizer

install:
	cd $(SERVER_ROOT) ; npm install

#################################
#  Deploy                       #
#################################

deploy: build install
	docker-compose --file $(DOCKER_COMPOSE_FILE) up -d --force-recreate

__destroy:
	@echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
	@echo "This will destroy the current containers."
	@echo "[Press enter if this is okay]"
	@read _
	docker-compose --file $(DOCKER_COMPOSE_FILE) down

stop:
	docker-compose --file $(DOCKER_COMPOSE_FILE) stop

.PHONY: build deploy __destroy install stop
