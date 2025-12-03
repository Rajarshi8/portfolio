import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Site } from '../models/index.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { fallbackSite } from '../data/fallback.js';

const router = Router();

/**
 * GET /api/site
 * Returns site-wide data (hero text, social links, theme defaults)
 */
router.get(
    '/',
    asyncHandler(async (_req: Request, res: Response) => {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            return res.json({
                success: true,
                data: fallbackSite,
            });
        }

        // Find the site settings or create default
        let site = await Site.findOne();

        if (!site) {
            site = await Site.create({
                heroTitle: "Hey, I'm Rajarshi",
                heroSubtitle: 'Full Stack Developer',
                heroDescription: 'Building scalable web applications and solving complex problems.',
                email: 'bhowmickrajarshi38@gmail.com',
                location: 'West Bengal, India',
                socialLinks: [
                    { platform: 'github', url: 'https://github.com/Rajarshi8', icon: 'github' },
                    { platform: 'linkedin', url: 'https://linkedin.com/in/rajarshi-bhowmik-4419212b8', icon: 'linkedin' },
                    { platform: 'twitter', url: 'https://x.com/Rajo_7811', icon: 'twitter' },
                ],
                skills: [
                    'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB',
                    'HTML', 'CSS', 'JavaScript', 'Python', 'PHP', 'Bootstrap', 'Tailwind CSS'
                ],
            });
        }

        return res.json({
            success: true,
            data: site,
        });
    })
);

export default router;
