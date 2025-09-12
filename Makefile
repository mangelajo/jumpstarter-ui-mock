# Makefile for Jumpstarter UI
# This Makefile provides convenient targets for development and deployment

# Default target
.DEFAULT_GOAL := help

# Variables
CONTAINER_NAME := jumpstarter-ui
CONTAINER_IMAGE := jumpstarter-ui:latest
PORT := 3000
NODE_ENV := development

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# Help target - shows available commands
.PHONY: help
help: ## Show this help message
	@printf "$(BLUE)Jumpstarter UI - Available Commands$(NC)\n"
	@printf "\n"
	@printf "$(YELLOW)Development:$(NC)\n"
	@printf "  npm-install     Install npm dependencies\n"
	@printf "  build          Build the application for production\n"
	@printf "  serve          Start development server\n"
	@printf "\n"
	@printf "$(YELLOW)Container:$(NC)\n"
	@printf "  build-container Build Docker/Podman container image\n"
	@printf "  run-container   Run the container\n"
	@printf "  stop-container  Stop the running container\n"
	@printf "  clean-container Remove container and image\n"
	@printf "\n"
	@printf "$(YELLOW)Utilities:$(NC)\n"
	@printf "  clean          Clean build artifacts and dependencies\n"
	@printf "  test           Run tests\n"
	@printf "  lint           Run linting\n"
	@printf "\n"
	@printf "$(YELLOW)Examples:$(NC)\n"
	@printf "  make help              # Show this help\n"
	@printf "  make npm-install       # Install dependencies\n"
	@printf "  make build             # Build for production\n"
	@printf "  make serve             # Start dev server\n"
	@printf "  make build-container   # Build container\n"
	@printf "  make run-container     # Run container on port 3000\n"
	@printf "  make run-container PORT=8080  # Run container on port 8080\n"

# Development targets
.PHONY: npm-install
npm-install: ## Install npm dependencies
	@printf "$(BLUE)📦 Installing npm dependencies...$(NC)\n"
	npm install
	@printf "$(GREEN)✅ Dependencies installed successfully!$(NC)\n"

.PHONY: build
build: ## Build the application for production
	@printf "$(BLUE)🔨 Building application for production...$(NC)\n"
	npm run build
	@printf "$(GREEN)✅ Build completed successfully!$(NC)\n"

.PHONY: serve
serve: ## Start development server
	@printf "$(BLUE)🚀 Starting development server...$(NC)\n"
	@printf "$(YELLOW)Access the application at: http://localhost:$(PORT)$(NC)\n"
	@printf "$(YELLOW)Press Ctrl+C to stop the server$(NC)\n"
	npm start

# Container targets
.PHONY: build-container
build-container: ## Build Docker/Podman container image
	@printf "$(BLUE)🐳 Building container image...$(NC)\n"
	@if command -v podman >/dev/null 2>&1; then \
		podman build -f Containerfile -t $(CONTAINER_IMAGE) .; \
	elif command -v docker >/dev/null 2>&1; then \
		docker build -f Containerfile -t $(CONTAINER_IMAGE) .; \
	else \
		printf "$(RED)❌ Neither Podman nor Docker found. Please install one of them.$(NC)\n"; \
		exit 1; \
	fi
	@printf "$(GREEN)✅ Container built successfully!$(NC)\n"
	@printf "$(YELLOW)Image: $(CONTAINER_IMAGE)$(NC)\n"

