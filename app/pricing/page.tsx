'use client';

import Navbar from '@/components/Navbar';

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, transparent pricing</h1>
            <p className="text-zinc-400 max-w-xl mx-auto">Choose the plan that fits your business. All plans include a 14-day free trial.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: 29, desc: 'For freelancers and solo entrepreneurs', features: ['Up to 100 transactions/mo', 'Receipt scanning', 'Basic reports', 'Email support'] },
              { name: 'Professional', price: 79, desc: 'For growing small businesses', features: ['Unlimited transactions', 'AI categorization', 'Advanced reports', 'Priority support', 'Bank sync'], popular: true },
              { name: 'Enterprise', price: 199, desc: 'For established companies', features: ['Everything in Pro', 'Multi-user access', 'API access', 'Dedicated account manager', 'Custom integrations'] },
            ].map((plan) => (
              <div key={plan.name} className={`card relative ${plan.popular ? 'border-violet-600 ring-1 ring-violet-600' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-medium px-3 py-1 rounded-full">Most Popular</div>
                )}
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-zinc-400 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-zinc-400">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                      <svg className="w-4 h-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/signup" className={`block text-center ${plan.popular ? 'btn-primary' : 'btn-secondary'} w-full`}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
