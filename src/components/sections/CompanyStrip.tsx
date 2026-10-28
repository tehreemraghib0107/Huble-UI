
// Preserve the six wordmarks shown on gethuble.com. Official image assets can
// replace these treatments without changing the marquee or its accessible list.
const companies = [
  { name: 'Northbeam', style: 'northbeam' },
  { name: 'Kestrel', style: 'kestrel' },
  { name: 'Parallax', style: 'parallax' },
  { name: 'stack/lab', style: 'stacklab' },
  { name: 'Meridian', style: 'meridian' },
  { name: 'Foldsend', style: 'foldsend' },
] as const

export function CompanyStrip() {

  return (
    <section className="company-strip" aria-labelledby="company-strip-title">
      <div className="company-strip-heading">
        <h2 id="company-strip-title">In good company.</h2>
        <p>Teams moving forward with Huble.</p>
      </div>

      <div className="company-marquee">
        <div className="company-marquee-track">
          {[0, 1, 2].map((copy) => (
            <ul className="company-logo-group" aria-label={copy === 0 ? 'Companies using Huble' : undefined} aria-hidden={copy !== 0 ? true : undefined} key={copy}>
              {companies.map((company) => (
                <li className={`company-logo company-logo-${company.style}`} key={company.name}>
                  <span>{company.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
