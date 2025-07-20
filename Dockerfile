# Base image with Bun installed
FROM oven/bun:1.2.15 AS base

WORKDIR /app

# Install dependencies
FROM base AS install
COPY package.json bun.lock /app
RUN bun install

# Copy source files and build the project
COPY . /app
ENV NODE_ENV=production
RUN bun run build

USER bun
EXPOSE 3000
ENTRYPOINT ["bun", "run", "start"]
