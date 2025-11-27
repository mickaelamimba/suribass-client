import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import type { ExtractedMetadata } from "../api/tracks.types"

interface ExtractMetadataPreviewProps {
  metadata: ExtractedMetadata
}

export function ExtractMetadataPreview({ metadata }: ExtractMetadataPreviewProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Aperçu de la track
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-md">
          <Image
            src={metadata.thumbnailUrl}
            alt={metadata.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{metadata.platform}</Badge>
            <span className="text-xs text-muted-foreground">
              {metadata.duration}
            </span>
          </div>
          <h4 className="font-semibold line-clamp-1">{metadata.title}</h4>
          <p className="text-sm text-muted-foreground">{metadata.artistName}</p>
        </div>
      </CardContent>
    </Card>
  )
}
