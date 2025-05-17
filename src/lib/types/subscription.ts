import type { subscriptions } from "$lib/server/db/schemas";

export type Subscription = typeof subscriptions.$inferSelect;