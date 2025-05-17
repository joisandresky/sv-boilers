import { pgTable, varchar, boolean, timestamp, text } from 'drizzle-orm/pg-core';

export const clients = pgTable('clients', {
	id: text('id').primaryKey(),
	companyName: text('company_name').notNull(),
	email: text('email').notNull(),
	companySize: varchar('company_size', { length: 20 }).notNull(),
	industry: text('industry').notNull(),
	phone: varchar('phone', { length: 50 }),
	website: text('website'),
	slug: text('slug').notNull().unique(),
	ownerUserId: text('owner_user_id').notNull(),
	isActive: boolean('is_active').notNull().default(true),
	avatar: text('avatar'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
});
