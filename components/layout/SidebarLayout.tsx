import { cn } from '@/lib/utils'

interface SidebarLayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
  sidebarPosition?: 'left' | 'right'
  className?: string
}

export default function SidebarLayout({
  children,
  sidebar,
  sidebarPosition = 'right',
  className,
}: SidebarLayoutProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-10 lg:grid lg:gap-12',
        sidebarPosition === 'right'
          ? 'lg:grid-cols-[1fr_18rem]'
          : 'lg:grid-cols-[18rem_1fr]',
        className
      )}
    >
      {sidebarPosition === 'left' && (
        <aside className="shrink-0">{sidebar}</aside>
      )}

      <main className="min-w-0">{children}</main>

      {sidebarPosition === 'right' && (
        <aside className="shrink-0">{sidebar}</aside>
      )}
    </div>
  )
}
