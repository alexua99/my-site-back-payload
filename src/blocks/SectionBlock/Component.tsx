import { cn } from '../../utilities/ui'
import React from 'react'
import RichText from '../../components/RichText'

import type { SectionBlock as SectionBlockProps } from '../../payload-types'

import { Media } from '../../components/Media'

type Props = SectionBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const SectionBlock: React.FC<Props> = (props) => {
  const { title, subtitle, text, iconTextItems, image, className, disableInnerContainer } = props

  return (
    <section
      className={cn(
        'container mt-16',
        {
          container: !disableInnerContainer,
        },
        className,
      )}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
        <div>
          {title &&
            (typeof title === 'string' ? (
              <h2 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
            ) : (
              <div
                className="mb-2 text-2xl font-bold tracking-tight md:text-3xl prose prose-neutral dark:prose-invert max-w-none"
                role="heading"
                aria-level={2}
              >
                <RichText data={title} enableGutter={false} />
              </div>
            ))}

          {text && (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <RichText data={text} enableGutter={false} />
            </div>
          )}
        </div>
        {image && typeof image === 'object' && (
          <div className="relative overflow-hidden rounded-lg">
            <Media resource={image} imgClassName="rounded-lg object-cover w-full h-auto" />
          </div>
        )}
      </div>
    </section>
  )
}
