SCREENWRITER - NO EDGE DESKTOP APP

This is the proper desktop app version using Electron.
It does NOT use Microsoft Edge app mode.
It opens as its own Windows desktop application.

Included:
- app/ editor files
- main.js Electron desktop window
- preload.js safe file bridge
- package.json installer build settings
- run-windows.bat
- build-installer-windows.bat
- build-portable-windows.bat

Important truth:
A warning-free public EXE needs code signing.
Without a trusted code-signing certificate, Windows/Chrome may show a warning for any installer EXE.
That warning is about unknown publisher reputation, not because this project uses Edge.

For development:
1. Install Node.js LTS.
2. Extract this folder.
3. Double-click run-windows.bat.

For installer build:
1. Double-click build-installer-windows.bat.
2. Open dist/.
3. You will get Screenwriter Setup.exe.

For portable EXE:
1. Double-click build-portable-windows.bat.
2. Open dist/.

For proper public release:
1. Buy/use a trusted Windows code-signing certificate.
2. Sign the installer.
3. Distribute that signed EXE.

End users do NOT need Node.js after you distribute the built installer/portable app.
