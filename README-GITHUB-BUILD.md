# Screenwriter Desktop - GitHub Actions Build

This is the real no-Edge Electron desktop app project.

It builds a Windows installer using GitHub Actions, so you do not need to build the `.exe` on your own laptop.

## Build steps

1. Create a new GitHub repo.
2. Upload this full folder.
3. Go to **Actions**.
4. Click **Build Windows Installer**.
5. Click **Run workflow**.
6. After it finishes, download **Screenwriter-Windows-Build** from Artifacts.
7. Extract it and run the setup `.exe`.

## Important

This is not Microsoft Edge app mode. It is Electron with bundled Chromium.

For public release, sign the installer. Unsigned installers can still show Unknown Publisher or SmartScreen warnings.
