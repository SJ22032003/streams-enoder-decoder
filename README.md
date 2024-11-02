# Encrypt-Decrypt

A Node.js project that demonstrates advanced encryption and decryption using streams. The project implements a simple encryption logic that increments each byte by 1 and a corresponding decryption that decrements each byte.

## Project Structure
- **`app.ts`** - Main application file containing encryption/decryption logic
- **`to_know.txt`** - Input file for encryption
- **`encrypt.txt`** - Encrypted output file
- **`decrypt.txt`** - Decrypted output file
- **`package.json`** - Project configuration and dependencies
- **`tsconfig.json`** - TypeScript configuration

## Features
- **Stream-based processing** for memory efficiency
- **Progress tracking** during encryption
- **Asynchronous file handling**
- **TypeScript implementation**

## Implementation
The project uses two main classes:

### `Encrypt`
- Extends the Node.js Transform stream.
- Encrypts data by incrementing each byte by 1.
- Tracks and displays encryption progress.

### `Decrypt`
- Extends the Node.js Transform stream.
- Decrypts data by decrementing each byte by 1.

## Installation
- Make sure you have Node.js (v22.6.0) installed.
```bash
npm install
```
## Usage
- Go to the code and change the input file name in the `to_know.txt` variable.
- Uncomment the `encode` function call in the `app.ts` file to encrypt the file.
- Run the application.
```bash
npm start
```
Vice versa, to decrypt the file, uncomment the `decode` function call in the `app.ts` file and run the application.

## Requirements
- Node.js version: v22.6.0 (specified in .nvmrc)
- TypeScript
