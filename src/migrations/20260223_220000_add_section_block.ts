import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_section_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "subtitle" varchar,
      "text" jsonb,
      "image_id" integer,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_section_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "subtitle" varchar,
      "text" jsonb,
      "image_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );

    ALTER TABLE "pages_blocks_section_block"
      ADD CONSTRAINT "pages_blocks_section_block_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "pages_blocks_section_block"
      ADD CONSTRAINT "pages_blocks_section_block_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    ALTER TABLE "_pages_v_blocks_section_block"
      ADD CONSTRAINT "_pages_v_blocks_section_block_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "_pages_v_blocks_section_block"
      ADD CONSTRAINT "_pages_v_blocks_section_block_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "pages_blocks_section_block_order_idx" ON "pages_blocks_section_block" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_section_block_parent_id_idx" ON "pages_blocks_section_block" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_section_block_path_idx" ON "pages_blocks_section_block" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_section_block_image_idx" ON "pages_blocks_section_block" USING btree ("image_id");

    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_section_block_order_idx" ON "_pages_v_blocks_section_block" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_section_block_parent_id_idx" ON "_pages_v_blocks_section_block" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_section_block_path_idx" ON "_pages_v_blocks_section_block" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_section_block_image_idx" ON "_pages_v_blocks_section_block" USING btree ("image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_section_block" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_section_block" CASCADE;
  `)
}
