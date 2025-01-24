import Link from 'next/link'

const locations = [
  { name: 'Belfast', slug: 'belfast' },
  { name: 'Bangor', slug: 'bangor' },
  { name: 'Newry', slug: 'newry' },
  { name: 'Lisburn', slug: 'lisburn' },
  { name: 'Derry', slug: 'derry' },
  { name: 'Northern Ireland', slug: 'northern-ireland' },
  { name: 'Ireland', slug: 'ireland' },
  { name: 'UK', slug: 'UK' },
]

export function LocationsGrid() {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">
          Web Design Services Across Ireland & UK
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={`/web-design/${location.slug}`}
              className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-medium text-white">
                Web Design in {location.name}
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                Professional web design services in {location.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 