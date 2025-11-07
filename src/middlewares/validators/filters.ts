import { NextFunction, Request, Response } from 'express';
import { HttpStatus, Messages } from '../../common/constants.js';
import { ApiResponse } from '../../types/api-response.js';
import { Filters } from '../../types/filters.js';

export function validateFilters(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    const { location } = (req.body ?? {}) as Partial<Filters.LocationFilter>;

    if (location !== undefined && typeof location !== 'string') {
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Invalid filter: location must be a string.',
        });
    }

    const normalized: Filters.LocationFilter = {};
    if (typeof location === 'string') {
        const trimmed = location.trim();
        if (trimmed.length > 0) {
            normalized.location = trimmed;
        }
    }

    (req as any).filters = normalized;
    next();
}


