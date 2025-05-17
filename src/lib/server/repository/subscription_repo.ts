import type { Subscription } from "$lib/types/subscription";
import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { subscriptions } from "../db/schemas";

export async function createSubscription(subscription: Subscription): Promise<Subscription | null> {
    const sub = await db.insert(subscriptions).values(subscription).returning();

    if (sub.length === 0) {
        return null;
    }

    return sub[0];
}

export async function getSubscriptionByUserId(userId: string): Promise<Subscription | null> {
    const sub = await db.select().from(subscriptions).where(and(eq(subscriptions.user_id, userId), eq(subscriptions.status, 'active'))).limit(1);

    if (sub.length === 0) {
        return null;
    }

    return sub[0];
}

export async function cancelSubscription(subscriptionId: string, status: 'canceled' | 'revoked'): Promise<void> {
    // set end period to 1 day ago
    const now = new Date()
    const end_periode = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    await db.update(subscriptions).set({ status, current_period_end: end_periode }).where(eq(subscriptions.subscription_id, subscriptionId));
}

export async function updateSubscription(subscription: Subscription): Promise<void> {
    await db.update(subscriptions).set(subscription).where(eq(subscriptions.subscription_id, subscription.subscription_id));
}