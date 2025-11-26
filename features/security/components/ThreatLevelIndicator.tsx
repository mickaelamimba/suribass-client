import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, ShieldAlert, ShieldCheck } from "lucide-react"

interface ThreatLevelIndicatorProps {
  level: 'Low' | 'Medium' | 'High' | 'Critical'
  activeAlerts: number
}

export function ThreatLevelIndicator({ level, activeAlerts }: ThreatLevelIndicatorProps) {
  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'Low':
        return { color: 'bg-green-500', icon: ShieldCheck, label: 'Faible' }
      case 'Medium':
        return { color: 'bg-yellow-500', icon: Shield, label: 'Moyen' }
      case 'High':
        return { color: 'bg-orange-500', icon: ShieldAlert, label: 'Élevé' }
      case 'Critical':
        return { color: 'bg-red-600', icon: AlertTriangle, label: 'Critique' }
      default:
        return { color: 'bg-gray-500', icon: Shield, label: 'Inconnu' }
    }
  }

  const config = getLevelConfig(level)
  const Icon = config.icon

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${config.color} bg-opacity-10`}>
        <Icon className={`h-6 w-6 ${config.color.replace('bg-', 'text-')}`} />
      </div>
      
      <div className="flex-1">
        <div className="text-sm font-medium text-muted-foreground">Niveau de menace</div>
        <div className={`text-2xl font-bold ${config.color.replace('bg-', 'text-')}`}>
          {config.label}
        </div>
      </div>

      {activeAlerts > 0 && (
        <Badge variant="destructive" className="ml-auto">
          {activeAlerts} alerte{activeAlerts > 1 ? 's' : ''} active{activeAlerts > 1 ? 's' : ''}
        </Badge>
      )}
    </div>
  )
}
