import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_home_content_our_mission_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_home_content_our_mission_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_home_content_product_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "_pages_v_version_home_content_our_mission_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_home_content_our_mission_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_home_content_product_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "home_content_hero_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_content_hero_button_label" varchar DEFAULT 'Learn More';
  ALTER TABLE "pages" ADD COLUMN "home_content_hero_button_href" varchar DEFAULT '#ourMission';
  ALTER TABLE "pages" ADD COLUMN "home_content_our_mission_title_before" varchar DEFAULT 'We';
  ALTER TABLE "pages" ADD COLUMN "home_content_our_mission_title_highlight" varchar DEFAULT 'build responsible partnerships';
  ALTER TABLE "pages" ADD COLUMN "home_content_our_mission_title_after" varchar DEFAULT 'in complex markets';
  ALTER TABLE "pages" ADD COLUMN "home_content_our_mission_subtitle" varchar DEFAULT 'Sona Group Mission';
  ALTER TABLE "pages" ADD COLUMN "home_content_pharmaceutical_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_content_pharmaceutical_subtitle" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_content_pharmaceutical_button_label" varchar DEFAULT 'Our Services';
  ALTER TABLE "pages" ADD COLUMN "home_content_pharmaceutical_button_href" varchar DEFAULT '/services';
  ALTER TABLE "pages" ADD COLUMN "home_content_product_title_before" varchar DEFAULT '360-degree';
  ALTER TABLE "pages" ADD COLUMN "home_content_product_title_highlight" varchar DEFAULT 'full lifecycle';
  ALTER TABLE "pages" ADD COLUMN "home_content_product_title_after" varchar DEFAULT 'product management for the';
  ALTER TABLE "pages" ADD COLUMN "home_content_news_title" varchar DEFAULT 'Sona Group News';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_hero_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_hero_button_label" varchar DEFAULT 'Learn More';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_hero_button_href" varchar DEFAULT '#ourMission';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_our_mission_title_before" varchar DEFAULT 'We';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_our_mission_title_highlight" varchar DEFAULT 'build responsible partnerships';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_our_mission_title_after" varchar DEFAULT 'in complex markets';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_our_mission_subtitle" varchar DEFAULT 'Sona Group Mission';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_pharmaceutical_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_pharmaceutical_subtitle" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_pharmaceutical_button_label" varchar DEFAULT 'Our Services';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_pharmaceutical_button_href" varchar DEFAULT '/services';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_product_title_before" varchar DEFAULT '360-degree';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_product_title_highlight" varchar DEFAULT 'full lifecycle';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_product_title_after" varchar DEFAULT 'product management for the';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_content_news_title" varchar DEFAULT 'Sona Group News';
  ALTER TABLE "open_jobs" ADD COLUMN IF NOT EXISTS "domain" varchar;
  ALTER TABLE "open_jobs" ADD COLUMN IF NOT EXISTS "work_experience" varchar;
  ALTER TABLE "pages_home_content_our_mission_texts" ADD CONSTRAINT "pages_home_content_our_mission_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_home_content_our_mission_items" ADD CONSTRAINT "pages_home_content_our_mission_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_home_content_product_items" ADD CONSTRAINT "pages_home_content_product_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_content_our_mission_texts" ADD CONSTRAINT "_pages_v_version_home_content_our_mission_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_content_our_mission_items" ADD CONSTRAINT "_pages_v_version_home_content_our_mission_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_content_product_items" ADD CONSTRAINT "_pages_v_version_home_content_product_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_home_content_our_mission_texts_order_idx" ON "pages_home_content_our_mission_texts" USING btree ("_order");
  CREATE INDEX "pages_home_content_our_mission_texts_parent_id_idx" ON "pages_home_content_our_mission_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_home_content_our_mission_items_order_idx" ON "pages_home_content_our_mission_items" USING btree ("_order");
  CREATE INDEX "pages_home_content_our_mission_items_parent_id_idx" ON "pages_home_content_our_mission_items" USING btree ("_parent_id");
  CREATE INDEX "pages_home_content_product_items_order_idx" ON "pages_home_content_product_items" USING btree ("_order");
  CREATE INDEX "pages_home_content_product_items_parent_id_idx" ON "pages_home_content_product_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_home_content_our_mission_texts_order_idx" ON "_pages_v_version_home_content_our_mission_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_version_home_content_our_mission_texts_parent_id_idx" ON "_pages_v_version_home_content_our_mission_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_home_content_our_mission_items_order_idx" ON "_pages_v_version_home_content_our_mission_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_home_content_our_mission_items_parent_id_idx" ON "_pages_v_version_home_content_our_mission_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_home_content_product_items_order_idx" ON "_pages_v_version_home_content_product_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_home_content_product_items_parent_id_idx" ON "_pages_v_version_home_content_product_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_home_content_our_mission_texts" CASCADE;
  DROP TABLE "pages_home_content_our_mission_items" CASCADE;
  DROP TABLE "pages_home_content_product_items" CASCADE;
  DROP TABLE "_pages_v_version_home_content_our_mission_texts" CASCADE;
  DROP TABLE "_pages_v_version_home_content_our_mission_items" CASCADE;
  DROP TABLE "_pages_v_version_home_content_product_items" CASCADE;
  ALTER TABLE "pages" DROP COLUMN "home_content_hero_title";
  ALTER TABLE "pages" DROP COLUMN "home_content_hero_button_label";
  ALTER TABLE "pages" DROP COLUMN "home_content_hero_button_href";
  ALTER TABLE "pages" DROP COLUMN "home_content_our_mission_title_before";
  ALTER TABLE "pages" DROP COLUMN "home_content_our_mission_title_highlight";
  ALTER TABLE "pages" DROP COLUMN "home_content_our_mission_title_after";
  ALTER TABLE "pages" DROP COLUMN "home_content_our_mission_subtitle";
  ALTER TABLE "pages" DROP COLUMN "home_content_pharmaceutical_title";
  ALTER TABLE "pages" DROP COLUMN "home_content_pharmaceutical_subtitle";
  ALTER TABLE "pages" DROP COLUMN "home_content_pharmaceutical_button_label";
  ALTER TABLE "pages" DROP COLUMN "home_content_pharmaceutical_button_href";
  ALTER TABLE "pages" DROP COLUMN "home_content_product_title_before";
  ALTER TABLE "pages" DROP COLUMN "home_content_product_title_highlight";
  ALTER TABLE "pages" DROP COLUMN "home_content_product_title_after";
  ALTER TABLE "pages" DROP COLUMN "home_content_news_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_hero_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_hero_button_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_hero_button_href";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_our_mission_title_before";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_our_mission_title_highlight";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_our_mission_title_after";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_our_mission_subtitle";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_pharmaceutical_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_pharmaceutical_subtitle";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_pharmaceutical_button_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_pharmaceutical_button_href";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_product_title_before";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_product_title_highlight";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_product_title_after";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_content_news_title";
  ALTER TABLE "open_jobs" DROP COLUMN IF EXISTS "domain";
  ALTER TABLE "open_jobs" DROP COLUMN IF EXISTS "work_experience";`)
}
