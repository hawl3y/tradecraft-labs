import { cn } from '@/lib/utils'

type PageWidth = 'default' | 'narrow' | 'wide'

const widthClasses: Record<PageWidth, string> = {
  default: 'max-w-content',
  narrow:  'max-w-prose',
  wide:    'max-w-7xl',
}

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  width?: PageWidth
}

export default function PageLayout({
  children,
  className,
  width = 'default',
}: PageLayoutProps) {
  return (
    <div className={cn(widthClasses[width], 'w-full mx-auto px-6 py-12', className)}>
      {children}
    </div>
  )
}
