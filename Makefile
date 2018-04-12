#
# Makefile
# Joule
#
# Created by Andy Rash on 2018-04-11
#

DOCKER_ROOT = config/
DOCKER_COMPOSE_FILE = $(DOCKER_ROOT)docker-compose.yml
ROOT = $(shell pwd)/
SRC = src/

#################################
#  Deployment                   #
#################################

deploy:
	docker-compose --file $(DOCKER_COMPOSE_FILE) up -d --force-recreate

stop:
	docker-compose --file $(DOCKER_COMPOSE_FILE) stop
