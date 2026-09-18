<div align="center">

# Login System

**Minimalist, fluid authentication engineered with Apple design principles, stateless JSON Web Tokens, and MongoDB Atlas.**

SF Pro typography • Glassmorphic materials • Fluid spring physics • Stateless JWT verification • MongoDB Atlas engine

<br />

```
┌────────────────────────────────────────────────────────────────────────────────┐
│    Login System                                                     Sign Out  │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│                        ● Authenticated Session                                 │
│                                                                                │
│                         Welcome back, Andrei.                                  │
│       Your credentials are cryptographically verified with stateless JWTs.     │
│                                                                                │
│   ┌─────────────────────┐  ┌─────────────────────┐  ┌──────────────────────┐   │
│   │ USER PROFILE        │  │ CRYPTOGRAPHIC TOKEN │  │ DATABASE CLUSTER     │   │
│   │ Andrei Geronimo     │  │ HMAC SHA-256        │  │ MongoDB Atlas        │   │
│   │ user@example.com    │  │ 60-Minute Lifespan  │  │ Bcrypt Hashed Pass   │   │
│   └─────────────────────┘  └─────────────────────┘  └──────────────────────┘   │
│                                                                                │
│                     [ Verify Status ]   [ End Session ]                        │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
```

<br />

</div>

## Overview

A lightweight, full-stack authentication system separating client presentation from backend authorization. The interface eliminates visual clutter, favoring tactile feedback, translucent materials, and system-level typography that feels native to modern operating systems.

- **Fluid interaction**: Instant pointer-down press feedback, critically damped spring transitions, and segmented mode toggles.
- **Stateless security**: Cryptographically signed HMAC SHA-256 tokens eliminate database latency on protected routes.
- **Defensive architecture**: Salted bcrypt password hashing paired with isolated cloud database network access.

---

## Three fluid states

<table width="100%">
<tr>
<td width="33%" align="center">
<b>Sign In & Registration</b>
<br /><br />
Segmented controls toggle cleanly between authentication modes without form clutter or layout shifts.
</td>
<td width="33%" align="center">
<b>Token Exchange</b>
<br /><br />
Secure credential validation returns an ephemeral 256-bit token stored strictly in client session storage.
</td>
<td width="33%" align="center">
<b>Hero Dashboard</b>
<br /><br />
A translucent glass navigation bar anchors a spacious hero section detailing real-time user identity.
</td>
</tr>
</table>

---

## Crafted details

<div align="center">

| Authentication Shell | Protected Hero Environment |
| :---: | :---: |
| Single-card auth with Apple segmented control | High-impact hero layout with responsive bento grid |
| *Tactile inputs with recessed specular depth* | *Floating glass navigation with live session indicators* |

</div>

- **Tactile depth**: 1px specular hairline borders, diffused drop shadows, and instantaneous active scale springs (`:active { transform: scale(0.97); }`).
- **Optical typography**: Size-specific tracking with tightened display headers (`-0.035em`) and relaxed body leading (`1.47`).
- **Translucent materials**: Floating glass navigation featuring hardware-accelerated `backdrop-filter` blur and saturation layers.
- **Accessibility defaults**: Complete support for `prefers-reduced-motion` and `prefers-reduced-transparency`.

---

## Quick start

```bash
# Clone repository and install backend dependencies
git clone https://github.com/username/login-system.git && cd login-system/backend && npm install

# Configure environment variables in backend/.env
# MONGODB_URI="your_mongodb_atlas_connection_string"
# JWT_SECRET="your_high_entropy_random_secret"

# Launch backend API service
node server.js
```

---

<div align="center">
<sub>Designed with Apple Human Interface principles. Crafted with Express, Mongoose, and Vanilla JavaScript.</sub>
</div>
