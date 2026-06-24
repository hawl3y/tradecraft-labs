'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import { mdxComponents } from './MDXComponents'

interface MDXContentProps {
  code: string
  components?: Record<string, React.ComponentType<Record<string, unknown>>>
}

export default function MDXContent({ code, components }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return (
    <div className="prose max-w-none">
      <Component components={{ ...mdxComponents, ...components }} />
    </div>
  )
}
