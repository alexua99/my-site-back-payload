import * as migration_20260216_221147_add_news_collection from './20260216_221147_add_news_collection';
import * as migration_20260216_223000_add_news_images_and_short_description from './20260216_223000_add_news_images_and_short_description';
import * as migration_20260223_000623 from './20260223_000623';
import * as migration_20260223_005639 from './20260223_005639';
import * as migration_20260223_051500_add_team_collection from './20260223_051500_add_team_collection';

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
    up: migration_20260223_051500_add_team_collection.up,
    down: migration_20260223_051500_add_team_collection.down,
    name: '20260223_051500_add_team_collection',
  },
];
