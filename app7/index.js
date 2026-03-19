import { init, ml_kem768 } from 'fips-crypto';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

// Initialize the WASM module
await init();

// ============================================================
// Alice generates a key pair
// ============================================================
console.log('=== Post-Quantum Key Exchange (ML-KEM-768, FIPS 203) ===\n');

const { publicKey, secretKey } = await ml_kem768.keygen();
console.log(`Alice's public key:  ${publicKey.length} bytes`);
console.log(`Alice's secret key:  ${secretKey.length} bytes`);

// ============================================================
// Bob encapsulates a shared secret using Alice's public key
// ============================================================
const { ciphertext, sharedSecret: bobSecret } = await ml_kem768.encapsulate(publicKey);
console.log(`\nBob's ciphertext:    ${ciphertext.length} bytes`);
console.log(`Bob's shared secret: ${Buffer.from(bobSecret).toString('hex')}`);

// ============================================================
// Alice decapsulates to recover the same shared secret
// ============================================================
const aliceSecret = await ml_kem768.decapsulate(secretKey, ciphertext);
console.log(`Alice's shared secret: ${Buffer.from(aliceSecret).toString('hex')}`);
console.log(`\nSecrets match: ${Buffer.from(bobSecret).equals(Buffer.from(aliceSecret))}`);

// ============================================================
// Use the shared secret as an AES-256-GCM key to encrypt a message
// ============================================================
const message = 'Hello from the post-quantum world!';
console.log(`\n=== Encrypting with AES-256-GCM ===\n`);
console.log(`Plaintext: "${message}"`);

// Encrypt (Bob -> Alice)
const iv = randomBytes(12);
const cipher = createCipheriv('aes-256-gcm', bobSecret, iv);
const encrypted = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()]);
const authTag = cipher.getAuthTag();

console.log(`Encrypted: ${encrypted.toString('hex')}`);
console.log(`IV: ${iv.toString('hex')}`);
console.log(`Auth tag: ${authTag.toString('hex')}`);

// Decrypt (Alice)
const decipher = createDecipheriv('aes-256-gcm', aliceSecret, iv);
decipher.setAuthTag(authTag);
const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

console.log(`\nDecrypted: "${decrypted.toString('utf8')}"`);
console.log(`\nSuccess! Quantum-safe key exchange + AES-256-GCM encryption.`);
