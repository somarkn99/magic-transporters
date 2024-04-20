import { ApiError } from './ApiError';

/**
 * Represents an error related to database operations.
 * This class extends ApiError, automatically setting the HTTP status code to 500.
 * It is used specifically to handle exceptions that occur during database interactions.
 */
export class DatabaseError extends ApiError {
    /**
     * Creates an instance of DatabaseError.
     * @param {string} message - Error message that describes the database error.
     */
    constructor(message: string) {
        super(500, message); // Calls the ApiError constructor with a 500 status code.
    }
}
