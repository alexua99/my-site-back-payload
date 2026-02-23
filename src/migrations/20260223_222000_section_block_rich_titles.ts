import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_section_block"
      ALTER COLUMN "title" TYPE jsonb USING CASE WHEN "title" IS NULL THEN NULL ELSE jsonb_build_object('root', jsonb_build_object('type', 'root', 'children', jsonb_build_array(jsonb_build_object('type', 'text', 'text', "title", 'version', 1)), 'direction', 'ltr', 'format', '', 'indent', 0, 'version', 1)) END;
    ALTER TABLE "pages_blocks_section_block"
      ALTER COLUMN "subtitle" TYPE jsonb USING CASE WHEN "subtitle" IS NULL OR "subtitle" = '' THEN NULL ELSE jsonb_build_object('root', jsonb_build_object('type', 'root', 'children', jsonb_build_array(jsonb_build_object('type', 'text', 'text', "subtitle", 'version', 1)), 'direction', 'ltr', 'format', '', 'indent', 0, 'version', 1)) END;

    ALTER TABLE "_pages_v_blocks_section_block"
      ALTER COLUMN "title" TYPE jsonb USING CASE WHEN "title" IS NULL THEN NULL ELSE jsonb_build_object('root', jsonb_build_object('type', 'root', 'children', jsonb_build_array(jsonb_build_object('type', 'text', 'text', "title", 'version', 1)), 'direction', 'ltr', 'format', '', 'indent', 0, 'version', 1)) END;
    ALTER TABLE "_pages_v_blocks_section_block"
      ALTER COLUMN "subtitle" TYPE jsonb USING CASE WHEN "subtitle" IS NULL OR "subtitle" = '' THEN NULL ELSE jsonb_build_object('root', jsonb_build_object('type', 'root', 'children', jsonb_build_array(jsonb_build_object('type', 'text', 'text', "subtitle", 'version', 1)), 'direction', 'ltr', 'format', '', 'indent', 0, 'version', 1)) END;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_section_block" ALTER COLUMN "title" TYPE varchar USING ("title" #>> '{root,children,0,text}');
    ALTER TABLE "pages_blocks_section_block" ALTER COLUMN "subtitle" TYPE varchar USING ("subtitle" #>> '{root,children,0,text}');
    ALTER TABLE "_pages_v_blocks_section_block" ALTER COLUMN "title" TYPE varchar USING ("title" #>> '{root,children,0,text}');
    ALTER TABLE "_pages_v_blocks_section_block" ALTER COLUMN "subtitle" TYPE varchar USING ("subtitle" #>> '{root,children,0,text}');
  `)
}
