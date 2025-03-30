# Use official Node 20 LTS
FROM node:20

# Set working directory
WORKDIR /app

# 1. Copy ONLY package files
COPY package.json pnpm-lock.yaml* ./

# 2. Install dependencies
RUN corepack enable && \
    pnpm install --frozen-lockfile

# 3. Copy app files
COPY . .

# 4. Build Next.js
RUN pnpm run build

# 5. Start server
EXPOSE 3000
CMD ["pnpm", "start"]