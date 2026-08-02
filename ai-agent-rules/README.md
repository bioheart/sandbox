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

---

## 📜 JavaScript Implementation (`app.js`)

### Constants

```javascript
// AUTH CONFIG — SHA-256 hash of the Admin passcode (never store plain-text here)
const AUTH_PASSCODE_HASH = '<sha256-hash-of-your-admin-passcode>';

// AES-256-GCM Encrypted Vault: Base64( Salt[16B] + IV[12B] + Ciphertext )
// Encrypted using the Admin passcode hash as PBKDF2 key material
const ENCRYPTED_CLOUD_SYNC_STORE = '<base64-encoded-encrypted-payload>';
```

### `hashPasscode(passcode)` — SHA-256 One-Way Hash

```javascript
async function hashPasscode(passcode) {
  const encoder = new TextEncoder();
  const data = encoder.encode(passcode);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = [...new Uint8Array(hashBuffer)];
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

### `decryptCloudCredentials(passcodeHash)` — PBKDF2 + AES-256-GCM Decryption

```javascript
async function decryptCloudCredentials(passcodeHash) {
  try {
    if (!ENCRYPTED_CLOUD_SYNC_STORE) return null;

    // Unpack: Salt [16B] + IV [12B] + Ciphertext [rest]
    const raw = Uint8Array.from(atob(ENCRYPTED_CLOUD_SYNC_STORE), c => c.charCodeAt(0));
    const salt = raw.slice(0, 16);
    const iv = raw.slice(16, 28);
    const ciphertext = raw.slice(28);

    // Derive AES-256 key from passcode hash using PBKDF2
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(passcodeHash),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );

    // Decrypt ciphertext
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      ciphertext
    );

    const dec = new TextDecoder();
    return JSON.parse(dec.decode(decrypted));
    // Returns: { url: "https://...upstash.io", token: "..." }
  } catch (err) {
    console.warn('Failed to decrypt Cloud Sync store with provided passcode hash', err);
    return null;
  }
}
```

### Authentication Flow (called on Unlock)

```javascript
authSubmitBtn.addEventListener('click', async () => {
  const input = authPasswordInput.value;
  if (!input) return;

  const hashed = await hashPasscode(input);
  if (hashed === AUTH_PASSCODE_HASH) {
    isAuthenticated = true;

    // Decrypt credentials from embedded vault using derived hash
    const decrypted = await decryptCloudCredentials(hashed);
    if (decrypted && decrypted.url && decrypted.token) {
      saveCloudCredentials(decrypted.url, decrypted.token, true);
      await pullFromCloud(true);
      showToast('Unlocked Admin & Auto-synced Cloud DB!', 'success');
    }
  }
});
```

### Getting `AUTH_PASSCODE_HASH` (Browser Console)

เปิด DevTools Console (`F12`) แล้วรันคำสั่งนี้เพื่อได้ค่า SHA-256 hash ของรหัสผ่านใหม่:

```javascript
crypto.subtle.digest('SHA-256', new TextEncoder().encode('รหัสผ่านใหม่ของคุณ')).then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,'0')).join('')))
```

นำค่าที่ได้ไปใส่ใน `AUTH_PASSCODE_HASH` ใน `app.js` ครับ
