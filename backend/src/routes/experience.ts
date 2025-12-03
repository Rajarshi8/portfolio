import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Experience } from '../models/index.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { fallbackExperience } from '../data/fallback.js';

const router = Router();

/**
 * GET /api/experience
 * Returns timeline/experience items with optional type filtering
 */
router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const { type } = req.query;

        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            let experiences = [...fallbackExperience];
            if (type && ['work', 'education', 'achievement', 'hackathon'].includes(type as string)) {
                experiences = experiences.filter(e => e.type === type);
            }
            const grouped = {
                work: fallbackExperience.filter(e => e.type === 'work'),
                education: fallbackExperience.filter(e => e.type === 'education'),
                achievements: fallbackExperience.filter(e => e.type === 'achievement'),
                hackathons: fallbackExperience.filter(e => e.type === 'hackathon'),
            };
            return res.json({
                success: true,
                data: {
                    all: experiences,
                    grouped,
                },
            });
        }

        const query: Record<string, unknown> = {};
        if (type && ['work', 'education', 'achievement'].includes(type as string)) {
            query.type = type;
        }

        const experiences = await Experience.find(query)
            .sort({ order: 1, startDate: -1 })
            .lean();

        // Group by type for convenience
        const grouped = {
            work: experiences.filter(e => e.type === 'work'),
            education: experiences.filter(e => e.type === 'education'),
            achievements: experiences.filter(e => e.type === 'achievement'),
        };

        return res.json({
            success: true,
            data: {
                all: experiences,
                grouped,
            },
        });
    })
);

export default router;
