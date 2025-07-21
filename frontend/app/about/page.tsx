'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-4">About LuxeDrive</h1>
        <p className="text-base text-muted-foreground mb-6">
          LuxeDrive is dedicated to making premium mobility accessible to everyone. Whether you need a car, bike, or bicycle, our mission is to provide a seamless, reliable, and enjoyable rental experience for all your journeys.
        </p>
        <p className="text-base text-muted-foreground">
          We believe in quality, flexibility, and customer satisfaction. Our diverse fleet, easy online booking, and attentive support set us apart in the world of vehicle rentals.
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-card rounded-2xl border border-border shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-primary mb-2">1000+</span>
          <span className="text-base text-muted-foreground">Vehicles Available</span>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-primary mb-2">24/7</span>
          <span className="text-base text-muted-foreground">Customer Support</span>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-primary mb-2">99%</span>
          <span className="text-base text-muted-foreground">Customer Satisfaction</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Meet Our Team</h2>
        <p className="text-base text-muted-foreground mb-8">
          Our passionate team is committed to delivering the best rental experience. We're here to help you get on the road—no matter what you ride.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-muted mb-2" />
            <span className="font-semibold text-foreground">A. Sharma</span>
            <span className="text-xs text-muted-foreground">Founder & CEO</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-muted mb-2" />
            <span className="font-semibold text-foreground">R. Singh</span>
            <span className="text-xs text-muted-foreground">Head of Operations</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-muted mb-2" />
            <span className="font-semibold text-foreground">M. Patel</span>
            <span className="text-xs text-muted-foreground">Customer Success</span>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto text-center mt-16">
        <h2 className="text-xl font-semibold text-foreground mb-2">Ready to Ride?</h2>
        <p className="text-base text-muted-foreground mb-6">Sign up today and experience the freedom of LuxeDrive for cars, bikes, and bicycles.</p>
        <a href="/register" className="inline-block rounded-full bg-primary text-primary-foreground px-8 py-3 font-semibold shadow hover:bg-primary/90 transition">Get Started</a>
      </div>
    </div>
  );
} 