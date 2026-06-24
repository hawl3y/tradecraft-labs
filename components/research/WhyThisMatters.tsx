import { cn } from '@/lib/utils'

interface WhyThisMattersProps {
  text: string
  className?: string
}

export default function WhyThisMatters({ text, className }: WhyThisMattersProps) {
  return (
    <div className={cn(className)}>
      <h2 id="why-this-matters" className="font-serif text-2xl text-ink mb-6">
        Why This Research Matters
      </h2>
      <p className="text-base leading-relaxed text-ink max-w-prose">
        {text}
      </p>
    </div>
  )
}
