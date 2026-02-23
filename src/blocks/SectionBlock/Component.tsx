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
        'py-12',
        {
          container: !disableInnerContainer,
        },
        className,
      )}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
        <div>
          {title && (
            typeof title === 'string' ? (
              <h2 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
            ) : (
              <div
                className="mb-2 text-2xl font-bold tracking-tight md:text-3xl prose prose-neutral dark:prose-invert max-w-none"
                role="heading"
                aria-level={2}
              >
                <RichText data={title} enableGutter={false} />
              </div>
            )
          )}
          {subtitle && (
            typeof subtitle === 'string' ? (
              <p className="mb-4 text-lg text-muted-foreground">{subtitle}</p>
            ) : (
              <div className="mb-4 text-lg text-muted-foreground prose prose-neutral dark:prose-invert max-w-none">
                <RichText data={subtitle} enableGutter={false} />
              </div>
            )
          )}
          {text && (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <RichText data={text} enableGutter={false} />
            </div>
          )}
          {iconTextItems && iconTextItems.length > 0 && (
            <ul className="mt-6 space-y-4">
              {iconTextItems.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  {item.icon && typeof item.icon === 'object' && (
                    <span className="shrink-0 w-6 h-6 flex items-center justify-center">
                      <Media
                        resource={item.icon}
                        imgClassName="w-6 h-6 object-contain"
                      />
                    </span>
                  )}
                  <span className="text-muted-foreground">
                    {typeof item.text === 'string' ? (
                      item.text
                    ) : item.text ? (
                      <RichText data={item.text} enableGutter={false} />
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {image && typeof image === 'object' && (
          <div className="relative overflow-hidden rounded-lg">
            <Media
              resource={image}
              imgClassName="rounded-lg object-cover w-full h-auto"
            />
          </div>
        )}
      </div>
    </section>
  )
}
