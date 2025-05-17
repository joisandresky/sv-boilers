export const polar_products = [
	{
		productId: 'e92ed658-1e01-45ea-8b61-9045b0c5b77d', // ID of Product from Polar Dashboard
		slug: 'free', // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro,
		name: 'Free',
		price: 0,
		features: [
			'1 service/location',
			'100 feedbacks per month',
			'Basic sentiment analysis',
			'NPS tracking',
			'Unique feedback URLs',
			'Basic survey builder',
			'CSV data import'
		]
	},
	{
		productId: '6e3516f2-4d38-4003-a0ce-9b5793546a7d', // ID of Product from Polar Dashboard
		slug: 'pro', // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
		name: 'Pro',
		price: 19,
		features: [
			'Unlimited services/locations',
			'Unlimited feedbacks',
			'Advanced AI analysis',
			'Custom categories & tags',
			'QR code generation',
			'Advanced survey builder',
			'Bulk CSV import',
			'Priority support'
		]
	}
];