.PHONY: run-container
run-container: ## Run the container
	@printf "$(BLUE)🐳 Starting container...$(NC)\n"
	@if podman container exists $(CONTAINER_NAME) 2>/dev/null; then \
		printf "$(YELLOW)🛑 Stopping existing container...$(NC)\n"; \
		podman stop $(CONTAINER_NAME) 2>/dev/null || true; \
		podman rm $(CONTAINER_NAME) 2>/dev/null || true; \
	fi
	@if command -v podman >/dev/null 2>&1; then \
		podman run -d -p $(PORT):3000 --name $(CONTAINER_NAME) --userns=keep-id $(CONTAINER_IMAGE); \
	elif command -v docker >/dev/null 2>&1; then \
		docker run -d -p $(PORT):3000 --name $(CONTAINER_NAME) $(CONTAINER_IMAGE); \
	else \
		printf "$(RED)❌ Neither Podman nor Docker found. Please install one of them.$(NC)\n"; \
		exit 1; \
	fi
	@printf "$(GREEN)✅ Container started successfully!$(NC)\n"
	@printf "$(YELLOW)Container name: $(CONTAINER_NAME)$(NC)\n"
	@printf "$(YELLOW)Access the application at: http://localhost:$(PORT)$(NC)\n"
	@printf "\n"
	@printf "$(YELLOW)Useful commands:$(NC)\n"
	@printf "  make stop-container    # Stop the container\n"
	@printf "  make clean-container   # Remove container and image\n"
	@if command -v podman >/dev/null 2>&1; then \
		printf "  podman logs $(CONTAINER_NAME)    # View container logs\n"; \
		printf "  podman ps              # List running containers\n"; \
	elif command -v docker >/dev/null 2>&1; then \
		printf "  docker logs $(CONTAINER_NAME)    # View container logs\n"; \
		printf "  docker ps              # List running containers\n"; \
	fi

.PHONY: stop-container
stop-container: ## Stop the running container
	@printf "$(BLUE)🛑 Stopping container...$(NC)\n"
	@if command -v podman >/dev/null 2>&1; then \
		if podman container exists $(CONTAINER_NAME) 2>/dev/null; then \
			podman stop $(CONTAINER_NAME); \
			printf "$(GREEN)✅ Container stopped successfully!$(NC)\n"; \
		else \
			printf "$(YELLOW)⚠️  Container $(CONTAINER_NAME) not found$(NC)\n"; \
		fi; \
	elif command -v docker >/dev/null 2>&1; then \
		if docker ps -q -f name=$(CONTAINER_NAME) | grep -q .; then \
			docker stop $(CONTAINER_NAME); \
			printf "$(GREEN)✅ Container stopped successfully!$(NC)\n"; \
		else \
			printf "$(YELLOW)⚠️  Container $(CONTAINER_NAME) not found$(NC)\n"; \
		fi; \
	else \
		printf "$(RED)❌ Neither Podman nor Docker found.$(NC)\n"; \
		exit 1; \
	fi

.PHONY: clean-container
clean-container: stop-container ## Remove container and image
	@printf "$(BLUE)🧹 Cleaning up container and image...$(NC)\n"
	@if command -v podman >/dev/null 2>&1; then \
		podman rm $(CONTAINER_NAME) 2>/dev/null || true; \
		podman rmi $(CONTAINER_IMAGE) 2>/dev/null || true; \
	elif command -v docker >/dev/null 2>&1; then \
		docker rm $(CONTAINER_NAME) 2>/dev/null || true; \
		docker rmi $(CONTAINER_IMAGE) 2>/dev/null || true; \
	fi
	@printf "$(GREEN)✅ Cleanup completed!$(NC)\n"

# Utility targets
.PHONY: clean
clean: ## Clean build artifacts and dependencies
	@printf "$(BLUE)🧹 Cleaning build artifacts...$(NC)\n"
	rm -rf build/
	rm -rf node_modules/
	rm -f package-lock.json
	@printf "$(GREEN)✅ Cleanup completed!$(NC)\n"

.PHONY: test
test: ## Run tests
	@printf "$(BLUE)🧪 Running tests...$(NC)\n"
	npm test -- --watchAll=false
	@printf "$(GREEN)✅ Tests completed!$(NC)\n"

.PHONY: lint
lint: ## Run linting
	@printf "$(BLUE)🔍 Running linter...$(NC)\n"
	npm run build
	@printf "$(GREEN)✅ Linting completed!$(NC)\n"

# Development workflow targets
.PHONY: dev
dev: npm-install serve ## Install dependencies and start development server

.PHONY: prod
prod: build build-container run-container ## Build and run production container

# Show help by default
%:
	@printf "$(RED)Unknown target: $@$(NC)\n"
	@printf "Run 'make help' to see available targets\n"
