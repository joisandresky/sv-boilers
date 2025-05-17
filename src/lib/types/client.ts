import type { clients } from "$lib/server/db/schemas";

export type Client = typeof clients.$inferSelect;