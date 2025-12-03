import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { body } from 'express-validator';
import { Contact } from '../models/index.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validate } from '../middleware/validate.js';
import { sendContactEmail } from '../services/email.js';
import { logger } from '../utils/logger.js';

const router = Router();

// Strict rate limit for contact form
const contactRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: parseInt(process.env.CONTACT_RATE_LIMIT_MAX || '5'),
    message: { success: false, error: 'Too many contact requests, please try again later.' },
    keyGenerator: (req) => req.ip || 'unknown',
});

// Validation rules
const contactValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters')
        .escape(),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('subject')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('Subject cannot exceed 200 characters')
        .escape(),
    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ max: 5000 }).withMessage('Message cannot exceed 5000 characters')
        .escape(),
    // Honeypot field - should be empty
    body('website')
        .optional()
        .custom((value) => {
            if (value && value.length > 0) {
                throw new Error('Bot detected');
            }
            return true;
        }),
];

/**
 * POST /api/contact
 * Accepts contact form submission, validates, rate-limits, sends email
 */
router.post(
    '/',
    contactRateLimiter,
    validate(contactValidation),
    asyncHandler(async (req: Request, res: Response) => {
        const { name, email, subject, message } = req.body;

        // Create contact record
        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
        });

        // Try to send email
        let emailSent = false;
        try {
            await sendContactEmail({ name, email, subject, message });
            emailSent = true;
            contact.emailSent = true;
            await contact.save();
        } catch (error) {
            logger.error('Failed to send contact email:', error);
            // Don't fail the request if email fails - message is saved
        }

        res.status(201).json({
            success: true,
            data: {
                message: emailSent
                    ? 'Thank you for your message! I will get back to you soon.'
                    : 'Your message has been received. I will get back to you soon.',
                id: contact._id,
            },
        });
    })
);

export default router;
