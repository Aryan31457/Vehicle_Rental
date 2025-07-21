'use client';

import { CheckCircleIcon, CalendarIcon, KeyIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Browse and Select',
    description: 'Choose from our wide range of premium cars, bikes, and bicycles. Select the package and return dates and locations that suit you best.',
    icon: <CalendarIcon className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Book and Confirm',
    description: 'Book your desired vehicle with just a few clicks and receive an instant confirmation via email or SMS.',
    icon: <CheckCircleIcon className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Enjoy your Ride',
    description: 'Pick up your vehicle at the designated location and enjoy your premium driving experience with our top-quality service.',
    icon: <KeyIcon className="h-8 w-8 text-primary" />,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-foreground mb-4 text-center">How it Works</h1>
      <p className="text-base text-muted-foreground mb-12 max-w-2xl text-center">
        Renting a car, bike, or bicycle has never been easier. Our streamlined process makes it simple for you to book and confirm your vehicle of choice online.
      </p>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <div key={step.title} className="bg-card rounded-2xl shadow p-8 flex flex-col items-center text-center border border-border">
            <div className="mb-4">{step.icon}</div>
            <h2 className="text-xl font-semibold text-foreground mb-2">{step.title}</h2>
            <p className="text-base text-muted-foreground">{step.description}</p>
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-8 h-1 bg-muted" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 