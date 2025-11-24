interface TrackPlayerProps {
  embedUrl: string
  platform: 'SoundCloud' | 'YouTube' | 'Spotify'
  title: string
}

export function TrackPlayer({ embedUrl, platform, title }: TrackPlayerProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-black/5 shadow-lg">
      <iframe
        src={embedUrl}
        title={`Lecteur ${platform} pour ${title}`}
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
