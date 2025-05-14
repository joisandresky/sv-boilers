import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const client = pgTable('client', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
})