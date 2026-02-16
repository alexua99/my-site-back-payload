import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$
    BEGIN
      CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "news" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "hero_image_id" integer,
      "content" jsonb,
      "meta_title" varchar,
      "meta_image_id" integer,
      "meta_description" varchar,
      "published_at" timestamp(3) with time zone,
      "generate_slug" boolean DEFAULT true,
      "slug" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" "enum_news_status" DEFAULT 'draft'
    );

    CREATE TABLE IF NOT EXISTS "news_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "categories_id" integer
    );

    CREATE TABLE IF NOT EXISTS "_news_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_title" varchar,
      "version_hero_image_id" integer,
      "version_content" jsonb,
      "version_meta_title" varchar,
      "version_meta_image_id" integer,
      "version_meta_description" varchar,
      "version_published_at" timestamp(3) with time zone,
      "version_generate_slug" boolean DEFAULT true,
      "version_slug" varchar,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__news_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean,
      "autosave" boolean
    );

    CREATE TABLE IF NOT EXISTS "_news_v_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "categories_id" integer
    );

    ALTER TABLE "pages_rels" ADD COLUMN IF NOT EXISTS "news_id" integer;
    ALTER TABLE "_pages_v_rels" ADD COLUMN IF NOT EXISTS "news_id" integer;
    ALTER TABLE "redirects_rels" ADD COLUMN IF NOT EXISTS "news_id" integer;
    ALTER TABLE "search_rels" ADD COLUMN IF NOT EXISTS "news_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "news_id" integer;
    ALTER TABLE "header_rels" ADD COLUMN IF NOT EXISTS "news_id" integer;
    ALTER TABLE "footer_rels" ADD COLUMN IF NOT EXISTS "news_id" integer;

    CREATE UNIQUE INDEX IF NOT EXISTS "news_slug_idx" ON "news" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "news_updated_at_idx" ON "news" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "news_created_at_idx" ON "news" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "news__status_idx" ON "news" USING btree ("_status");
    CREATE INDEX IF NOT EXISTS "news_rels_order_idx" ON "news_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "news_rels_path_idx" ON "news_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "news_rels_categories_id_idx" ON "news_rels" USING btree ("categories_id");
    CREATE INDEX IF NOT EXISTS "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
    CREATE INDEX IF NOT EXISTS "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
    CREATE INDEX IF NOT EXISTS "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
    CREATE INDEX IF NOT EXISTS "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
    CREATE INDEX IF NOT EXISTS "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
    CREATE INDEX IF NOT EXISTS "_news_v_autosave_idx" ON "_news_v" USING btree ("autosave");
    CREATE INDEX IF NOT EXISTS "_news_v_rels_order_idx" ON "_news_v_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "_news_v_rels_parent_idx" ON "_news_v_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "_news_v_rels_path_idx" ON "_news_v_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "_news_v_rels_categories_id_idx" ON "_news_v_rels" USING btree ("categories_id");

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'news_hero_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "news"
          ADD CONSTRAINT "news_hero_image_id_media_id_fk"
          FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'news_meta_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "news"
          ADD CONSTRAINT "news_meta_image_id_media_id_fk"
          FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'news_rels_parent_fk'
      ) THEN
        ALTER TABLE "news_rels"
          ADD CONSTRAINT "news_rels_parent_fk"
          FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'news_rels_categories_fk'
      ) THEN
        ALTER TABLE "news_rels"
          ADD CONSTRAINT "news_rels_categories_fk"
          FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_news_v_rels";
    DROP TABLE IF EXISTS "_news_v";
    DROP TABLE IF EXISTS "news_rels";
    DROP TABLE IF EXISTS "news";
    DROP TYPE IF EXISTS "public"."enum__news_v_version_status";
    DROP TYPE IF EXISTS "public"."enum_news_status";
  `)
}
