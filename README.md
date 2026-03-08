# Kairo-template

This repository is a template based on the specifications of the Kairo addon linked below.  
https://github.com/shizuku86/Kairo

After cloning, run the following command to install node_modules:

- pnpm install

After editing the lines ending with # in scripts/properties.ts appropriately and resolving errors,  
execute the following command in the terminal:

- pnpm run build

When this command is executed, the following operations will be performed:

- manifest.json is automatically generated in BP/ and RP/ from the information in properties
- TypeScript files in scripts/ are bundled to JavaScript in BP/scripts via esbuild
- The pack_icon.png at the project root is copied into both BP/ and RP/
- The completed BP/ and RP/ are copied into Minecraft’s development folder

## Requirements

- Node.js (for development and TypeScript build)
- pnpm 10.31.0

> If pnpm is not available, run `corepack enable` and then `corepack prepare pnpm@10.31.0 --activate`.

## Setup && Build

1. Install dependencies:
    ```bash
    pnpm install
    ```
2. Deploy
    ```bash
    pnpm run build
    ```
