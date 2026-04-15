# Authentication System Documentation

This document describes the authentication architecture implemented in ForgeFit.

## Overview

The authentication system is built using **JWT (JSON Web Tokens)** with a dual-token strategy: **Access Token** and **Refresh Token**, both managed via secure, HTTP-only cookies.

## Token Strategy

### 1. Access Token
- **Location**: Cookie `access_token`
- **Lifetime**: 15 minutes
- **Purpose**: Used for authorizing API requests. If the cookie is present, the server uses it; otherwise, it fallback to the `Authorization: Bearer <token>` header.

### 2. Refresh Token
- **Location**: Cookie `refresh_token`
- **Lifetime**: 7 days
- **Purpose**: Used to obtain new tokens after the access token expires.
- **Rotation**: Each time a refresh token is used, it is invalidated (revoked), and a new pair of tokens (Access + Refresh) is issued. This provides **Refresh Token Rotation**, an extra layer of security.
- **Persistence**: Stored in the `refresh_tokens` table in the database with a SHA-256 hash.

## Architecture (Auth Module)

The system is isolated in the `src/modules/auth` module, following the DDD/MVC pattern:

### Components
- **AuthenticateUserService**: Validates credentials and generates the initial token set.
- **RefreshTokenService**: Validates the refresh token and implements the rotation logic.
- **AuthController**: Handles HTTP requests (`/auth/login`, `/auth/refresh`, `/auth/logout`).
- **EnsureAuthentication Middleware**: Validates the Access Token on protected routes.

## Sequence Diagrams

### Login Flow
1. User sends email/password to `/auth/login`.
2. Server validates credentials.
3. Server generates Access Token and Refresh Token.
4. Server hashes the Refresh Token and stores it in the DB.
5. Server sends tokens back as `Set-Cookie` headers.

### Refresh Flow
1. Client sends a request to `/auth/refresh` (the `refresh_token` cookie is sent automatically by the browser).
2. Server hashes the received token and lookups it in the DB.
3. Server checks if the token exists, is not revoked, and is within the 7-day window.
4. Server revokes the used token.
5. Server generates a new pair and sends them back as new cookies.

### Protected Route Flow
1. Client makes a request to a protected endpoint (e.g., `GET /users`).
2. Browser automatically sends the `access_token` cookie.
3. `EnsureAuthentication` middleware reads the cookie.
4. If valid, the request proceeds. If invalid/expired, it returns 401.

## Security Features
- **HttpOnly**: Prevents JavaScript from accessing the cookies (mitigates XSS).
- **Secure**: Cookies are only sent over HTTPS (in production).
- **SameSite=Lax**: Protects against CSRF while allowing common cross-site scenarios.
- **Hashing**: Refresh tokens are stored as SHA-256 hashes, so even a DB leak won't immediately compromise active sessions.
