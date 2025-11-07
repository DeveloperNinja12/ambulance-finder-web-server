import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../common/constants.js';
import { ApiResponse } from '../../types/api-response.js';
import { DTOs } from '../../types/dtos.js';
import { ValidationErrors } from './validation-errors.js';

export function validateDeleteDoctor(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    const body = req.body as Partial<DTOs.DeleteDoctorRequest>;

    if (!body.id || typeof body.id !== 'string' || body.id.trim().length === 0) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: ValidationErrors.doctor.idRequired,
        });
    }

    (req as any).deleteId = body.id.trim();
    next();
}

