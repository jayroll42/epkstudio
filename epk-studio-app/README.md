# EPK Studio: installable app

This folder is the complete EPK Studio app. Put it online once and anyone can install it on iPhone, Android, Mac or Windows. After the first visit it works without internet.

## 1. Put it online (about 5 minutes, free)

Installable apps must be served from a secure (https) website. Pick one:

**Netlify (easiest)**
1. Go to app.netlify.com/drop and sign in with a free account, so the site stays up.
2. Drag this whole folder onto the page.
3. You get a link like `https://something.netlify.app`. Rename it in Site settings if you like, for example `epkstudio.netlify.app`.

**GitHub Pages**
1. Create a free repository and upload everything in this folder.
2. In the repository, open Settings > Pages and set Source to the `main` branch.
3. Your link is `https://<your-username>.github.io/<repository-name>/`.

To update the app later, upload the new folder the same way. Open copies update themselves the next time they go online.

## 2. Install it

| Device | How |
|---|---|
| iPhone / iPad | Open the link in **Safari**, tap Share, then **Add to Home Screen**. |
| Android | Open the link in **Chrome**, tap **Install app** in the app or "Install" in Chrome's menu. |
| Mac | Open the link in **Chrome or Edge** and click the install icon in the address bar. In Safari (macOS Sonoma or later): File > Add to Dock. |
| Windows | Open the link in **Edge or Chrome** and click the install icon in the address bar. |

Open the app once while online so it can save everything it needs for offline use.

## 3. What works where

| Feature | iPhone | Android | Mac / Windows (Chrome, Edge) |
|---|---|---|---|
| Works offline | Yes | Yes | Yes |
| Songs and snippets kept between visits | Yes | Yes | Yes |
| Send with the share sheet (AirDrop, Quick Share, Messages) | Yes | Yes | Windows: yes. Mac: Safari only |
| Save a real `.hitmeup` file | Yes | Yes | Yes |
| Double-click a `.hitmeup` file to open it | No | No | Yes |
| Share a `.hitmeup` or song from another app into EPK Studio | No | Yes | No |
| NFC phone-to-phone | No | No | No |
| Artist lookup and bio writer | Use the claude.ai version for now | | |

NFC handoff and opening files on phones come with the native apps (the next step). Until then, write your EPK Studio or Hit Me Up link to an NFC sticker, or show the QR code.

## What's inside

- `index.html`: the app
- `manifest.webmanifest`: name, icons, and the file types it opens
- `sw.js`: offline support
- `icons/`: home-screen icons
- `_headers`, `.nojekyll`: hosting settings for Netlify and GitHub Pages
