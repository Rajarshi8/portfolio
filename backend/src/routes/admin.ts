import { Router, Response } from 'express';
import { body } from 'express-validator';
import { Project, Experience, Site, Contact } from '../models/index.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { basicAuth, AuthRequest } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// Apply basic auth to all admin routes
router.use(basicAuth);

/**
 * POST /api/admin/login
 * Verify admin credentials (auth middleware already handles this)
 */
router.post('/login', (req: AuthRequest, res: Response) => {
    res.json({
        success: true,
        data: { message: 'Login successful', isAdmin: req.isAdmin },
    });
});

// ==================== PROJECTS ====================

const projectValidation = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('shortDescription').trim().notEmpty().withMessage('Short description is required'),
    body('tech').isArray({ min: 1 }).withMessage('At least one technology is required'),
];

/**
 * POST /api/admin/projects
 * Create a new project
 */
router.post(
    '/projects',
    validate(projectValidation),
    asyncHandler(async (req: AuthRequest, res: Response) => {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
    })
);

/**
 * PUT /api/admin/projects/:id
 * Update a project
 */
router.put(
    '/projects/:id',
    asyncHandler(async (req: AuthRequest, res: Response) => {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!project) {
            throw createError('Project not found', 404);
        }

        res.json({ success: true, data: project });
    })
);

/**
 * DELETE /api/admin/projects/:id
 * Delete a project
 */
router.delete(
    '/projects/:id',
    asyncHandler(async (req: AuthRequest, res: Response) => {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            throw createError('Project not found', 404);
        }

        res.json({ success: true, data: { message: 'Project deleted successfully' } });
    })
);

// ==================== EXPERIENCE ====================

/**
 * POST /api/admin/experience
 * Create a new experience entry
 */
router.post(
    '/experience',
    asyncHandler(async (req: AuthRequest, res: Response) => {
        const experience = await Experience.create(req.body);
        res.status(201).json({ success: true, data: experience });
    })
);

/**
 * PUT /api/admin/experience/:id
 * Update an experience entry
 */
router.put(
    '/experience/:id',
    asyncHandler(async (req: AuthRequest, res: Response) => {
        const experience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!experience) {
            throw createError('Experience not found', 404);
        }

        res.json({ success: true, data: experience });
    })
);

/**
 * DELETE /api/admin/experience/:id
 * Delete an experience entry
 */
router.delete(
    '/experience/:id',
    asyncHandler(async (req: AuthRequest, res: Response) => {
        const experience = await Experience.findByIdAndDelete(req.params.id);

        if (!experience) {
            throw createError('Experience not found', 404);
        }

        res.json({ success: true, data: { message: 'Experience deleted successfully' } });
    })
);

// ==================== SITE SETTINGS ====================

/**
 * PUT /api/admin/site
 * Update site settings
 */
router.put(
    '/site',
    asyncHandler(async (req: AuthRequest, res: Response) => {
        let site = await Site.findOne();

        if (site) {
            Object.assign(site, req.body);
            await site.save();
        } else {
            site = await Site.create(req.body);
        }

        res.json({ success: true, data: site });
    })
);

// ==================== CONTACTS ====================

/**
 * GET /api/admin/contacts
 * Get all contact submissions
 */
router.get(
    '/contacts',
    asyncHandler(async (_req: AuthRequest, res: Response) => {
        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .lean();

        res.json({ success: true, data: contacts });
    })
);

/**
 * PUT /api/admin/contacts/:id/read
 * Mark a contact as read
 */
router.put(
    '/contacts/:id/read',
    asyncHandler(async (req: AuthRequest, res: Response) => {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { readAt: new Date() },
            { new: true }
        );

        if (!contact) {
            throw createError('Contact not found', 404);
        }

        res.json({ success: true, data: contact });
    })
);

export default router;
