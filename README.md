# 🍔 FoodApp — Online Food Ordering Web Application

A full-featured food ordering prototype built with **Next.js 14**, supporting Arabic & English, user authentication, cart management, order tracking, and an admin dashboard.

---

## ✨ Features

- 🍽️ **Menu** — Browse food items with images, prices, and category filters
- 🛒 **Cart** — Add, remove, and update item quantities
- 🔐 **Authentication** — Login / logout with role-based access (admin & user)
- 💳 **Payment** — Cash on Delivery or Online Payment
- 📦 **Order Tracking** — 4-step live status (Pending → Preparing → Out for Delivery → Delivered)
- 🛠️ **Admin Dashboard** — Manage products (add/delete) and update order statuses
- 🌍 **Multi-language** — Full Arabic (RTL) and English support

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org) | React framework (App Router) |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Zustand](https://zustand-demo.pmnd.rs) | Global state (cart, orders, products) |
| [next-auth](https://authjs.dev) | Authentication |
| [i18next + react-i18next](https://react.i18next.com) | Arabic / English translations |

---

## 📁 Project Structure

```
food-app/
├── src/
│   ├── app/
│   │   ├── layout.js               # Root layout with Navbar
│   │   ├── page.js                 # Home — Menu page
│   │   ├── globals.css
│   │   ├── login/
│   │   │   └── page.js             # Login page
│   │   ├── cart/
│   │   │   └── page.js             # Cart & checkout
│   │   ├── orders/
│   │   │   └── page.js             # Order tracking
│   │   ├── admin/
│   │   │   ├── page.js             # Admin dashboard
│   │   │   └── products/
│   │   │       └── page.js         # Manage products
│   │   └── api/
│   │       └── auth/
│   │           └── [...nextauth]/
│   │               └── route.js    # Auth API route
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── MenuCard.js
│   │   ├── CartItem.js
│   │   ├── OrderStatus.js
│   │   ├── LanguageSwitcher.js
│   │   └── I18nProvider.js
│   ├── store/
│   │   ├── cartStore.js            # Cart state (Zustand + localStorage)
│   │   ├── orderStore.js           # Orders state (Zustand + localStorage)
│   │   └── productStore.js         # Products state (Zustand + localStorage)
│   ├── data/
│   │   └── menu.js                 # Default menu items seed data
│   ├── lib/
│   │   └── auth.js                 # NextAuth configuration
│   └── i18n/
│       ├── index.js                # i18n setup
│       ├── en.json                 # English strings
│       └── ar.json                 # Arabic strings
├── public/
│   └── images/                     # Food images (burger.jpg, pizza.jpg …)
├── .env.local
└── next.config.js
```

---

## 🚀 Getting Started

### 1. Create the project

```bash
npx create-next-app@latest food-app --app --js --tailwind --eslint --src-dir --import-alias "@/*"
cd food-app
```

### 2. Install dependencies

```bash
npm install zustand next-auth@beta i18next react-i18next
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
NEXTAUTH_SECRET=your_secret_key_here_change_this
NEXTAUTH_URL=http://localhost:3000
```

### 4. Add food images

Place images inside `/public/images/` with these names:

```
burger.jpg
pizza.jpg
salad.jpg
fries.jpg
wrap.jpg
cake.jpg
placeholder.jpg   ← fallback image for broken links
```

> Free images: [unsplash.com](https://unsplash.com) or [pexels.com](https://pexels.com)

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 👤 Demo Accounts

| Role  | Email          | Password |
|-------|----------------|----------|
| Admin | admin@food.com | admin123 |
| User  | user@food.com  | user123  |

> To add more users, edit the `USERS` array in `src/lib/auth.js`

---

## 📱 Pages Overview

| Route | Description | Access |
|---|---|---|
| `/` | Menu with category filter | Public |
| `/login` | Login form | Public |
| `/cart` | Cart, payment, place order | Public |
| `/orders` | Track your orders | Logged in |
| `/admin` | Dashboard: stats + order management | Admin only |
| `/admin/products` | Add / delete menu products | Admin only |

---

## 🌍 Language Support

Click the **EN / عربي** button in the navbar to switch languages. Arabic switches the layout to RTL automatically.

To add more translation keys, edit:
- `src/i18n/en.json` — English
- `src/i18n/ar.json` — Arabic

---

## 🗄️ State & Data Persistence

All state is managed with **Zustand** and persisted to **localStorage**, so data survives page refreshes within the same browser.

| Store | localStorage Key | What it stores |
|---|---|---|
| `cartStore` | `food-cart` | Cart items & quantities |
| `orderStore` | `food-orders` | All placed orders |
| `productStore` | `food-products` | Menu products (admin edits) |

> For multi-device/production use, replace localStorage with a real database (e.g. [Supabase](https://supabase.com)).

---

## ✅ Feature Checklist

- [x] Menu with images & prices
- [x] Category filtering
- [x] Add to cart / update quantity / remove
- [x] User login & logout
- [x] Role-based access (admin vs user)
- [x] Cash on Delivery + Online payment placeholder
- [x] Order status tracking (4 steps)
- [x] Admin dashboard with stats
- [x] Admin order status management
- [x] Admin add / delete products (reflects on menu instantly)
- [x] Arabic & English with RTL support
- [x] Persistent state via localStorage

---

## 🔮 Next Steps (for production)

- Connect a real database (Supabase, MongoDB, PlanetScale)
- Integrate a payment gateway (Stripe, PayMob, Tap Payments)
- Add image upload for products (Cloudinary or Supabase Storage)
- Send order confirmation emails (Resend, Nodemailer)
- Deploy to [Vercel](https://vercel.com) for free

---

## 📄 License

MIT — free to use and modify.
