import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_open_jobs_job_type') THEN
      CREATE TYPE "public"."enum_open_jobs_job_type" AS ENUM('full-time', 'part-time', 'contract', 'remote');
    END IF;
  END $$;

  CREATE TABLE IF NOT EXISTS "open_jobs" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "location" varchar NOT NULL,
    "job_type" "enum_open_jobs_job_type" DEFAULT 'full-time' NOT NULL,
    "short_description" text NOT NULL,
    "content" jsonb NOT NULL,
    "slug" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE UNIQUE INDEX IF NOT EXISTS "open_jobs_slug_idx" ON "open_jobs" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "open_jobs_job_type_idx" ON "open_jobs" USING btree ("job_type");
  CREATE INDEX IF NOT EXISTS "open_jobs_updated_at_idx" ON "open_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "open_jobs_created_at_idx" ON "open_jobs" USING btree ("created_at");

  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'payload_locked_documents_rels'
      AND column_name = 'open_jobs_id'
    ) THEN
      ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "open_jobs_id" integer;
    END IF;
  END $$;

  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_open_jobs_fk'
    ) THEN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_open_jobs_fk"
      FOREIGN KEY ("open_jobs_id") REFERENCES "public"."open_jobs"("id")
      ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_open_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("open_jobs_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "open_jobs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_open_jobs_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_open_jobs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "open_jobs_id";
  DROP TYPE IF EXISTS "public"."enum_open_jobs_job_type";
  `)
}
