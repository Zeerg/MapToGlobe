.PHONY: up down build logs shell clean help build-static deploy preview install

# Default target
help:
	@echo "Available commands:"
	@echo "  Development:"
	@echo "  make up           - Start the development server"
	@echo "  make down         - Stop the development server"
	@echo "  make build        - Build the Docker image"
	@echo "  make logs         - View logs from the container"
	@echo "  make shell        - Open a shell in the container"
	@echo "  make clean        - Remove containers and images"
	@echo ""
	@echo "  Production/Deployment:"
	@echo "  make install           - Install dependencies locally"
	@echo "  make build-static      - Build static files for production"
	@echo "  make preview           - Preview production build locally"
	@echo "  make deploy            - Deploy to Cloudflare Pages (Preview)"
	@echo "  make deploy-production - Deploy to Cloudflare Pages (Production)"
	@echo "  make help              - Show this help message"

# Start the development server
up:
	docker-compose up -d
	@echo "🚀 MapToGlobe is starting..."
	@echo "📱 Open http://localhost:8080 in your browser"
	@echo "📋 Run 'make logs' to see the logs"

# Stop the development server
down:
	docker-compose down
	@echo "🛑 MapToGlobe stopped"

# Build the Docker image
build:
	docker-compose build --no-cache
	@echo "🔨 Docker image built successfully"

# View logs
logs:
	docker-compose logs -f maptoglobe

# Open a shell in the container
shell:
	docker-compose exec maptoglobe /bin/sh

# Clean up containers and images
clean:
	docker-compose down -v --rmi all
	@echo "🧹 Cleaned up containers and images"

# Rebuild and restart
restart: down build up

# Production build commands
install:
	npm install
	@echo "📦 Dependencies installed"

# Build static files for production
build-static:
	@echo "🔨 Building static files for production..."
	NODE_OPTIONS="--openssl-legacy-provider" npm run build
	@echo "✅ Static files built in ./dist/"
	@echo "📁 Ready for deployment to Cloudflare Pages"

# Preview production build locally
preview: build-static
	@echo "🚀 Starting local preview server..."
	@echo "📱 Open http://localhost:4173 in your browser"
	npx serve dist -l 4173

# Deploy to Cloudflare Pages (requires wrangler CLI)
deploy: build-static
	@echo "🚀 Deploying to Cloudflare Pages (Preview)..."
	@if command -v wrangler >/dev/null 2>&1; then \
		wrangler pages publish dist; \
	else \
		echo "❌ Wrangler CLI not found. Install with: npm install -g wrangler"; \
		echo "📖 Then run: wrangler login"; \
		echo "📁 Or manually upload the ./dist/ folder to Cloudflare Pages dashboard"; \
	fi

# Deploy directly to production
deploy-production: build-static
	@echo "🚀 Deploying to Cloudflare Pages (Production)..."
	@if command -v wrangler >/dev/null 2>&1; then \
		wrangler pages publish dist --project-name maptoglobe; \
	else \
		echo "❌ Wrangler CLI not found. Install with: npm install -g wrangler"; \
		echo "📖 Then run: wrangler login"; \
	fi 