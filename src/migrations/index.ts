import * as migration_20260216_221147_add_news_collection from './20260216_221147_add_news_collection';
import * as migration_20260216_223000_add_news_images_and_short_description from './20260216_223000_add_news_images_and_short_description';
import * as migration_20260223_000623 from './20260223_000623';
import * as migration_20260223_005639 from './20260223_005639';
import * as migration_20260223_043614 from './20260223_043614';
import * as migration_20260223_045533 from './20260223_045533';
import * as migration_20260223_051500_add_team_collection from './20260223_051500_add_team_collection';
import * as migration_20260223_054800_team_content_field from './20260223_054800_team_content_field';
import * as migration_20260223_062000_add_open_jobs_collection from './20260223_062000_add_open_jobs_collection';
import * as migration_20260223_062100_add_generate_slug_to_open_jobs from './20260223_062100_add_generate_slug_to_open_jobs';
import * as migration_20260223_074500_add_domain_and_work_experience_to_open_jobs from './20260223_074500_add_domain_and_work_experience_to_open_jobs';
import * as migration_20260223_160119 from './20260223_160119';

export const migrations = [
  {
    up: migration_20260216_221147_add_news_collection.up,
    down: migration_20260216_221147_add_news_collection.down,
    name: '20260216_221147_add_news_collection',
  },
  {
    up: migration_20260216_223000_add_news_images_and_short_description.up,
    down: migration_20260216_223000_add_news_images_and_short_description.down,
    name: '20260216_223000_add_news_images_and_short_description',
  },
  {
    up: migration_20260223_000623.up,
    down: migration_20260223_000623.down,
    name: '20260223_000623',
  },
  {
    up: migration_20260223_005639.up,
    down: migration_20260223_005639.down,
    name: '20260223_005639',
  },
  {
    up: migration_20260223_043614.up,
    down: migration_20260223_043614.down,
    name: '20260223_043614',
  },
  {
    up: migration_20260223_045533.up,
    down: migration_20260223_045533.down,
    name: '20260223_045533',
  },
  {
    up: migration_20260223_051500_add_team_collection.up,
    down: migration_20260223_051500_add_team_collection.down,
    name: '20260223_051500_add_team_collection',
  },
  {
    up: migration_20260223_054800_team_content_field.up,
    down: migration_20260223_054800_team_content_field.down,
    name: '20260223_054800_team_content_field',
  },
  {
    up: migration_20260223_062000_add_open_jobs_collection.up,
    down: migration_20260223_062000_add_open_jobs_collection.down,
    name: '20260223_062000_add_open_jobs_collection',
  },
  {
    up: migration_20260223_062100_add_generate_slug_to_open_jobs.up,
    down: migration_20260223_062100_add_generate_slug_to_open_jobs.down,
    name: '20260223_062100_add_generate_slug_to_open_jobs',
  },
  {
    up: migration_20260223_074500_add_domain_and_work_experience_to_open_jobs.up,
    down: migration_20260223_074500_add_domain_and_work_experience_to_open_jobs.down,
    name: '20260223_074500_add_domain_and_work_experience_to_open_jobs',
  },
  {
    up: migration_20260223_160119.up,
    down: migration_20260223_160119.down,
    name: '20260223_160119'
  },
];
