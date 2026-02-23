import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_team_position') THEN
        CREATE TYPE "public"."enum_team_position" AS ENUM('members', 'director_sona_pharm', 'director_sona_exim', 'general_director');
      END IF;
    END $$;

    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_open_jobs_job_type') THEN
        CREATE TYPE "public"."enum_open_jobs_job_type" AS ENUM('full-time', 'part-time', 'contract', 'remote');
      END IF;
    END $$;

    CREATE TABLE IF NOT EXISTS "team" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "subtitle" varchar,
      "position" "enum_team_position" DEFAULT 'members' NOT NULL,
      "content" jsonb,
      "image_id" integer NOT NULL,
      "linkidin" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "open_jobs" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "location" varchar NOT NULL,
      "job_type" "enum_open_jobs_job_type" DEFAULT 'full-time' NOT NULL,
      "short_description" varchar NOT NULL,
      "content" jsonb NOT NULL,
      "generate_slug" boolean DEFAULT true,
      "slug" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "team_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "open_jobs_id" integer;

    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'team_image_id_media_id_fk') THEN
        ALTER TABLE "team" ADD CONSTRAINT "team_image_id_media_id_fk"
          FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "team_image_idx" ON "team" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "team_updated_at_idx" ON "team" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "team_created_at_idx" ON "team" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "open_jobs_slug_idx" ON "open_jobs" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "open_jobs_updated_at_idx" ON "open_jobs" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "open_jobs_created_at_idx" ON "open_jobs" USING btree ("created_at");

    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_team_fk') THEN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_fk"
          FOREIGN KEY ("team_id") REFERENCES "public"."team"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_open_jobs_fk') THEN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_open_jobs_fk"
          FOREIGN KEY ("open_jobs_id") REFERENCES "public"."open_jobs"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_team_id_idx" ON "payload_locked_documents_rels" USING btree ("team_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_open_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("open_jobs_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_team_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_open_jobs_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_team_id_idx";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_open_jobs_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "team_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "open_jobs_id";
    DROP TABLE IF EXISTS "team" CASCADE;
    DROP TABLE IF EXISTS "open_jobs" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_team_position";
    DROP TYPE IF EXISTS "public"."enum_open_jobs_job_type";
  `)
}
