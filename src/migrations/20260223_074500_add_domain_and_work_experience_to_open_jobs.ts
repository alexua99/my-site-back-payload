import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "open_jobs" ADD COLUMN IF NOT EXISTS "domain" varchar;
    ALTER TABLE "open_jobs" ADD COLUMN IF NOT EXISTS "work_experience" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "open_jobs" DROP COLUMN IF EXISTS "work_experience";
    ALTER TABLE "open_jobs" DROP COLUMN IF EXISTS "domain";
  `)
}
