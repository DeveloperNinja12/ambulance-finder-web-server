import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../common/constants.js';
import { ApiResponse } from '../../types/api-response.js';
import { DTOs } from '../../types/dtos.js';
import { ValidationErrors } from './validation-errors.js';

export function validateAddDoctor(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    const body = req.body as Partial<DTOs.AddDoctorRequest>;

    const errors: string[] = [];

    if (!body.doctorName || typeof body.doctorName !== 'string' || body.doctorName.trim().length === 0) {
        errors.push(ValidationErrors.doctor.doctorName);
    }

    if (!body.designation || typeof body.designation !== 'string' || body.designation.trim().length === 0) {
        errors.push(ValidationErrors.doctor.designation);
    }

    if (!body.location || typeof body.location !== 'string' || body.location.trim().length === 0) {
        errors.push(ValidationErrors.doctor.location);
    }

    if (!body.careerObject || typeof body.careerObject !== 'string' || body.careerObject.trim().length === 0) {
        errors.push(ValidationErrors.doctor.careerObject);
    }

    if (!Array.isArray(body.qualifications) || body.qualifications.length === 0) {
        errors.push(ValidationErrors.doctor.qualificationsRequired);
    } else {
        const invalidQual = body.qualifications.some(q => typeof q !== 'string' || q.trim().length === 0);
        if (invalidQual) {
            errors.push(ValidationErrors.doctor.qualificationsInvalid);
        }
    }

    if (!body.experience || typeof body.experience !== 'string' || body.experience.trim().length === 0) {
        errors.push(ValidationErrors.doctor.experience);
    }

    if (typeof body.fees !== 'number' || body.fees < 0 || !Number.isFinite(body.fees)) {
        errors.push(ValidationErrors.doctor.fees);
    }

    if (!body.availability || typeof body.availability !== 'string' || body.availability.trim().length === 0) {
        errors.push(ValidationErrors.doctor.availability);
    }

    if (!Array.isArray(body.languages) || body.languages.length === 0) {
        errors.push(ValidationErrors.doctor.languagesRequired);
    } else {
        const invalidLang = body.languages.some(l => typeof l !== 'string' || l.trim().length === 0);
        if (invalidLang) {
            errors.push(ValidationErrors.doctor.languagesInvalid);
        }
    }

    if (!body.email || typeof body.email !== 'string' || body.email.trim().length === 0) {
        errors.push(ValidationErrors.doctor.emailRequired);
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email.trim())) {
            errors.push(ValidationErrors.doctor.emailInvalid);
        }
    }

    if (errors.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: errors.join('; '),
        });
    }

    const sanitized: DTOs.AddDoctorRequest = {
        doctorName: body.doctorName!.trim(),
        designation: body.designation!.trim(),
        location: body.location!.trim(),
        careerObject: body.careerObject!.trim(),
        qualifications: body.qualifications!.map(q => q.trim()),
        experience: body.experience!.trim(),
        fees: body.fees!,
        availability: body.availability!.trim(),
        languages: body.languages!.map(l => l.trim()),
        email: body.email!.trim().toLowerCase(),
    };

    (req as any).sanitizedData = sanitized;
    next();
}

