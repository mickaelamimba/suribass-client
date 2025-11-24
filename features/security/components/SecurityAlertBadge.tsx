import { Badge } from "@/components/ui/badge"

interface SecurityAlertBadgeProps {
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  count?: number
  showLabel?: boolean
}

export function SecurityAlertBadge({ severity, count, showLabel = true }: SecurityAlertBadgeProps) {
  const getVariant = (severity: string) => {
    switch (severity) {
      case 'Low':
        return "secondary" // Gris/Vert selon le thème
      case 'Medium':
        return "default" // Jaune/Orange (à customiser via CSS si besoin)
      case 'High':
        return "destructive" // Rouge
      case 'Critical':
        return "destructive" // Rouge foncé
      default:
        return "outline"
    }
  }

  return (
    <Badge variant={getVariant(severity)} className="gap-1">
      {showLabel && severity}
      {count !== undefined && (
        <span className="ml-1 rounded-full bg-background px-1.5 py-0.5 text-xs font-semibold text-foreground">
          {count}
        </span>
      )}
    </Badge>
  )
}
