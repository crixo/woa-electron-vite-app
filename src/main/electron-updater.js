const {app, dialog} = require('electron')
const log = require('electron-log')
const {autoUpdater} = require("electron-updater")
const { exec } = require('child_process')
const path = require('path')

//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

autoUpdater.autoDownload = false // default is true

function sendStatusToWindow(text) {
  log.info(text);
  //win.webContents.send('message', text);
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
  //Prompt user to start download
  dialog.showMessageBox({
    type: 'info',
    title: 'Update avaialble',
    message: 'A new version of WOA is available. Do you want to udpate now? If no, you will be asked at next lanch of the app',
    buttons: ['Update', 'No']
  }).then(res => {
    let buttonIndex = res.response
    if(buttonIndex === 0) autoUpdater.downloadUpdate()
  })
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded')
  const appBundlePath = path.dirname(app.getPath('exe'))
  sendStatusToWindow(`Updating ${appBundlePath}`)
  // Prompt the user to install update
  dialog.showMessageBox({
    type: 'info',
    title: 'Update downloaded ready to install',
    message: 'Install and restart the app now?',
    buttons: ['Yes', 'Later']
  }).then(res => {
    let buttonIndex = res.response
    if(buttonIndex === 0) {
      // Remove quarantine flag
      sendStatusToWindow(`removing quarantine flag for ${appBundlePath}`)
      exec(`xattr -d com.apple.quarantine "${appBundlePath}"`, (error) => {
        if (error) {
          console.error('Failed to remove quarantine:', error)
        } else {
          console.log('Quarantine flag removed successfully.')
          autoUpdater.quitAndInstall();
        }
      })

      // Proceed with update installation
      autoUpdater.quitAndInstall();
    }
  })  
});


//-------------------------------------------------------------------
// Auto updates - Option 1 - Simplest version
//
// This will immediately download an update, then install when the
// app quits.
//-------------------------------------------------------------------
app.on('ready', function()  {
  log.info('Checkin for updates...');
  autoUpdater.checkForUpdatesAndNotify();
});

//-------------------------------------------------------------------
// Auto updates - Option 2 - More control
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//
// The app doesn't need to listen to any events except `update-downloaded`
//
// Uncomment any of the below events to listen for them.  Also,
// look in the previous section to see them being used.
//-------------------------------------------------------------------
// app.on('ready', function()  {
//   autoUpdater.checkForUpdates();
// });
// autoUpdater.on('checking-for-update', () => {
// })
// autoUpdater.on('update-available', (info) => {
// })
// autoUpdater.on('update-not-available', (info) => {
// })
// autoUpdater.on('error', (err) => {
// })
// autoUpdater.on('download-progress', (progressObj) => {
// })
// autoUpdater.on('update-downloaded', (info) => {
//   autoUpdater.quitAndInstall();  
// })