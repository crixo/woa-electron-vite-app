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

### Scaffolding the project
- App scaffolding with [Electron-vite](https://electron-vite.org/guide/)
```
npm create @quick-start/electron@latest
```

- Install [Tailwindcss](https://tailwindcss.com/docs/installation/using-vite)
```
npm install tailwindcss @tailwindcss/vite
```
add tailwindcss plugin into electron.vite.config.mjs
```
...
import tailwindcss from '@tailwindcss/vite'
.....
    plugins: [
      react(),
      tailwindcss(),
    ]
...
```

- Install better-sqlite3 and [Rebuild better-sqlite3 agianst current Node](https://dev.to/arindam1997007/a-step-by-step-guide-to-integrating-better-sqlite3-with-electron-js-app-using-create-react-app-3k16)
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
        "rebuild-sqlite3": "electron-rebuild -f -w better-sqlite3",
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

## Project Run

First initialization from remote repo
```
git clone https://github.com/crixo/woa-electron-vite-app.git
npm install
npm run rebuild-sqlite3
npm run dev
```

## Rebuild project for apecific

- Dowload repo into a specific folder for the target platform e. mac amd 
```
git clone https://github.com/crixo/woa-electron-vite-app.git woa-electron-vite-app-{platform}
```
-- Install dependedencies
```
npm install
```

-- Rebuild dependencies for the specific paltform (not needed - only for native module as next step)
```
npm rebuild --arch=x64 --platform=darwin
```

-- Rebuilds native modules for Electron.
```
npm run rebuild-sqlite3
```

-- Build the Electron App for x64 (AMD/Intel)
```
npm run build:mac-universal
```

- Once built, you can check whether the binary is universal by running:
```
lipo -info dist/mac-universal/woa-electron-vite-app.app/Contents/MacOS/woa-electron-vite-app

```

---


## Note

- [DaisyUI](https://yon.fun/top-tailwind-component-libs/)

## Logbook

- Use BrowserRouter works w/ Electron final package (win, mac, ..) BrowserRouter does not. BrowserRoute works only in dev mode.

- use 
```
security find-identity -v -p codesigning
```
to find the name of signing certificate and electron-build log for identity value

- Sign app manually after bundle
```
codesign --deep --force --verbose --sign - ./dist/mac-arm64/woa-electron-vite-app.app 
or a self-signed cert generated via keychain
codesign --deep --force --verbose --sign "CrixoDev" ./dist/mac-arm64/woa-electron-vite-app.app 
```

- Verify signing 
```
codesign --verify --verbose /path/to/app.app
```
Verify who signed
```
codesign -dv --verbose=4 /path/to/app.app
```

- Check arch
```
file /path/to/app.app/Contents/MacOS/app-binary
or
lipo -info /path/to/app.app/Contents/MacOS/app-binary
```


- Fix unsigned app
If Gatekeeper will show warnings like “This app cannot be opened because it is from an unidentified developer.”, Users must manually approve the app
```
sudo spctl --add /path/to/YourApp.app 
or 
xattr -d com.apple.quarantine /path/to/YourApp.app
```


- verify the date format used by local app when a date is selected with html datepicker

- dates from (old) DB are stored w/ time as 00:00:00. New app will save it w/o time. Time portion is handled in utils.formatDate while loading the date.

