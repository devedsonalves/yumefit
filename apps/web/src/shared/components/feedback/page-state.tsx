import type { ReactNode } from 'react'
import { Button } from '@/shared/components/ui/button'

type PageStateProps = {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  children?: ReactNode
}

export function PageState({ action, children, description, title }: PageStateProps) {
  return (
    <section
      className="rounded-md border bg-card p-6 text-card-foreground shadow-sm"
      aria-live="polite"
    >
      <div className="max-w-xl space-y-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        {children}
        {action ? (
          <Button type="button" variant="outline" onClick={action.onClick}>
            {action.label}
          </Button>
        ) : null}
      </div>
    </section>
  )
}
