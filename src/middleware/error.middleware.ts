/** 
 * Error handling middleware for Express.js applications.
 * Provides a centralized way to handle errors and send appropriate responses.
 * Includes a custom HttpError class for consistent error representation.
 * @module error.middleware
 * @example
 * import { errorMiddleware, HttpError, notFoundMiddleware } from './middleware/error.middleware';
 * 
 * // Usage in app.ts
 * app.use(notFoundMiddleware);
 * app.use(errorMiddleware);
 * */  

import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
    statusCode?: number;
    status?: string;
}

export const errorMiddleware = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    res.status(statusCode).json({
        status,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export class HttpError extends Error {
    statusCode: number;
    status: string;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

export const notFoundMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    next(new HttpError(`Cannot find ${req.originalUrl} on this server`, 404));
};