import { cn } from '@/lib/utils'

type CardElement = 'div' | 'article' | 'section' | 'li'

interface CardProps {
  children: React.ReactNode
  className?: string
  as?: CardElement
  hover?: boolean
}

export default function Card({
  children,
  className,
  as: Element = 'div',
  hover = false,
}: CardProps) {
  return (
    <Element
      className={cn(
        'bg-surface border border-gray-200 rounded-sm p-6',
        hover && 'transition-colors duration-150 hover:border-navy/30 hover:bg-white',
        className
      )}
    >
      {children}
    </Element>
  )
}
