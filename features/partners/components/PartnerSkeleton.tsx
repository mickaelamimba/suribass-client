import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PartnerSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square w-full" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="mb-4 h-4 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </CardContent>
    </Card>
  )
}
