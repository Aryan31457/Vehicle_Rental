'use client';

const plans = [
  {
    name: 'Basic',
    price: '$19',
    description: 'Perfect for occasional rentals of cars, bikes, or bicycles.',
    features: [
      'Up to 3 rentals/month',
      'Standard support',
      'Access to all vehicle types',
    ],
  },
  {
    name: 'Premium',
    price: '$49',
    description: 'Ideal for frequent travelers and commuters.',
    features: [
      'Unlimited rentals',
      'Priority support',
      'Discounts on long-term bookings',
      'Access to premium vehicles',
    ],
    popular: true,
  },
  {
    name: 'Family',
    price: '$79',
    description: 'Best for families or groups needing multiple vehicles.',
    features: [
      'Up to 5 concurrent rentals',
      'Family/group support',
      'Flexible vehicle switching',
    ],
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-4">Choose Your Membership Plan</h1>
        <p className="text-base text-muted-foreground">
          Get exclusive access and save on car, bike, and bicycle rentals with our flexible membership plans.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.name} className={`rounded-2xl border border-border bg-card p-8 shadow flex flex-col items-center ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
            <h2 className={`text-xl font-semibold mb-2 ${plan.popular ? 'text-primary' : 'text-foreground'}`}>{plan.name}</h2>
            <p className="text-3xl font-bold text-foreground mb-2">{plan.price}<span className="text-base font-normal">/mo</span></p>
            <p className="text-base text-muted-foreground mb-4">{plan.description}</p>
            <ul className="mb-6 text-left w-full space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`w-full rounded-full px-5 py-2 font-semibold shadow transition ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-foreground hover:bg-muted/80'}`}>Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
} 