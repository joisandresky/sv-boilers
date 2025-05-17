import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateAvatarInitials(name: string): string {
	// Split the name by spaces to get an array of words
	const nameParts = name.trim().split(' ');

	// Extract the first letter of the first name
	const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : '';

	// Extract the first letter of the last name (if it exists)
	const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0].toUpperCase() : '';

	// Combine the initials
	return firstInitial + lastInitial;
}

export function renderCurrency(amount: number, currency: string): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency
	}).format(amount);
}

export const companySizeOptions = [
	'1-10 employees',
	'11-50 employees',
	'51-200 employees',
	'201-500 employees',
	'500+ employees'
] as const;

export const industryOptions = [
	'SaaS',
	'E-commerce',
	'FinTech',
	'Healthcare',
	'Education',
	'Other'
] as const;