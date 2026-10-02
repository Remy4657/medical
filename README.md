# An Sinh Pharma — Frontend (Next.js E-commerce)

[Live Demo](https://ansinhpharma.duckdns.org) | [Backend Repository](https://github.com/remy4657/medical-backend)

A modern, full-featured e-commerce frontend for a medical/pharmaceutical system, built with **Next.js 16 (App Router)** + **React 19** + **TypeScript**. The application connects to a NestJS/PostgreSQL backend and supports complete online shopping flow: product catalog, search, cart, checkout with PayOS, user accounts, blog, and admin dashboard.

---

## 🛠️ Công nghệ chính (Tech Stack)

| Khía cạnh              | Công nghệ                                            | Ghi chú                                                   |
| ---------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| **Framework**          | Next.js 16 (App Router), React 19, TypeScript        | Latest Next.js with server components & middleware        |
| **State Management**   | TanStack React Query (server), Zustand (client)      | Fetch-caching, stale-while-revalidate, optimistic updates |
| **Forms & Validation** | react-hook-form + Zod                                | Type-safe schemas, resolver integration                   |
| **Styling**            | Tailwind CSS v4, daisyUI 5                           | Utility-first, component library, dark-mode ready         |
| **Rich Text Editor**   | Tiptap + starter-kit, image, color, text-style       | Blog/content management                                   |
| **Authentication**     | better-auth (Google OAuth, email/password, sessions) | Modern, framework-agnostic auth; JWT + refresh tokens     |
| **Carousel & UI**      | Embla Carousel (autoplay, fade, reactive-utils)      | Product/image sliders                                     |
| **Notifications**      | sonner                                               | Toast/alert notifications                                 |
| **Date/Time**          | countdown                                            | Countdown timers for promotions                           |
| **Deployment**         | Docker (multi-stage), GitHub Actions CI/CD           | Production-ready container image                          |

---

## 📦 Tính năng đã triển khai (Features)

### 🏪 Catalog & Sản phẩm

- Danh mục sản phẩm đa cấp (thực phẩm, thuốc, thiết bị y tế…)
- Trang chi tiết sản phẩm: gallery, biến thể, mô tả
- Sản phẩm bán chạy & khuyến mãi nổi bật (Countdown)
- Phân trang & lọc (category, price range)

### 🔍 Tìm kiếm & Lọc

- Tìm kiếm full-text (tên sản phẩm, mô tả, tên bài viết)
- Gợi ý từ khóa, lưu lịch tìm kiếm
- Lọc theo danh mục, giá, thương hiệu

### 🛒 Giỏ hàng & Đơn hàng

- Thêm/sửa/xóa sản phẩm, thay đổi số lượng
- Đồng bộ giỏ hàng local ↔ server khi đăng nhập
- Tạo đơn hàng, lịch sử đơn hàng
- Trang "Không tìm thấy đơn" (404 trang chủ)

### 💳 Thanh toán

- Tích hợp **PayOS** (create payment link, callback, verify status)
- Modal thanh toán, xử lý kết quả (thành công/thất bại)
- Hỗ trợ múltiple payment methods

### 📝 Blog y tế

- Danh sách bài viết, phân trang
- Trang chi tiết bài viết (slug), rich-text editor (Tiptap)
- Thể loại bài viết, ảnh minh họa

### 👤 Tài khoản & Xác thực

- Đăng ký / Đăng nhập bằng tài khoản google, sử dụng better-auth
- Hồ sơ người dùng: cập nhật tên, giới tính, ngày sinh
- Đơn hàng của tôi, đặt lại mật khẩu

### 🎨 UX/UI & Responsive

- Sidebar điều hướng, BreadCrumb path
- Responsive design (mobile-first)
- Skeleton loading states
- Theme tin tức (daisyUI auto dark-mode)
- Toast notifications cho các hành động

---

## 🏗️ Cấu trúc dự án (Project Structure)

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/                # API routes (auth, OTP, communes)
│   ├── san-pham/           # Products + detail page
│   ├── gio-hang/           # Cart page + actions
│   ├── dat-hang/           # Orders + order/[code]
│   ├── ca-nhan/            # Account profile + orders-of-mine
│   ├── bai-viet/           # Blog list + [slug] detail
│   ├── khuyen-mai/         # Promotions page
│   ├── tim-kiem/           # Search results page
│   └── admin/              # Admin dashboard + login
├── components/             # Reusable UI (navbar, cart, carousel, editor, modal…)
├── services/               # API clients (axios) per domain
├── stores/                 # Zustand stores (cart, common)
├── lib/                    # Auth client, cart sync/merge, API helper
├── hooks/                  # Custom React hooks (useSearch, useDebounce, etc.)
├── constants/              # Config, API endpoints, default values
├── types/                  # TypeScript types & Zod schemas
└── styles/                 # Global styles, Tailwind config
```

### API Services (từng module)

- `src/services/blogService.ts` — Blog CRUD, categories
- `src/services/productService.ts` — Products, variants, inventory
- `src/services/cartService.ts` — Cart operations, sync
- `src/services/orderService.ts` — Order creation, status
- `src/services/searchService.ts` — Full-text search
- `src/services/paymentService.ts` — PayOS integration

### Auth & Session

- `src/lib/auth.ts` — better-auth client initialization
- `src/lib/cart-merge.ts` — Merge local cart into user account

---

## 🚀 Cách chạy dự án (Local Development)

```bash
# 1. Cài đặt dependencies
pnpm install

# 2. Khởi chạy development server
pnpm dev
# Mở http://localhost:3000

# 3. Build production
pnpm build

# 4. Chạy production
pnpm start
```

### Biến môi trường (.env)

```env
# Core
NEXT_PUBLIC_API_URL=https://your-api-url.com/api/v1
NEXT_PUBLIC_APP_URL=https://your-app-url.com
BETTER_AUTH_SECRET=change-this-to-a-long-random-string

# Auth (better-auth)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your-google-client-secret

# PayOS (nếu tích hợp thanh toán)
NEXT_PUBLIC_PAYOS_CLIENT_ID=your-payos-client-id
NEXT_PUBLIC_PAYOS_API_KEY=your-payos-api-key
NEXT_PUBLIC_PAYOS_CHECKSUM_KEY=your-payos-checksum-key

# Database (nếu cần direct connection)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=your_db_password
DB_NAME=medical_db
```

---

## 🐳 Deploy (Docker)

Docker image sử dụng multi-stage build từ `node:22-alpine`:

```bash
# Build
docker build -t an-sinh-pharma-frontend .

# Run
docker run -p 3000:3000 --env-file .env an-sinh-pharma-frontend
```

Hoặc dùng `docker-compose` (đã có sẵn `docker-compose.yml`): `docker-compose up -d`

CI/CD pipeline (`.github/workflows/deploy.yaml`) tự động build và deploy lên vps khi đẩy code lên github.

---

## 📁 Database (PostgreSQL)

Dự án sử dụng PostgreSQL qua Prisma ORM. File `.env` chứa cấu hình kết nối:

```env
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=admin123
DB_NAME=medical_db
```

Migrations và schema quản lý qua Prisma (`prisma/schema.prisma`). Để chạy migration:

```bash
pnpm prisma:migrate:dev
# hoặc
pnpm prisma:generate && pnpm prisma:migrate:deploy
```

---

## 🧪 Testing

```bash
# Run all tests
pnpm run test

# Run in watch mode
pnpm run test:watch

# Run with coverage
pnpm run test:cov

# E2E tests
pnpm run test:e2e
```

---

## 📦 Scripts hữu ích

| Script              | Mô tả                                    |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | Khởi chạy dev server (hot reload)        |
| `pnpm build`        | Build production (TypeScript + bundling) |
| `pnpm start`        | Chạy production server                   |
| `pnpm lint`         | ESLint check                             |
| `pnpm format`       | Format code với Prettier                 |
| `pnpm lint:fix`     | Tự động sửa lỗi ESLint                   |
| `pnpm format:write` | Auto-format toàn bộ code                 |

---

## 👤 Tác giả

**Remy4657** – Frontend Developer

- 💻 Full-stack TypeScript (Next.js, React, NestJS)
- 🎨 UI/UX với Tailwind CSS & daisyUI
- 🛠️ Xác thực, giỏ hàng, thanh toán tích hợp
- 🐳 Docker & CI/CD deployment

---

## Documents

- [NestJS](https://nestjs.com/) – Backend framework
- [better-auth](https://www.better-auth.com/) – Auth library
- [PayOS](https://payos.vn/) – Payment gateway (Vietnam)
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [Vercel](https://vercel.com/) – Deployment platform
