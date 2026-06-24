import { cn } from '@/lib/utils'

interface ResearchQuestionProps {
  question: string
  className?: string
}

export default function ResearchQuestion({ question, className }: ResearchQuestionProps) {
  return (
    <div className={cn(className)}>
      <p className="text-xs font-medium uppercase tracking-widest text-muted mb-4">
        Research Question
      </p>
      <blockquote className="font-serif text-xl md:text-2xl text-ink italic leading-relaxed border-l-4 border-navy pl-6">
        "{question}"
      </blockquote>
    </div>
  )
}
