import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../common/constants.js';
import { ApiResponse } from '../../types/api-response.js';
import { DTOs } from '../../types/dtos.js';
import { ValidationErrors } from './validation-errors.js';

export function validateAddAmbulance(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    const body = req.body as Partial<DTOs.AddAmbulanceRequest>;

    const errors: string[] = [];

    if (!body.vehicleNumber || typeof body.vehicleNumber !== 'string' || body.vehicleNumber.trim().length === 0) {
        errors.push(ValidationErrors.ambulance.vehicleNumber);
    }

    if (!body.vehicleType || typeof body.vehicleType !== 'string' || body.vehicleType.trim().length === 0) {
        errors.push(ValidationErrors.ambulance.vehicleType);
    }

    if (!body.vehicleModel || typeof body.vehicleModel !== 'string' || body.vehicleModel.trim().length === 0) {
        errors.push(ValidationErrors.ambulance.vehicleModel);
    }

    if (typeof body.vehicleYear !== 'number' || !Number.isInteger(body.vehicleYear) || body.vehicleYear < 1900 || body.vehicleYear > new Date().getFullYear() + 1) {
        errors.push(ValidationErrors.ambulance.vehicleYear);
    }

    if (!body.vehicleColor || typeof body.vehicleColor !== 'string' || body.vehicleColor.trim().length === 0) {
        errors.push(ValidationErrors.ambulance.vehicleColor);
    }

    if (!body.vehicleAssignedDriver || typeof body.vehicleAssignedDriver !== 'string' || body.vehicleAssignedDriver.trim().length === 0) {
        errors.push(ValidationErrors.ambulance.vehicleAssignedDriver);
    }

    if (!body.vehicleLocation || typeof body.vehicleLocation !== 'string' || body.vehicleLocation.trim().length === 0) {
        errors.push(ValidationErrors.ambulance.vehicleLocation);
    }

    if (!body.vehicleContactNumber || typeof body.vehicleContactNumber !== 'string' || body.vehicleContactNumber.trim().length === 0) {
        errors.push(ValidationErrors.ambulance.vehicleContactNumberRequired);
    } else {
        const phoneRegex = /^\+?[\d\s-()]+$/;
        if (!phoneRegex.test(body.vehicleContactNumber.trim())) {
            errors.push(ValidationErrors.ambulance.vehicleContactNumberInvalid);
        }
    }

    if (!body.vehicleHospital || typeof body.vehicleHospital !== 'string' || body.vehicleHospital.trim().length === 0) {
        errors.push(ValidationErrors.ambulance.vehicleHospital);
    }

    if (errors.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: errors.join('; '),
        });
    }

    const sanitized: DTOs.AddAmbulanceRequest = {
        vehicleNumber: body.vehicleNumber!.trim(),
        vehicleType: body.vehicleType!.trim(),
        vehicleModel: body.vehicleModel!.trim(),
        vehicleYear: body.vehicleYear!,
        vehicleColor: body.vehicleColor!.trim(),
        vehicleAssignedDriver: body.vehicleAssignedDriver!.trim(),
        vehicleLocation: body.vehicleLocation!.trim(),
        vehicleContactNumber: body.vehicleContactNumber!.trim(),
        vehicleHospital: body.vehicleHospital!.trim(),
    };

    (req as any).sanitizedData = sanitized;
    next();
}

