import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '../../heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          label: 'Home',
          description: 'Контент главной страницы сайта. Заполняйте только у страницы со slug: home.',
          fields: [
            {
              name: 'homeContent',
              type: 'group',
              fields: [
                {
                  name: 'hero',
                  type: 'group',
                  fields: [
                    {
                      name: 'title',
                      type: 'textarea',
                    },
                    {
                      name: 'buttonLabel',
                      type: 'text',
                      defaultValue: 'Learn More',
                    },
                    {
                      name: 'buttonHref',
                      type: 'text',
                      defaultValue: '#ourMission',
                    },
                  ],
                },
                {
                  name: 'ourMission',
                  type: 'group',
                  fields: [
                    {
                      name: 'titleBefore',
                      type: 'text',
                      defaultValue: 'We',
                    },
                    {
                      name: 'titleHighlight',
                      type: 'text',
                      defaultValue: 'build responsible partnerships',
                    },
                    {
                      name: 'titleAfter',
                      type: 'text',
                      defaultValue: 'in complex markets',
                    },
                    {
                      name: 'subtitle',
                      type: 'text',
                      defaultValue: 'Sona Group Mission',
                    },
                    {
                      name: 'texts',
                      type: 'array',
                      fields: [
                        {
                          name: 'text',
                          type: 'textarea',
                          required: true,
                        },
                      ],
                    },
                    {
                      name: 'items',
                      type: 'array',
                      fields: [
                        {
                          name: 'text',
                          type: 'textarea',
                          required: true,
                        },
                        {
                          name: 'icon',
                          type: 'text',
                          required: true,
                          admin: {
                            placeholder: '/images/icons/our-mission/icon01.svg',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'pharmaceutical',
                  type: 'group',
                  fields: [
                    {
                      name: 'title',
                      type: 'textarea',
                    },
                    {
                      name: 'subtitle',
                      type: 'textarea',
                    },
                    {
                      name: 'buttonLabel',
                      type: 'text',
                      defaultValue: 'Our Services',
                    },
                    {
                      name: 'buttonHref',
                      type: 'text',
                      defaultValue: '/services',
                    },
                  ],
                },
                {
                  name: 'product',
                  type: 'group',
                  fields: [
                    {
                      name: 'titleBefore',
                      type: 'text',
                      defaultValue: '360-degree',
                    },
                    {
                      name: 'titleHighlight',
                      type: 'text',
                      defaultValue: 'full lifecycle',
                    },
                    {
                      name: 'titleAfter',
                      type: 'text',
                      defaultValue: 'product management for the',
                    },
                    {
                      name: 'items',
                      type: 'array',
                      minRows: 2,
                      maxRows: 2,
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'text',
                          type: 'textarea',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'news',
                  type: 'group',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      defaultValue: 'Sona Group News',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
