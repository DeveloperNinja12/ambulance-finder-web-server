import { Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import crypto from 'crypto';
import doctors from '../jsonData/available-doctors-data.json' assert { type: 'json' };
import { HttpStatus, Messages } from '../common/constants.js';
import { ApiResponse } from '../types/api-response.js';
import { Models } from '../types/models.js';
import { DTOs } from '../types/dtos.js';

type Doctor = Models.Doctor;

function generateId(length = 16): string {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function listDoctors(req: Request, res: Response<ApiResponse<{ items: Doctor[] }>>) {
    try {
        await delay(500);

        const { page, limit } = (req as any).pagination ?? { page: 1, limit: 10 };
        const filters = (req as any).filters as { location?: string } | undefined;

        let filtered = doctors as Doctor[];
        if (filters?.location) {
            const q = filters.location.toLowerCase();
            filtered = filtered.filter(d => d.location.toLowerCase().includes(q));
        }

        const totalItems = filtered.length;
        const start = (page - 1) * limit;
        const end = start + limit;
        const items = filtered.slice(start, end);

        if (items.length === 0) {
            return res.status(HttpStatus.NOT_FOUND).json({
                success: false,
                message: Messages.NO_DATA,
                meta: {
                    page,
                    limit,
                    totalItems,
                    totalPages: Math.max(1, Math.ceil(totalItems / limit)),
                },
            });
        }

        return res.status(HttpStatus.OK).json({
            success: true,
            message: Messages.SUCCESS,
            data: { items },
            meta: {
                page,
                limit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / limit)),
            },
        });
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: Messages.SERVER_ERROR,
        });
    }
}

export async function addDoctor(req: Request, res: Response<ApiResponse<{ doctor: Doctor }>>) {
    try {
        const sanitizedData = (req as any).sanitizedData as DTOs.AddDoctorRequest;
        const filePath = resolve(process.cwd(), 'src/jsonData/available-doctors-data.json');
        
        const rawData = readFileSync(filePath, 'utf8');
        const doctorsArray = JSON.parse(rawData) as Doctor[];
        
        const existingIds = new Set(doctorsArray.map(d => d.id));
        let newId = generateId(16);
        while (existingIds.has(newId)) {
            newId = generateId(16);
        }
        
        const newDoctor: Doctor = {
            ...sanitizedData,
            id: newId,
        };
        
        doctorsArray.push(newDoctor);
        
        const jsonData = JSON.stringify(doctorsArray, null, 4) + '\n';
        writeFileSync(filePath, jsonData, 'utf8');
        
        return res.status(HttpStatus.OK).json({
            success: true,
            message: Messages.SUCCESS,
            data: { doctor: newDoctor },
        });
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: Messages.SERVER_ERROR,
        });
    }
}


