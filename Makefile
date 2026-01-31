SHELL= /bin/sh
docker_bin= $(shell command -v docker 2> /dev/null)
docker_compose_bin= $(shell if command -v docker-compose > /dev/null 2>&1; then echo 'docker-compose'; else echo 'docker compose'; fi)

ifneq (,$(wildcard .env))
  include .env
  export
endif

ENV_FILE ?= .env
COMPOSE_FILE = docker/docker-compose.yml

check-env:
	@if [ ! -f .env ]; then \
		echo "[ERROR] .env file not found. Copy .env.example to .env"; \
		exit 1; \
	fi

build: check-env
	$(docker_compose_bin) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) build

up: check-env
	$(docker_compose_bin) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) up -d

up-runtime: check-env
	$(docker_compose_bin) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) up --build

down:
	$(docker_compose_bin) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) down

logs:
	$(docker_compose_bin) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) logs -f

shell-%:
	$(docker_compose_bin) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) exec $* sh

docker-ps:
	$(docker_compose_bin) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) ps --all

prune:
	"$(docker_bin)" image prune -f --filter 'label=image-name=form-builder'

migrate:
	$(docker_compose_bin) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) exec app npx prisma migrate deploy

generate:
	$(docker_compose_bin) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) exec app npx prisma generate

typecheck:
	$(docker_compose_bin) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) exec app sh -c "npx prisma generate && npm run typecheck"

help:
	@echo "=========== Form Builder Docker Makefile ==========="
	@echo ""
	@echo "Docker Commands:"
	@echo "  build            Build images + prisma generate + typecheck"
	@echo "  up               Start all services in detached mode"
	@echo "  down             Stop all services"
	@echo "  logs             Show logs from all containers"
	@echo "  prune            Remove Docker images with the 'form-builder' label"
	@echo "  docker-ps        List all Docker containers managed by compose"
	@echo ""
	@echo "Prisma Commands:"
	@echo "  migrate          Apply Prisma migrations inside container"
	@echo "  generate         Generate Prisma Client inside container"
	@echo "  typecheck        Generate Prisma Client and run typecheck"
	@echo ""
	@echo "Container Access:"
	@echo "  shell-<svc>      Enter shell in a running container (e.g. make shell-app)"
	@echo ""
