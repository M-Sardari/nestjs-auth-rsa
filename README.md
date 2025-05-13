# NestJS JWT Authentication with Access & Refresh Tokens (RSA Public/Private Key)

A simple authentication system built with NestJS, implementing:

- **Access Tokens** signed with a private key and verified with a public key.
- **Refresh Tokens** signed with a private key and containing a `tokenVersion`.
- **Refresh Token Versioning** to invalidate old refresh tokens if needed (like after password change or logging out from all devices).
- **Guards** and **Decorators** to protect private routes.
- **Refresh Token** stored in a **HttpOnly Secure Cookie**.
- **Access Token** stored in frontend memory (or localStorage as a fallback).
- **private.key** and **public.key** files for JWT signing/verification.

---

## 📦 Features:

- User registration
- User login with Access and Refresh tokens
- JWT verification with public key
- Refresh token endpoint to get new access & refresh tokens
- `tokenVersion` handling to invalidate old refresh tokens
- Authentication Guard for protected routes
- Clean, modular project structure

---

## 📂 Project Structure:

```
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt.guard.ts
│   ├── get-user.decorator.ts
│   └── types.ts
├── user/
│   ├── user.entity.ts
│   └── user.repository.ts
├── main.ts
├── app.module.ts
keys/
├── private.key
└── public.key
.env
```

---

## 🔐 Private and Public Key

The `keys/` directory contains:

- `private.key` → Used to sign JWT tokens
- `public.key` → Used to verify JWT tokens

### 📌 Generate RSA keys:

```bash
openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private.key -out public.key
```

---

## 🔑 Refresh Token Versioning

In `user.entity.ts`:

```ts
@Column({ default: 1 })
tokenVersion: number;
```

When generating a refresh token, the user's `tokenVersion` is added to the token payload.

During verification:

- The `tokenVersion` inside the refresh token is compared against the current value in the database.
- If they don’t match → the token is considered invalid.

To invalidate all refresh tokens for a user:

```ts
await this.userRepository.update(userId, {
  tokenVersion: () => 'tokenVersion + 1',
});
```

---

## 📋 Summary:

✔️ JWT authentication with RSA public/private key  
✔️ Refresh token in HttpOnly Secure Cookie  
✔️ Access token in frontend memory (or LocalStorage as fallback)  
✔️ Refresh Token Versioning for invalidating old sessions  
✔️ Auth Guard and GetUser decorator  
✔️ Public and Private routes

---

## 🛠️ Install & Run:

```bash
npm install
npm run start:dev
```

---

## 📌 .env Example:

```
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d
PRIVATE_KEY_PATH=./keys/private.key
PUBLIC_KEY_PATH=./keys/public.key
```

---

## ✌️ Author:

Mohammad — built for clean, secure, and scalable authentication systems ⚡
