https://www.electronforge.io/guides/framework-integration/react

npx create-electron-app@latest client --template=webpack-typescript

https://github.com/electron/forge/issues/2331

new WebpackPlugin({
      devContentSecurityPolicy: `default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;`,

https://www.electronforge.io/config/makers/deb
