import { NextFunction, Request, Response } from 'express';
import { HttpStatus, Messages } from '../../common/constants.js';
import { ApiResponse } from '../../types/api-response.js';

export function validatePagination(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    const page = req.query.page !== undefined ? Number(req.query.page) : 1;
    const limit = req.query.limit !== undefined ? Number(req.query.limit) : 10;

    const isValidNumber = (n: unknown) => Number.isInteger(n as number) && (n as number) > 0;

    if (!isValidNumber(page) || !isValidNumber(limit)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: Messages.INVALID_PAGINATION,
        });
    }

    // attach parsed values for downstream handlers
    (req as any).pagination = { page, limit };
    next();
}


