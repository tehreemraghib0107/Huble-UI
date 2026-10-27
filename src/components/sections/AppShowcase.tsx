import icon from '../../assets/huble-icon.png'
import wordmark from '../../assets/huble-wordmark.svg'

type AppShowcaseProps = {
  screenshotSrc?: string
  screenshotAlt?: string
}

export function AppShowcase({ screenshotSrc, screenshotAlt = 'Huble app workspace' }: AppShowcaseProps) {
  return (
    <figure className="app-showcase" aria-label="Huble app preview">
      <div className="app-showcase-frame">
        <div className={`app-showcase-screen${screenshotSrc ? ' app-showcase-screen-filled' : ''}`}>
          {screenshotSrc ? (
            <img className="app-showcase-image" src={screenshotSrc} alt={screenshotAlt} width="1120" height="641" />
          ) : (
            <div className="app-showcase-placeholder" role="img" aria-label="Reserved space for the Huble app screenshot">
              <div className="showcase-placeholder-brand" aria-hidden="true">
                <img className="showcase-placeholder-icon" src={icon} alt="" />
                <img className="showcase-placeholder-wordmark" src={wordmark} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    </figure>
  )
}
