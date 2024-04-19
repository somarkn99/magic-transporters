import { ApiError } from './ApiError';

export class DatabaseError extends ApiError {
    constructor(message: string) {
        super(500, message);
    }
}
