CREATE TABLE "clients" (
	"id" text PRIMARY KEY NOT NULL,
	"company_name" text NOT NULL,
	"email" text NOT NULL,
	"company_size" varchar(20) NOT NULL,
	"industry" text NOT NULL,
	"phone" varchar(50),
	"website" text,
	"slug" text NOT NULL,
	"owner_user_id" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "clients_slug_unique" UNIQUE("slug")
);
