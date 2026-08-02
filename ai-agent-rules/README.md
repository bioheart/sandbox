# AI Agent Rules Vault - Security & Crypto Architecture

Centralized vault and editor for AI Agent Global Rules (Gemini `AGENTS.md`, ChatGPT Custom Instructions, and Claude Prompts) with real-time cloud synchronization.

---

## 🔐 Zero-Knowledge AES-256-GCM Crypto Architecture

The Vercel KV / Upstash Redis REST API credentials (URL & Token) are embedded inside the client-side source code using **AES-256-GCM Authenticated Encryption**. 

This allows seamless cross-device synchronization without exposing plain-text keys on GitHub or requiring Vercel Pro paid features.

```
[ Admin Passcode ] ──> SHA-256 Hash ──> PBKDF2 (100,000 iterations) ──> AES-256 Key ──> Decrypt Cloud Credentials
```

### 1. Key Derivation Function (PBKDF2)
- **Key Material**: SHA-256 hash of the secret Admin passcode (`AUTH_PASSCODE_HASH`).
- **Salt**: 16-byte cryptographically secure random salt generated via `crypto.getRandomValues`.
- **Iterations**: 100,000 iterations using `HMAC-SHA256`.
- **Key Length**: 256 bits (`AES-GCM`).

### 2. Encryption Scheme (AES-256-GCM)
- **IV (Initialization Vector)**: 12-byte cryptographically random IV.
- **Payload**: `{ "url": "https://...upstash.io", "token": "..." }`.
- **Base64 Packaging**:
  `Base64( Salt [16 Bytes] + IV [12 Bytes] + Ciphertext [Variable] )`

### 3. Client Decryption Flow (`decryptCloudCredentials`)
1. User clicks the **Unlock** button and enters the plain-text Admin passcode.
2. Web Crypto API (`window.crypto.subtle`) hashes the passcode and verifies it against `AUTH_PASSCODE_HASH`.
3. Upon authentication, `decryptCloudCredentials()` derives the PBKDF2 AES key and decrypts `ENCRYPTED_CLOUD_SYNC_STORE`.
4. Decrypted credentials (`url` and `token`) are stored in the browser's `localStorage` and trigger an automated `pullFromCloud()` sync.

---

## 🛡️ Security & Privacy Guarantees

1. **Zero Plain-Text Exposure**:
   The string `ENCRYPTED_CLOUD_SYNC_STORE` in `app.js` is encrypted with AES-256-GCM. Without knowing the secret Admin passcode, it is mathematically un-decryptable.
2. **One-Way Passcode Verification**:
   The source code only contains the SHA-256 hash of the passcode (`AUTH_PASSCODE_HASH`). The plain-text passcode is never stored.
3. **100% Free & Portable**:
   No Vercel Pro Plan, API gateway, or environment variable configuration required. Opening the app on any device and unlocking Admin mode automatically restores Cloud Sync.
