import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'open_jobs'
        AND column_name = 'generate_slug'
      ) THEN
        ALTER TABLE "open_jobs" ADD COLUMN "generate_slug" boolean DEFAULT true;
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "open_jobs" DROP COLUMN IF EXISTS "generate_slug";
  `)
}
