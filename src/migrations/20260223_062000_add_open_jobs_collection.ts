import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({}: MigrateUpArgs): Promise<void> {
  // No-op placeholder: collection setup is handled in earlier idempotent migrations.
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // No-op placeholder for compatibility with existing migration index.
}
