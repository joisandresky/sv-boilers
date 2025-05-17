import { eq } from "drizzle-orm";
import { db } from "../db";
import { clients } from "../db/schemas";
import type { Client } from "$lib/types/client";

export async function getClientByUserId(userId: string): Promise<Client | null> {
    // TODO: add caching
    const client = await db.select().from(clients).where(eq(clients.ownerUserId, userId)).limit(1);

    if (client.length === 0) {
        return null;
    }

    return client[0] as Client;
}

export async function createClient(client: Client): Promise<Client | null> {
    const newClient = await db.insert(clients).values(client).returning();

    if (newClient.length === 0) {
        console.error('Failed to create client');
        return null;
    }

    return newClient[0] as Client;
}

export async function updateClient(clientId: string, client: Client): Promise<Client | null> {
    const updatedClient = await db.update(clients).set(client).where(eq(clients.id, clientId)).returning();

    if (updatedClient.length === 0) {
        console.error('Failed to update client');
        return null;
    }

    return updatedClient[0] as Client;
}