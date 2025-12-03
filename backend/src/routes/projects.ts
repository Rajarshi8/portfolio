import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Project } from '../models/index.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { fallbackProjects } from '../data/fallback.js';

const router = Router();

/**
 * GET /api/projects
 * Returns projects list with optional filtering
 */
router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const { featured, limit, page = 1 } = req.query;

        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            let projects = [...fallbackProjects];
            if (featured === 'true') {
                projects = projects.filter(p => p.featured);
            }
            return res.json({
                success: true,
                data: {
                    projects,
                    pagination: {
                        page: 1,
                        limit: projects.length,
                        total: projects.length,
                        pages: 1,
                    },
                },
            });
        }

        const query: Record<string, unknown> = {};
        if (featured === 'true') {
            query.featured = true;
        }

        const pageNum = parseInt(page as string) || 1;
        const limitNum = parseInt(limit as string) || 10;
        const skip = (pageNum - 1) * limitNum;

        const [projects, total] = await Promise.all([
            Project.find(query)
                .sort({ order: 1, date: -1 })
                .skip(skip)
                .limit(limitNum)
                .lean(),
            Project.countDocuments(query),
        ]);

        return res.json({
            success: true,
            data: {
                projects,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total,
                    pages: Math.ceil(total / limitNum),
                },
            },
        });
    })
);

/**
 * GET /api/projects/:id
 * Returns single project details by ID or slug
 */
router.get(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            const project = fallbackProjects.find(p => p._id === id || p.slug === id);
            if (!project) {
                throw createError('Project not found', 404);
            }
            return res.json({
                success: true,
                data: project,
            });
        }

        // Try to find by ID first, then by slug
        let project = null;

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            project = await Project.findById(id).lean();
        }

        if (!project) {
            project = await Project.findOne({ slug: id }).lean();
        }

        if (!project) {
            throw createError('Project not found', 404);
        }

        return res.json({
            success: true,
            data: project,
        });
    })
);

export default router;
