# ── STAGE 1: Build ──────────────────────────────────────────
# "Give me a container with Bun installed"
# Alpine variant = smaller image
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy package files first (same caching trick as the backend).
# bun.lock* — the * means "if it exists, copy it, if not, skip it"
# This locks dependency versions so everyone gets the same packages.
COPY package.json bun.lock* ./

# Install dependencies.
# --frozen-lockfile means "don't update bun.lock, fail if it's out of date"
# Safer for reproducible builds.
RUN bun install --frozen-lockfile

# Now copy the rest of the frontend source code
COPY . .

# Build the production bundle.
# Output goes to /app/dist — plain HTML, JS, CSS files.
# Your React code gets compiled, minified, and optimized here.
RUN bun run build


# ── STAGE 2: Serve ──────────────────────────────────────────
# Start fresh with Nginx — an extremely fast static file server.
# Bun, node_modules, and source code are all discarded here.
FROM nginx:1.27-alpine AS runtime

# Copy the built files from Stage 1 into Nginx's serving folder.
# When someone visits your site, Nginx reads files from this folder.
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace Nginx's default config with ours.
# Our config handles SPA routing and the API proxy (explained next).
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx. "daemon off" keeps it running in the foreground
# so Docker knows the process is alive.
CMD ["nginx", "-g", "daemon off;"]