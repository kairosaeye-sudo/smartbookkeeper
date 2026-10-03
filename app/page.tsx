'use client';

import Navbar from '@/components/Navbar';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-600/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-violet-400 font-medium">AI-Powered Bookkeeping</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Bookkeeping that<br />
              <span className="text-violet-500">runs itself</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
              SmartBookkeeper uses AI to automate your books. Track expenses, scan receipts, and generate reports — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/signup" className="btn-primary text-base px-8 py-3">Start Free Trial</a>
              <a href="/#features" className="btn-secondary text-base px-8 py-3">See How It Works</a>
            </div>
            <p className="text-sm text-zinc-500 mt-4">No credit card required · 14-day free trial</p>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything you need</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">Powerful features designed for small businesses and startups.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'AI Receipt Scanning', desc: 'Snap a photo and our AI extracts merchant, amount, and category automatically.', icon: '📷' },
                { title: 'Smart Categorization', desc: 'Transactions are sorted into categories automatically. No manual tagging needed.', icon: '🏷️' },
                { title: 'Real-time Dashboard', desc: 'See your cash flow, profit/loss, and top expenses at a glance.', icon: '📊' },
                { title: 'Tax Ready Reports', desc: 'Generate P&L, balance sheet, and tax reports with one click.', icon: '📋' },
                { title: 'Multi-user Access', desc: 'Invite your team and accountant with role-based permissions.', icon: '👥' },
                { title: 'Bank Sync', desc: 'Connect your bank accounts for automatic transaction imports.', icon: '🏦' },
              ].map((f) => (
                <div key={f.title} className="card hover:border-violet-600/50 transition-colors">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-zinc-400 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple pricing</h2>
              <p className="text-zinc-400">Choose the plan that fits your business.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { name: 'Starter', price: 29, features: ['Up to 100 transactions/mo', 'Receipt scanning', 'Basic reports', 'Email support'] },
                { name: 'Professional', price: 79, features: ['Unlimited transactions', 'AI categorization', 'Advanced reports', 'Priority support', 'Bank sync'], popular: true },
                { name: 'Enterprise', price: 199, features: ['Everything in Pro', 'Multi-user access', 'API access', 'Dedicated account manager', 'Custom integrations'] },
              ].map((plan) => (
                <div key={plan.name} className={`card relative ${plan.popular ? 'border-violet-600 ring-1 ring-violet-600' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-medium px-3 py-1 rounded-full">Most Popular</div>
                  )}
                  <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
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
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Loved by small businesses</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Sarah Chen', role: 'Founder, Bloom Studio', quote: 'SmartBookkeeper saved me 10 hours a month. The AI categorization is scarily accurate.' },
                { name: 'Marcus Johnson', role: 'CEO, TaskFlow', quote: 'Finally a bookkeeping tool that doesn\'t need an accountant to operate. Game changer.' },
                { name: 'Emily Rodriguez', role: 'Owner, Brew & Bean', quote: 'Receipt scanning alone is worth the price. I just snap and forget.' },
              ].map((t) => (
                <div key={t.name} className="card">
                  <p className="text-zinc-300 text-sm mb-4 italic">"{t.quote}"</p>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-zinc-500 text-xs">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to automate your books?</h2>
            <p className="text-zinc-400 mb-8">Join 500+ small businesses already using SmartBookkeeper.</p>
            <a href="/signup" className="btn-primary text-base px-8 py-3">Start Your Free Trial</a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-violet-600 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-white">SmartBookkeeper</span>
            </div>
            <p className="text-sm text-zinc-500">&copy; 2026 SmartBookkeeper. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
