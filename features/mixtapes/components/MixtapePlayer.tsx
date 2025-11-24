interface MixtapePlayerProps {
  embedUrl: string
  title: string
}

export function MixtapePlayer({ embedUrl, title }: MixtapePlayerProps) {
  return (
    <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-black sm:aspect-[3/1]">
      <iframe
        width="100%"
        height="100%"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={embedUrl}
        title={title}
        className="h-full w-full"
      />
    </div>
  )
}
