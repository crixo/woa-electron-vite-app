# woa-electron-vite-app

An Electron application with React

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## My Project Setup

- [Create project scaffolding](https://electron-vite.org/guide/) 

- Install better-sqlite3

- [Rebuild better-sqlite3 agianst current Node](https://dev.to/arindam1997007/a-step-by-step-guide-to-integrating-better-sqlite3-with-electron-js-app-using-create-react-app-3k16)
```
npm install better-sqlite3
npm install --save-dev electron-rebuild
```
After the installation is completed, add this to your package.json
```
{   
    ...
    "scripts": {
        ...             
        "rebuild": "electron-rebuild -f -w better-sqlite3",
    }
}
```

- Init Git Repo
```
git init
```

- Add following dependencies
```
npm install electron-log
npm install --save-dev tailwindcss @tailwindcss/vite
npm install --save-dev react-router-dom
npm install --save-dev react-toastify
```

- Configure [Tailwindcss](https://tailwindcss.com/docs/installation/using-vite) in electron.vite.config.mjs

