import log from 'electron-log';

export function configureLogging(config){
    log.transports.file.maxSize = 1024 * 1024; // Limit file size if needed (1MB)
    log.transports.console.level = 'silly'; // Set log level for console
    log.transports.file.level = 'info'; // Logs only warnings, errors, and higher severity messages
    log.transports.file.resolvePathFn = () => {
        return config.logPath;
    };
    //console.log = log.log;
    // Configure electron-log https://www.npmjs.com/package/electron-log
    //~/Library/Logs/{app name}/main.log
    // log.transports.file.resolvePathFn = () => {
    //     const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD format
    //     return path.join(app.getAppPath(), 'logs', `${today}.log`);
    //     //return path.join("~", 'logs', `${today}.log`);
    // };
}


log.info('Logging configured');