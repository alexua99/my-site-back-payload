import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "news" ADD COLUMN IF NOT EXISTS "short_description" varchar;
    ALTER TABLE "_news_v" ADD COLUMN IF NOT EXISTS "version_short_description" varchar;

    ALTER TABLE "news_rels" ADD COLUMN IF NOT EXISTS "media_id" integer;
    ALTER TABLE "_news_v_rels" ADD COLUMN IF NOT EXISTS "media_id" integer;

    CREATE INDEX IF NOT EXISTS "news_rels_media_id_idx" ON "news_rels" USING btree ("media_id");
    CREATE INDEX IF NOT EXISTS "_news_v_rels_media_id_idx" ON "_news_v_rels" USING btree ("media_id");

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'news_rels_media_fk'
      ) THEN
        ALTER TABLE "news_rels"
          ADD CONSTRAINT "news_rels_media_fk"
          FOREIGN KEY ("media_id") REFERENCES "public"."media"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = '_news_v_rels_media_fk'
      ) THEN
        ALTER TABLE "_news_v_rels"
          ADD CONSTRAINT "_news_v_rels_media_fk"
          FOREIGN KEY ("media_id") REFERENCES "public"."media"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_news_v_rels" DROP CONSTRAINT IF EXISTS "_news_v_rels_media_fk";
    ALTER TABLE "news_rels" DROP CONSTRAINT IF EXISTS "news_rels_media_fk";

    DROP INDEX IF EXISTS "_news_v_rels_media_id_idx";
    DROP INDEX IF EXISTS "news_rels_media_id_idx";

    ALTER TABLE "_news_v_rels" DROP COLUMN IF EXISTS "media_id";
    ALTER TABLE "news_rels" DROP COLUMN IF EXISTS "media_id";

    ALTER TABLE "_news_v" DROP COLUMN IF EXISTS "version_short_description";
    ALTER TABLE "news" DROP COLUMN IF EXISTS "short_description";
  `)
}
