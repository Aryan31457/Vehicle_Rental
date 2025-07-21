'use client';

import Link from 'next/link';

const features = [
  {
    name: 'Wide Selection',
    description: 'Choose from our extensive fleet of vehicles, from economy cars to luxury vehicles.',
  },
  {
    name: 'Easy Booking',
    description: 'Simple and fast online booking process with real-time availability.',
  },
  {
    name: 'Flexible Plans',
    description: 'Daily, weekly, and monthly rental plans to suit your needs.',
  },
];

export default function Home() {
  return (
    <div className="bg-background">
      <main>
        {/* Hero section */}
        <section className="relative bg-black text-white min-h-[600px] flex flex-col items-center justify-center px-4 pb-0 overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 w-full h-full bg-center bg-cover z-0"
            style={{ backgroundImage: "url('/bg.jpg')" }}
            aria-hidden="true"
          />
          {/* Overlay for darkening the image */}
          <div className="absolute inset-0 bg-black/70 z-10" aria-hidden="true" />
          {/* Content */}
          <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-6 z-20">
            <span className="text-lg font-semibold tracking-widest">LUXEDRIVE</span>
            <Link href="/login" className="border border-white rounded-full px-5 py-2 text-sm font-medium hover:bg-white hover:text-black transition">Login / Register</Link>
          </nav>
          <div className="flex flex-col items-center justify-center flex-1 w-full pt-24 z-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-3xl leading-tight mb-8">Discover the world on wheels<br />with our car, bike, and bicycle rental service</h1>
            <div className="w-full max-w-3xl flex flex-col items-center">
              {/* Search/Filter Bar Placeholder */}
              <div className="bg-white rounded-xl shadow-lg p-4 w-full flex flex-wrap gap-4 items-center justify-between">
                <input className="flex-1 min-w-[180px] max-w-xs rounded-md border border-gray-200 px-4 py-2 text-black" placeholder="Pick-up Location" />
                <input className="flex-1 min-w-[150px] max-w-xs rounded-md border border-gray-200 px-4 py-2 text-black" type="date" placeholder="Pick-up date" />
                <input className="flex-1 min-w-[180px] max-w-xs rounded-md border border-gray-200 px-4 py-2 text-black" placeholder="Drop-off Location" />
                <input className="flex-1 min-w-[150px] max-w-xs rounded-md border border-gray-200 px-4 py-2 text-black" type="date" placeholder="Drop-off date" />
                <button className="w-full md:w-auto rounded-full bg-black text-white px-6 py-2 font-semibold shadow hover:bg-gray-900 transition">Find a Vehicle</button>
              </div>
            </div>
          </div>
        </section>

        {/* Brand and Body Type Grids Placeholder */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            {/* Rent by Brands */}
            <h2 className="text-xl font-semibold mb-4">Rent by Brands</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8">
              {/* Brand cards placeholder */}
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Toyota</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Ford</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Tesla</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">BMW</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Audi</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Kia</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Royal Enfield</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Yamaha</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Giant</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Trek</div>
            </div>
            {/* Rent by Body Type */}
            <h2 className="text-xl font-semibold mb-4">Rent by vehicle type</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {/* Body type cards placeholder */}
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">SUV</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Sedan</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Convertible</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Coupe</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Wagon</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Hatchback</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Adventure Bike</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Sport Bike</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">Mountain Bicycle</div>
              <div className="border rounded-lg flex items-center justify-center h-20 text-foreground">City Bicycle</div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <div className="bg-muted py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">Why Choose Us</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Everything you need for a perfect rental experience
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <span className="text-2xl font-bold text-foreground">VehicleRental</span>
              <p className="text-sm leading-6 text-muted-foreground">
                Making vehicle rental easy and accessible for everyone.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 