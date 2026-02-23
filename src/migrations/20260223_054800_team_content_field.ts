import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Rename description to content and change type to jsonb
    ALTER TABLE "team" RENAME COLUMN "description" TO "content";
    ALTER TABLE "team" ALTER COLUMN "content" TYPE jsonb USING
      CASE
        WHEN "content" IS NULL THEN NULL
        ELSE jsonb_build_object('root', jsonb_build_object('type', 'root', 'children', jsonb_build_array(jsonb_build_object('type', 'paragraph', 'children', jsonb_build_array(jsonb_build_object('type', 'text', 'text', "content"))))))
      END;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Revert content back to description as text
    ALTER TABLE "team" RENAME COLUMN "content" TO "description";
    ALTER TABLE "team" ALTER COLUMN "description" TYPE text;
  `)
}
