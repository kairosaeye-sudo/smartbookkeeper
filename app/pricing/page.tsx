"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, BookOpen, Zap, Shield, Users } from "lucide-react";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 29,
      annualPrice: 24,
      description: "Perfect for freelancers and solo entrepreneurs",
      features: [
        "Up to 100 transactions/month",
        "AI receipt scanning",
        "Basic categorization",
        "Monthly reports",
        "Email support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      monthlyPrice: 79,
      annualPrice: 65,
      description: "For growing small businesses",
      features: [
        "Up to 500 transactions/month",
        "Advanced AI categorization",
        "Real-time dashboard",
        "Tax-ready reports",
        "Multi-user access",
        "Priority support",
        "Bank integrations",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: 199,
      annualPrice: 165,
      description: "For established businesses with complex needs",
      features: [
        "Unlimited transactions",
        "Custom categories",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
        "Phone support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SmartBookkeeper</span>
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start free. Upgrade when you need more. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${!annual ? "text-gray-900" : "text-gray-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                annual ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  annual ? "translate-x-7" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${annual ? "text-gray-900" : "text-gray-500"}`}>
              Annual
              <span className="ml-1 text-green-600 text-xs font-semibold">Save 15%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/25 scale-105"
                    : "bg-white border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-2 mb-4">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    ${annual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className={plan.popular ? "text-blue-100" : "text-gray-500"}>/month</span>
                </div>
                <p className={`text-sm mb-6 ${plan.popular ? "text-blue-100" : "text-gray-500"}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <Check className={`w-5 h-5 ${plan.popular ? "text-blue-200" : "text-green-500"}`} />
                      <span className={plan.popular ? "text-blue-50" : "text-gray-600"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How does the AI receipt scanning work?",
                a: "Simply upload a photo of your receipt. Our AI automatically extracts the merchant name, date, amount, and categorizes the expense. You can review and approve the data before it's added to your books.",
              },
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes. You can cancel your subscription at any time. Your data will remain accessible until the end of your billing period, and you can export all your data before canceling.",
              },
              {
                q: "Is my financial data secure?",
                a: "Absolutely. We use 256-bit SSL encryption for all data in transit and at rest. Our infrastructure is SOC 2 compliant, and we never share your data with third parties.",
              },
              {
                q: "Can I import data from QuickBooks or Excel?",
                a: "Yes. We support one-click imports from QuickBooks, Xero, and CSV/Excel files. Our team can also help you migrate historical data.",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to automate your bookkeeping?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg shadow-blue-600/25 inline-flex items-center gap-2"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
