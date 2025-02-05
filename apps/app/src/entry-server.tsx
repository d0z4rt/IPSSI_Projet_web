// @refresh reload
import { StartServer, createHandler } from '@solidjs/start/server'

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="fr">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#13131b" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          {assets}
        </head>
        {/* This style is to prevent the flashbang effect when reloading the page at 1am */}
        <body style="background-color: #13131b;">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
))
