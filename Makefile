# Poon Personal Finance Visualizer - Development Makefile
# Author: Development Team
# Description: Comprehensive build, test, and development commands

.PHONY: help install clean dev local build test lint format docker

# Default target
.DEFAULT_GOAL := help

# Colors for output
CYAN := \033[36m
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
RESET := \033[0m

#==============================================================================
# Help target - shows available commands
#==============================================================================

help: ## 📋 Show this help message
	@echo ""
	@echo "$(CYAN)🏦 Poon Personal Finance Visualizer - Development Commands$(RESET)"
	@echo ""
	@echo "$(YELLOW)📦 Setup & Installation:$(RESET)"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*📦.*' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)🚀 Development & Build:$(RESET)"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*🚀.*' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)🧪 Testing & Quality:$(RESET)"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*🧪.*' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)🛠️  Utilities & Maintenance:$(RESET)"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*🛠️.*' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""

#==============================================================================
# Setup & Installation
#==============================================================================

install: ## 📦 Install all dependencies and setup project
	@echo "$(CYAN)📦 Installing dependencies...$(RESET)"
	npm install
	@echo "$(GREEN)✅ Dependencies installed successfully!$(RESET)"

install-clean: ## 📦 Clean install - removes node_modules and package-lock.json first
	@echo "$(CYAN)🧹 Cleaning previous installation...$(RESET)"
	rm -rf node_modules package-lock.json
	@echo "$(CYAN)📦 Fresh install...$(RESET)"
	npm install
	@echo "$(GREEN)✅ Clean installation completed!$(RESET)"

#==============================================================================
# Development & Build
#==============================================================================

dev: ## 🚀 Start development server with API endpoints (npm run dev)
	@echo "$(CYAN)🚀 Starting development server (API mode)...$(RESET)"
	@echo "$(YELLOW)📡 Note: This mode attempts to connect to real APIs$(RESET)"
	npm run dev

local: ## 🚀 Start development server with mock data only (npm run local)
	@echo "$(CYAN)🚀 Starting local development server (Mock mode)...$(RESET)"
	@echo "$(GREEN)🏠 Note: This mode uses only mock data - perfect for offline development$(RESET)"
	npm run local

build: ## 🚀 Build for development
	@echo "$(CYAN)🔨 Building for development...$(RESET)"
	npm run build:dev
	@echo "$(GREEN)✅ Development build completed!$(RESET)"

build-prod: ## 🚀 Build for production
	@echo "$(CYAN)🔨 Building for production...$(RESET)"
	npm run build:prod
	@echo "$(GREEN)✅ Production build completed!$(RESET)"

preview: ## 🚀 Preview the built app
	@echo "$(CYAN)👀 Starting preview server...$(RESET)"
	npm run preview

start: ## 🚀 Alias for 'make local' - start with mock data
	@$(MAKE) local

#==============================================================================
# Testing & Quality
#==============================================================================

test: ## 🧪 Run all tests in watch mode
	@echo "$(CYAN)🧪 Running tests in watch mode...$(RESET)"
	npm run test

test-run: ## 🧪 Run all tests once
	@echo "$(CYAN)🧪 Running all tests...$(RESET)"
	npm run test:run
	@echo "$(GREEN)✅ All tests completed!$(RESET)"

test-coverage: ## 🧪 Run tests with coverage report
	@echo "$(CYAN)🧪 Running tests with coverage...$(RESET)"
	npm run test:coverage
	@echo "$(GREEN)✅ Test coverage report generated!$(RESET)"
	@echo "$(YELLOW)📊 Open coverage/index.html to view detailed report$(RESET)"

test-ui: ## 🧪 Run tests with UI
	@echo "$(CYAN)🧪 Starting test UI...$(RESET)"
	npm run test:ui

test-e2e: ## 🧪 Run end-to-end tests
	@echo "$(CYAN)🧪 Running E2E tests...$(RESET)"
	@echo "$(YELLOW)🏠 Starting local server for E2E tests...$(RESET)"
	npm run test:e2e
	@echo "$(GREEN)✅ E2E tests completed!$(RESET)"

test-e2e-ui: ## 🧪 Run E2E tests with UI
	@echo "$(CYAN)🧪 Starting E2E test UI...$(RESET)"
	@echo "$(YELLOW)💡 This will open Playwright Test Runner UI$(RESET)"
	npm run test:e2e:ui

test-e2e-headed: ## 🧪 Run E2E tests in headed mode (visible browser)
	@echo "$(CYAN)🧪 Running E2E tests in headed mode...$(RESET)"
	npx playwright test --headed

test-e2e-debug: ## 🧪 Run E2E tests in debug mode
	@echo "$(CYAN)🔍 Running E2E tests in debug mode...$(RESET)"
	npx playwright test --debug

test-e2e-report: ## 📊 Show E2E test report
	@echo "$(CYAN)📊 Opening E2E test report...$(RESET)"
	npx playwright show-report e2e-results

test-e2e-install: ## 📦 Install Playwright browsers
	@echo "$(CYAN)📦 Installing Playwright browsers...$(RESET)"
	npx playwright install
	@echo "$(GREEN)✅ Playwright browsers installed!$(RESET)"

test-e2e-clean: ## 🧹 Clean E2E test results
	@echo "$(CYAN)🧹 Cleaning E2E test results...$(RESET)"
	@rm -rf e2e-results test-results
	@echo "$(GREEN)✅ E2E test results cleaned!$(RESET)"

test-all: ## 🧪 Run all tests (unit + coverage + e2e)
	@echo "$(CYAN)🧪 Running complete test suite...$(RESET)"
	@$(MAKE) type-check
	@$(MAKE) test-run
	@$(MAKE) test-coverage
	@$(MAKE) test-e2e
	@echo "$(GREEN)🎉 Complete test suite finished!$(RESET)"
	@echo "$(YELLOW)📊 Check coverage/index.html and e2e-results/index.html for detailed reports$(RESET)"

#==============================================================================
# Linting & Formatting
#==============================================================================

lint: ## 🧪 Check code quality and linting
	@echo "$(CYAN)🔍 Running linter...$(RESET)"
	npm run lint:check
	@echo "$(GREEN)✅ Linting passed!$(RESET)"

lint-fix: ## 🔧 Fix linting issues automatically
	@echo "$(CYAN)🔧 Fixing auto-fixable linting issues...$(RESET)"
	npm run lint:fix
	@echo "$(CYAN)🔧 Running Prettier for code formatting...$(RESET)"
	npm run format
	@echo "$(GREEN)✅ All auto-fixable issues resolved!$(RESET)"

format: ## 🧪 Format code with Prettier
	@echo "$(CYAN)✨ Formatting code...$(RESET)"
	npm run format
	@echo "$(GREEN)✅ Code formatted!$(RESET)"

format-check: ## 🧪 Check code formatting
	@echo "$(CYAN)📝 Checking code formatting...$(RESET)"
	npm run format:check
	@echo "$(GREEN)✅ Code formatting is correct!$(RESET)"

quality: ## 🧪 Run all quality checks (lint + format + type-check)
	@echo "$(CYAN)🔍 Running all quality checks...$(RESET)"
	@$(MAKE) lint
	@$(MAKE) format-check
	npm run type-check
	@echo "$(GREEN)✅ All quality checks passed!$(RESET)"

quality-fix: ## 🧪 Fix all quality issues (lint-fix + format)
	@echo "$(CYAN)🔧 Fixing all quality issues...$(RESET)"
	@$(MAKE) lint-fix
	@$(MAKE) format
	@echo "$(GREEN)✅ All quality issues fixed!$(RESET)"

#==============================================================================
# Utilities & Maintenance
#==============================================================================

clean: ## 🛠️ Clean build artifacts and cache
	@echo "$(CYAN)🧹 Cleaning build artifacts...$(RESET)"
	npm run clean
	rm -rf .vite
	@echo "$(GREEN)✅ Clean completed!$(RESET)"

clean-all: ## 🛠️ Deep clean - removes node_modules, build artifacts, and cache
	@echo "$(CYAN)🧹 Deep cleaning project...$(RESET)"
	rm -rf node_modules dist coverage .nyc_output .vite
	rm -f package-lock.json
	@echo "$(GREEN)✅ Deep clean completed! Run 'make install' to reinstall dependencies.$(RESET)"

type-check: ## 🛠️ Run TypeScript type checking
	@echo "$(CYAN)📝 Running TypeScript type check...$(RESET)"
	npm run type-check
	@echo "$(GREEN)✅ Type checking passed!$(RESET)"

analyze: ## 🛠️ Analyze bundle size
	@echo "$(CYAN)📊 Analyzing bundle size...$(RESET)"
	npm run analyze

logs: ## 🛠️ Show application logs (if running)
	@echo "$(CYAN)📋 Showing development logs...$(RESET)"
	@echo "$(YELLOW)Check the terminal where you ran 'make dev' or 'make local'$(RESET)"

stop: ## 🛠️ Stop all development servers
	@echo "$(CYAN)🛑 Stopping development servers...$(RESET)"
	@pkill -f "npm run" || true
	@pkill -f "vite" || true
	@echo "$(GREEN)✅ Development servers stopped!$(RESET)"

#==============================================================================
# Docker Support (Optional)
#==============================================================================

docker-build: ## 🛠️ Build Docker image
	@echo "$(CYAN)🐳 Building Docker image...$(RESET)"
	docker build -t poon:latest .
	@echo "$(GREEN)✅ Docker image built!$(RESET)"

docker-run: ## 🛠️ Run Docker container
	@echo "$(CYAN)🐳 Running Docker container...$(RESET)"
	docker run -p 5173:5173 poon:latest

#==============================================================================
# Quick Development Commands
#==============================================================================

quick-start: ## 🚀 Quick start for new developers (install + local)
	@echo "$(CYAN)🚀 Quick start setup...$(RESET)"
	@$(MAKE) install
	@echo ""
	@echo "$(GREEN)🎉 Setup complete! Starting local development server...$(RESET)"
	@echo "$(YELLOW)💡 This uses mock data so you can develop offline$(RESET)"
	@$(MAKE) local

ci: ## 🧪 Run CI pipeline (type-check + lint + test + build)
	@echo "$(CYAN)🔄 Running CI pipeline...$(RESET)"
	@$(MAKE) type-check
	@$(MAKE) lint
	@$(MAKE) test-run
	@$(MAKE) build
	@echo "$(GREEN)🎉 CI pipeline completed successfully!$(RESET)"

#==============================================================================
# Environment Information
#==============================================================================

info: ## 🛠️ Show environment and project information
	@echo ""
	@echo "$(CYAN)🏦 Poon Personal Finance Visualizer$(RESET)"
	@echo "$(CYAN)========================================$(RESET)"
	@echo "📁 Project: $(shell pwd)"
	@echo "📦 Node: $(shell node --version 2>/dev/null || echo 'Not installed')"
	@echo "📦 NPM: $(shell npm --version 2>/dev/null || echo 'Not installed')"
	@echo "🔧 Git: $(shell git --version 2>/dev/null || echo 'Not installed')"
	@echo ""
	@echo "$(YELLOW)🚀 Available Environment Modes:$(RESET)"
	@echo "  • $(CYAN)make local$(RESET)  - Mock data only (offline development)"
	@echo "  • $(CYAN)make dev$(RESET)    - Real APIs (requires backend)"
	@echo "  • $(CYAN)make build-prod$(RESET) - Production build"
	@echo ""
	@echo "$(YELLOW)🧪 Quick Commands:$(RESET)"
	@echo "  • $(CYAN)make quick-start$(RESET) - Setup and start developing immediately"
	@echo "  • $(CYAN)make test-all$(RESET)    - Run complete test suite"
	@echo "  • $(CYAN)make quality-fix$(RESET) - Fix all code quality issues"
	@echo "  • $(CYAN)make ci$(RESET)          - Run CI pipeline locally"
	@echo ""
