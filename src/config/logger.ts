import winston from 'winston';

// Create a Winston logger instance with specific configuration settings
const logger = winston.createLogger({
  level: 'info', // Set the default minimum log level to 'info'
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to each log message
    winston.format.json()       // Format all logs in JSON format
  ),
  transports: [
    // Transport for outputting logs to the console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorize log output for better readability
        winston.format.simple()    // Use a simple format for console output
      )
    }),
    // File transport for logging errors with level 'error' or higher
    new winston.transports.File({ 
      filename: 'error.log',     // Specify the file to store error logs
      level: 'error'             // Set the log level specifically for this file
    }),
    // File transport for logging all logs with the default level 'info' and above
    new winston.transports.File({ 
      filename: 'combined.log'   // Specify the file to store all logs
    })
  ]
});

// Export the logger to use throughout the application
export default logger;
