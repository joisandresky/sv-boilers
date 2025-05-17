import { z } from 'zod';

const companySizeEnum = [
	'1-10 employees',
	'11-50 employees',
	'51-200 employees',
	'201-500 employees',
	'500+ employees'
] as const;

const industryEnum = ['SaaS', 'E-commerce', 'FinTech', 'Healthcare', 'Education', 'Other'] as const;

export const clientFormSchema = z.object({
	companyName: z.string().min(2, 'Company name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	companySize: z.enum(companySizeEnum, {
		required_error: 'Please select your company size'
	}),
	industry: z.enum(industryEnum, {
		required_error: 'Please select your industry'
	}),
	phone: z.string().optional(),
	website: z.string().url('Please enter a valid URL').optional().nullish(),
	avatar: z.any().optional(), // File upload will be handled separately from form validation
	// slug: z.string(),
});

export type ClientFormSchema = typeof clientFormSchema;
