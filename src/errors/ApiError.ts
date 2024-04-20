/**
 * Represents a structured way to encapsulate information about an API error.
 * This class extends the native JavaScript Error and adds a status code and a flag
 * to indicate whether the error is operational (expected) or not.
 */
export class ApiError extends Error {
    // HTTP status code that will be sent to the client when the error is thrown.
    public readonly statusCode: number;

    // Boolean flag to indicate whether the error is operational or a programming error.
    // Operational errors are part of the normal functioning of the application
    // (e.g., invalid user input or requesting non-existent resources).
    public readonly isOperational: boolean;

    /**
     * Creates an instance of ApiError.
     * @param {number} statusCode - HTTP status code associated with the error.
     * @param {string} message - Error message that describes the error.
     * @param {boolean} isOperational - Optional. True if the error is operational, false otherwise.
     *                                  Defaults to true, indicating most errors are expected to be operational.
     */
    constructor(statusCode: number, message: string, isOperational: boolean = true) {
        super(message); // Calls the constructor of the base Error class with the message.

        // Ensures the instance of ApiError is treated as a subclass of Error within inheritance chains.
        Object.setPrototypeOf(this, new.target.prototype);

        // Assign the status code and operational flag to the instance.
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // Captures a stack trace for where the error was constructed, excluding the constructor call from it.
        Error.captureStackTrace(this);
    }
}
