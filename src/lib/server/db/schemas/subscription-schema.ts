import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const subscriptions = pgTable('subscriptions', {
    id: text('id').primaryKey(),
    user_id: text('user_id').references(() => user.id),
    product_id: text('product_id').notNull(),
    subscription_id: text('subscription_id').notNull(),
    customer_id: text('customer_id').notNull(),
    current_period_end: timestamp('current_period_end'),
    status: text('status').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})