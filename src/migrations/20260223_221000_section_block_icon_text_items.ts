import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_section_block_icon_text_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar,
      "icon_id" integer
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_section_block_icon_text_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "text" varchar,
      "icon_id" integer,
      "_uuid" varchar
    );

    ALTER TABLE "pages_blocks_section_block_icon_text_items"
      ADD CONSTRAINT "pages_blocks_section_block_icon_text_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_section_block"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "pages_blocks_section_block_icon_text_items"
      ADD CONSTRAINT "pages_blocks_section_block_icon_text_items_icon_id_media_id_fk"
      FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    ALTER TABLE "_pages_v_blocks_section_block_icon_text_items"
      ADD CONSTRAINT "_pages_v_blocks_section_block_icon_text_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_section_block"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "_pages_v_blocks_section_block_icon_text_items"
      ADD CONSTRAINT "_pages_v_blocks_section_block_icon_text_items_icon_id_media_id_fk"
      FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "pages_blocks_section_block_icon_text_items_order_idx" ON "pages_blocks_section_block_icon_text_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_section_block_icon_text_items_parent_id_idx" ON "pages_blocks_section_block_icon_text_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_section_block_icon_text_items_icon_idx" ON "pages_blocks_section_block_icon_text_items" USING btree ("icon_id");

    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_section_block_icon_text_items_order_idx" ON "_pages_v_blocks_section_block_icon_text_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_section_block_icon_text_items_parent_id_idx" ON "_pages_v_blocks_section_block_icon_text_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_section_block_icon_text_items_icon_idx" ON "_pages_v_blocks_section_block_icon_text_items" USING btree ("icon_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_section_block_icon_text_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_section_block_icon_text_items" CASCADE;
  `)
}
