<div align="center">

<br />

<h1>🎮 GameForge</h1>

<p align="center">
  <strong>The Ultimate Esports Tournament Management Platform</strong><br/>
  Create, manage, and compete in online tournaments for Valorant, BGMI & Free Fire.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-Express%205-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-4.x-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Razorpay-Payment-02042B?style=for-the-badge&logo=razorpay&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-success?style=flat-square" />
</p>

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Real-Time Events](#-real-time-events-socketio)
- [Authentication Flow](#-authentication-flow)
- [Third-Party Integrations](#-third-party-integrations)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**GameForge** is a full-stack, production-ready esports tournament management web application. It enables two types of users — **Players** and **Hosts** — to participate in a complete esports ecosystem:

- **Players** form teams, verify their Riot accounts, compete in tournaments, track their stats, and climb global leaderboards.
- **Hosts** create & manage tournaments, generate match brackets (Single/Double Elimination), update scores in real-time, and declare winners.

GameForge is built for modern competitive gaming communities with real-time updates, Razorpay payment integration, Google OAuth, Cloudinary media storage, Valorant account verification via the Henrik API, in-app notifications, team chat, an achievement system, and much more.

---

## ✨ Features

### 👤 User System
- **Dual Role System**: `PLAYER` and `HOST` roles with distinct dashboards and permissions
- **Email/Password Authentication** with JWT Access & Refresh tokens (httpOnly cookies)
- **Google OAuth 2.0** sign-in integration
- **Email Verification** via Nodemailer (SMTP)
- **Password Reset** with secure tokenized links (30-minute expiry)
- **Security Question** for additional account recovery
- **Account Deletion** with confirmation

### 🎯 Player Features
- Full **Player Profile** with avatar (Cloudinary upload), bio, favorite games, preferred role
- **Riot Account Verification** — link and verify Valorant game name + tag line via Henrik API (fetches PUUID, rank, card, title, MMR)
- Player **Stats Tracking** — matches played, wins, losses, championships, tournaments played
- **Achievement System** — 14+ unique achievements unlocked by milestones (First Win, 10 Wins, Riot Verified, Championships, etc.)
- **Global Leaderboard** with animated countup stats and rank badges
- Browse **Player Profiles** of all registered users

### 🤝 Team Management
- Create & manage a **Team** with name, logo (Cloudinary), and description
- **Captain Role** with full team controls
- **Player Invitation System** — invite players by username, accept/reject invitations
- **Leave / Remove Members** — players can leave; captain can remove members
- **Transfer Captaincy** to another team member
- Up to 5 members per team

### 🏆 Tournament System
- **Hosts create tournaments** with: name, game (Valorant / BGMI / Free Fire), mode (SOLO / DUO / SQUAD / 5v5), format, description, banner image, max teams, registration window, tournament dates, prize pool, entry fee, and rules
- Full **tournament lifecycle**: `DRAFT → REGISTRATION_OPEN → REGISTRATION_CLOSED → LIVE → COMPLETED / CANCELLED`
- **Team Registration** with eligibility checks (team size, payment, registration window)
- **Withdraw** from a tournament before it starts
- **Paid Tournament Support** via Razorpay (entry fee collection)
- **Free Tournaments** supported
- Banner image upload via Cloudinary

### ⚔️ Bracket & Match System
- **Single Elimination** and **Double Elimination** bracket generation
- Automated bracket seeding from registered teams
- **Match Result Reporting** by Hosts (scores for Team A & Team B)
- Automatic winner propagation to the next round
- Real-time **bracket updates** via Socket.IO
- Host can **complete a tournament**, declaring the final winner, updating player stats & achievements

### 💬 Team Chat
- Real-time **Team Chat** powered by Socket.IO
- Messages persisted to MongoDB
- Room-based messaging (`team:<teamId>`)

### 🔔 Notifications
- In-app **notification system** for: tournament updates, team invitations, achievement unlocks, payment confirmations

### 📊 Dashboard & Analytics
- **Player Dashboard** — upcoming tournaments, recent matches, personal stats
- **Host Dashboard** — hosted tournament overview, active tournaments
- **Leaderboard** with ApexCharts integration and animated statistics

### 💳 Payments
- **Razorpay** integration for paid tournaments
- Order creation, payment capture, and signature verification on the backend
- Payment records stored with status tracking: `CREATED → SUCCESS / FAILED / REFUNDED`

---

## 🛠 Tech Stack

### Frontend (Client)
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI Library |
| Vite | 8 | Build Tool & Dev Server |
| React Router DOM | 7 | Client-side Routing |
| TailwindCSS | 4 | Utility-first Styling |
| Framer Motion | 12 | Animations |
| Zustand | 5 | Global State Management |
| TanStack Query | 5 | Server State / Data Fetching |
| Axios | 1.x | HTTP Client |
| Socket.IO Client | 4.x | Real-time Communication |
| React Hook Form | 7 | Form Handling |
| Zod | 4 | Schema Validation |
| ApexCharts | 5 | Charts & Analytics |
| Lucide React | 1.x | Icon Library |
| React Hot Toast | 2 | Toast Notifications |
| date-fns | 4 | Date Formatting |
| @react-oauth/google | 0.13 | Google OAuth Client |

### Backend (Server)
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 5 | Web Framework |
| MongoDB | Atlas/Local | Database |
| Mongoose | 9 | ODM |
| Socket.IO | 4.x | Real-time WebSockets |
| JWT (jsonwebtoken) | 9 | Authentication Tokens |
| bcrypt | 6 | Password Hashing |
| Cloudinary | 2 | Media Storage |
| Multer | 2 | File Upload Middleware |
| Nodemailer | 9 | Email Service (SMTP) |
| Razorpay | 2.9 | Payment Gateway |
| Google Auth Library | 10 | Google OAuth Verification |
| Axios | 1.x | Henrik API HTTP Client |
| express-validator | 7 | Request Validation |
| Zod | 4 | Schema Validation |
| Morgan | 1 | HTTP Request Logger |
| dotenv | 17 | Environment Variables |
| nodemon | 3 | Dev Hot Reload |

---

## 🏗 Project Architecture

```
GameForge_Final/
├── client/                        # React + Vite Frontend
│   ├── public/
│   └── src/
│       ├── api/                   # Axios API call modules
│       ├── components/            # Reusable UI components
│       │   ├── auth/
│       │   ├── bracket/
│       │   ├── dashboard/
│       │   ├── host/
│       │   ├── layout/            # MainLayout, HostLayout
│       │   ├── navbar/
│       │   ├── notifications/
│       │   ├── players/
│       │   ├── profile/
│       │   ├── settings/
│       │   ├── team/
│       │   ├── tournaments/
│       │   └── ui/
│       ├── constants/
│       ├── features/              # Feature-sliced modules
│       │   ├── auth/
│       │   ├── profile/
│       │   ├── team/
│       │   └── tournament/
│       ├── hooks/                 # Custom React hooks
│       ├── pages/                 # Route-level page components
│       ├── routes/                # React Router config + guards
│       │   ├── AppRoutes.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── HostRoute.jsx
│       ├── services/
│       ├── socket/                # Socket.IO client setup
│       ├── store/                 # Zustand global store
│       ├── utils/
│       ├── validators/
│       ├── App.jsx
│       └── main.jsx
│
└── server/                        # Node.js + Express Backend
    ├── config/
    │   └── db.js                  # MongoDB connection
    ├── constants/                 # Achievement codes, enums
    ├── controllers/               # Route handlers (thin layer)
    ├── errors/                    # Custom error classes
    ├── middleware/
    │   ├── auth.middleware.js      # JWT verification
    │   ├── error.middleware.js     # Global error handler
    │   ├── upload.middleware.js    # Multer configuration
    │   └── validate.middleware.js
    ├── models/                    # Mongoose models
    │   ├── achievement.model.js
    │   ├── chat.model.js
    │   ├── invitation.model.js
    │   ├── match.model.js
    │   ├── notification.model.js
    │   ├── payment.model.js
    │   ├── team.model.js
    │   ├── tournament.model.js
    │   └── user.model.js
    ├── routes/                    # Express route definitions
    ├── scripts/
    │   └── syncAllAchievements.js
    ├── services/                  # Business logic layer
    │   ├── achievement.service.js
    │   ├── auth.service.js
    │   ├── bracket.service.js
    │   ├── email.service.js
    │   ├── match.service.js
    │   ├── payment.service.js
    │   ├── statistics.service.js
    │   ├── team.service.js
    │   ├── tournament.service.js
    │   └── thirdParty/
    │       └── henrik.service.js  # Riot/Valorant API wrapper
    ├── socket/
    │   └── socketManager.js       # Socket.IO server setup
    ├── templates/                 # Email HTML templates
    ├── utils/
    ├── validators/
    ├── app.js                     # Express app setup
    └── server.js                  # HTTP server entry point
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Cloudinary** account
- **Google Cloud Console** project with OAuth 2.0 credentials
- **Razorpay** account (test mode keys work for development)
- **Henrik Dev API** key — [henrikdev.xyz](https://henrikdev.xyz/)
- **Gmail App Password** or SMTP credentials for Nodemailer

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/GameForge.git
cd GameForge
```

2. **Install server dependencies**

```bash
cd server
npm install
```

3. **Install client dependencies**

```bash
cd ../client
npm install
```

### Environment Variables

#### Server — `server/.env`

```env
# Server
PORT=5000

# MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/gameforge

# JWT
JWT_ACCESS_SECRET=your_super_secret_access_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Client URL (CORS & email links)
CLIENT_URL=http://localhost:5173

# Henrik API (Valorant verification)
HENRIK_API_KEY=HDEV-your-api-key-here
HENRIK_BASE_URL=https://api.henrikdev.xyz

# Email (SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your_gmail_app_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Razorpay
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

#### Client — `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_SERVER_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

> ⚠️ **Never commit `.env` files to Git.** Both are covered by `.gitignore`.

### Running the App

**Start the backend server:**

```bash
cd server
npm run dev       # Development (nodemon hot-reload)
# or
npm start         # Production
```

Server runs at `http://localhost:5000`.

**Start the frontend:**

```bash
cd client
npm run dev
```

Client runs at `http://localhost:5173`.

**Sync achievements (optional, for existing users):**

```bash
cd server
npm run sync-achievements
```

---

## 📡 API Reference

All routes are prefixed with `/api`.

### 🔐 Auth — `/api/auth`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | ❌ | Register new user |
| `POST` | `/login` | ❌ | Login with email/password |
| `GET` | `/me` | ✅ JWT | Get current user |
| `POST` | `/logout` | ✅ JWT | Logout user |
| `POST` | `/refresh-token` | ❌ | Refresh access token via cookie |
| `GET` | `/verify-email/:token` | ❌ | Verify email address |
| `GET` | `/check-username` | ❌ | Check username availability |
| `GET` | `/check-email` | ❌ | Check email availability |
| `POST` | `/verify-riot` | ❌ | Verify Riot/Valorant account |
| `PATCH` | `/change-password` | ✅ JWT | Change password |
| `DELETE` | `/delete-account` | ✅ JWT | Delete user account |
| `GET` | `/security-question` | ❌ | Get security question |
| `POST` | `/forgot-password` | ❌ | Request password reset email |
| `POST` | `/reset-password/:token` | ❌ | Reset password with token |
| `PATCH` | `/security-question` | ✅ JWT | Save security question |

### 🔑 Google OAuth — `/api/auth/google`
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/` | Authenticate with Google ID token |

### 👤 Profile — `/api/profile`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | ✅ JWT | Get own profile |
| `PATCH` | `/` | ✅ JWT | Update profile (avatar upload) |
| `GET` | `/:username` | ❌ | Get any player's public profile |

### 🤝 Team — `/api/team`
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| `POST` | `/` | PLAYER | Create a team |
| `GET` | `/my-team` | PLAYER | Get own team |
| `PATCH` | `/` | PLAYER | Update team |
| `POST` | `/invite` | PLAYER | Invite player by username |
| `GET` | `/invitations` | PLAYER | Get pending invitations |
| `POST` | `/invitations/:id/accept` | PLAYER | Accept invitation |
| `POST` | `/invitations/:id/reject` | PLAYER | Reject invitation |
| `POST` | `/leave` | PLAYER | Leave current team |
| `DELETE` | `/members/:memberId` | PLAYER | Remove member (Captain only) |
| `PATCH` | `/captain/:memberId` | PLAYER | Transfer captaincy |

### 🏆 Tournament — `/api/tournaments`
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| `POST` | `/` | HOST | Create tournament |
| `GET` | `/` | Public | List all tournaments |
| `GET` | `/host/my` | HOST | Get host's tournaments |
| `GET` | `/:id` | Public | Get tournament by ID |
| `PATCH` | `/:id` | HOST | Update tournament |
| `DELETE` | `/:id` | HOST | Delete tournament |
| `POST` | `/:id/register` | PLAYER | Register team |
| `DELETE` | `/:id/register` | PLAYER | Withdraw team |
| `POST` | `/:id/generate-bracket` | HOST | Generate bracket |
| `GET` | `/:id/bracket` | Public | Get bracket matches |
| `PATCH` | `/:id/complete` | HOST | Complete tournament & declare winner |
| `GET` | `/:id/eligibility` | PLAYER | Check team eligibility |

### ⚔️ Match — `/api/matches`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `PATCH` | `/:id/result` | ✅ JWT | Report match result |

### 👥 Players — `/api/players`
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | List all players |
| `GET` | `/:username` | Get player profile |

### 🔔 Notifications — `/api/notifications`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | ✅ JWT | Get notifications |
| `PATCH` | `/:id/read` | ✅ JWT | Mark as read |
| `PATCH` | `/read-all` | ✅ JWT | Mark all as read |

### 💬 Team Chat — `/api/team-chat`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/messages` | ✅ JWT | Get team messages |
| `POST` | `/messages` | ✅ JWT | Send a message |

### 💳 Payments — `/api/payments`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/create-order` | ✅ JWT | Create Razorpay order |
| `POST` | `/verify` | ✅ JWT | Verify payment & register team |

### 🏥 Health — `/api/health`
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Server health check |

---

## 🗄 Database Schema

### User
| Field | Type | Description |
|-------|------|-------------|
| `username` | String | Unique, 3–20 chars |
| `displayName` | String | Display name |
| `email` | String | Unique email |
| `password` | String | Hashed (bcrypt), LOCAL auth only |
| `role` | Enum | `PLAYER` \| `HOST` |
| `avatar` | String | Cloudinary URL |
| `bio` | String | Max 250 chars |
| `riotGameName` / `riotTagLine` | String | Valorant account details |
| `riotVerified` | Boolean | Riot account linked |
| `puuid` | String | Riot PUUID |
| `currentRank` | Enum | Valorant rank (Iron → Radiant) |
| `preferredRole` | Enum | DUELIST / INITIATOR / CONTROLLER / SENTINEL / FLEX |
| `region` | Enum | ap / na / eu / kr / latam / br |
| `elo` | Number | Internal ELO rating |
| `stats` | Object | matchesPlayed, wins, losses, championships, tournamentsPlayed |
| `authProviders` | [Enum] | `LOCAL` \| `GOOGLE` |
| `team` | ObjectId | Reference to Team |
| `emailVerified` | Boolean | Email verification status |

### Tournament
| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Unique tournament name |
| `game` | Enum | `VALORANT` \| `BGMI` \| `FREE_FIRE` |
| `mode` | Enum | `SOLO` \| `DUO` \| `SQUAD` \| `5V5` |
| `format` | Enum | `SINGLE_ELIMINATION` \| `DOUBLE_ELIMINATION` |
| `organizer` | ObjectId | Reference to User (HOST) |
| `registeredTeams` | [ObjectId] | Registered Team references |
| `maxTeams` | Number | Max allowed teams |
| `isPaid` | Boolean | Paid tournament flag |
| `entryFee` / `prizePool` | Number | In INR |
| `status` | Enum | Full lifecycle enum |
| `bracketGenerated` | Boolean | Bracket created flag |
| `winner` | ObjectId | Winning team |

### Team
| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Unique, 3–30 chars |
| `logo` | String | Cloudinary URL |
| `captain` | ObjectId | Reference to User |
| `members` | [ObjectId] | Team members (max 5) |

### Match
| Field | Type | Description |
|-------|------|-------------|
| `tournament` | ObjectId | Parent tournament |
| `round` / `matchNumber` | Number | Bracket position |
| `teamA` / `teamB` | ObjectId | Competing teams |
| `winner` | ObjectId | Winning team |
| `scoreA` / `scoreB` | Number | Match scores |
| `status` | Enum | `PENDING → READY → LIVE → COMPLETED` |
| `nextMatch` | ObjectId | Bracket propagation |

### Other Models
- **Achievement** — user, code, unlockedAt
- **Notification** — user, title, message, type, link, read
- **Payment** — user, tournament, team, amount, Razorpay IDs, status
- **Invitation** — from, to, team, status, expiresAt
- **ChatMessage / TeamMessage** — sender, content, team reference

---

## ⚡ Real-Time Events (Socket.IO)

### Client → Server
| Event | Payload | Description |
|-------|---------|-------------|
| `join` | `userId` | Join personal notification room |
| `join-team` | `teamId` | Join team chat room |
| `leave-team` | `teamId` | Leave team chat room |

### Server → Client
| Event | Description |
|-------|-------------|
| `teamUpdated` | Team data changed |
| `tournamentUpdated` | Tournament list/status changed |
| `bracketUpdated` | Match result or bracket changed |
| `team-message` | New team chat message |

---

## 🔐 Authentication Flow

```
Register → Email Verification → Login → JWT (Access + Refresh)
```

1. **Register** → credentials saved → verification email sent
2. **Verify Email** → `emailVerified = true`
3. **Login** → `accessToken` (15m) & `refreshToken` (7d) set as httpOnly cookies
4. **Protected Routes** → `verifyJWT` middleware validates access token
5. **Token Refresh** → `/api/auth/refresh-token` → new access token issued
6. **Google OAuth** → Google ID token verified server-side → same JWT flow

---

## 🌐 Third-Party Integrations

| Service | Usage |
|---------|-------|
| **Henrik Dev API** | Valorant account verification (PUUID, rank, MMR, card, title) |
| **Cloudinary** | Image storage (avatars, team logos, tournament banners) |
| **Razorpay** | Payment gateway for paid tournament entry fees |
| **Google OAuth 2.0** | Social login |
| **Gmail / SMTP** | Transactional emails (verification, password reset) |

---

## 🚢 Deployment

### Backend
1. Set all environment variables in your platform (Railway, Render, Fly.io, etc.)
2. Set `CLIENT_URL` to your production frontend URL
3. Start command: `npm start`

### Frontend
1. Set `VITE_API_URL` and `VITE_SERVER_URL` to production backend URL
2. Build command: `npm run build`
3. Output directory: `dist`

### Pre-Deployment Checklist
- [ ] Strong, unique `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`
- [ ] MongoDB Atlas cluster configured
- [ ] Cloudinary production settings
- [ ] Razorpay live keys (for production)
- [ ] Google OAuth authorized origins updated
- [ ] `.env` files NOT committed to Git

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ for the esports community</p>
  <p><strong>GameForge</strong> — Where Champions Are Forged 🏆</p>
</div>
