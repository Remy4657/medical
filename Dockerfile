

# ==========================================
# Cach 1: dùng node:alpine image để giảm kích thước image và tăng tính bảo mật
# 1. Builder
# ==========================================

FROM node:22-alpine AS builder
#### Set the working directory inside the container to /app
WORKDIR /app
# đảm bảo docker chạy đúng phiên bản pnpm với project
RUN corepack enable \
    && corepack prepare pnpm@11.20.0 --activate
# cài đặt các gói cần thiết để build project
# RUN apk add --no-cache python3 make g++
# cài đặt các file package.json, pnpm-lock.yaml và pnpm-workspace.yaml vào thư mục làm việc
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# cài đặt các dependencies của project, sử dụng --frozen-lockfile để đảm bảo cài đặt đúng phiên bản trong pnpm-lock.yaml
RUN pnpm install --frozen-lockfile
# sao chép toàn bộ mã nguồn của project vào thư mục làm việc của container
COPY . .

RUN pnpm build
# loại bỏ các dependencies không cần thiết cho môi trường production, chỉ giữ lại các dependencies cần thiết để chạy ứng dụng
RUN pnpm prune --prod

# Tạo một stage mới cho môi trường production, sử dụng image node:22-alpine
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
# sao chép các file cần thiết từ stage builder sang stage production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/main.js"]



# ==========================================
# Cach 2: Sử dụng distroless image để giảm kích thước image và tăng tính bảo mật
# 1. Builder
# ==========================================
# FROM node:22-bookworm-slim AS builder

# WORKDIR /app

# # Dùng đúng pnpm version của project
# RUN corepack enable \
#     && corepack prepare pnpm@11.20.0 --activate

# # Copy dependency files trước để tận dụng Docker cache
# COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# # Cài dependencies
# RUN pnpm install --frozen-lockfile

# # Copy source
# COPY . .

# # Build NestJS
# RUN pnpm build

# # Chỉ giữ production dependencies
# RUN pnpm prune --prod


# # ==========================================
# # 2. Production
# # ==========================================
# FROM gcr.io/distroless/nodejs22-debian13:nonroot AS production

# WORKDIR /app

# ENV NODE_ENV=production

# # Production dependencies
# COPY --from=builder /app/node_modules ./node_modules

# # NestJS build
# COPY --from=builder /app/dist ./dist

# EXPOSE 8080

# CMD ["dist/main.js"]