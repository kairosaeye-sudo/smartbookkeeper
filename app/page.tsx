"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Receipt,
  TrendingUp,
  Shield,
  Zap,
  Check,
  ArrowRight,
  Menu,
  X,
  BookOpen,
  PieChart,
  FileText,
  Users,
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SmartBookkeeper</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Try Free
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <a href="#features" className="block text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="block text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#testimonials" className="block text-gray-600 hover:text-gray-900">Testimonials</a>
            <Link
              href="/dashboard"
              className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center font-medium"
            >
              Try Free
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              AI-Powered Bookkeeping for Small Businesses
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Your books,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                automated.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop drowning in receipts and spreadsheets. SmartBookkeeper uses AI to scan receipts,
              categorize expenses, and generate financial reports — so you can focus on growing your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#demo"
                className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:border-gray-300 transition-all font-semibold text-lg flex items-center justify-center gap-2"
              >
                Watch Demo
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">No credit card required • 14-day free trial</p>
          </div>

          {/* Hero Image */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Total Income</p>
                    <p className="text-2xl font-bold text-green-600">$26,600</p>
                    <p className="text-xs text-green-500">+4.4% from last month</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">$5,800</p>
                    <p className="text-xs text-red-500">-2.1% from last month</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Net Profit</p>
                    <p className="text-2xl font-bold text-blue-600">$20,800</p>
                    <p className="text-xs text-blue-500">78% margin</p>
                  </div>
                </div>
                <div className="h-40 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-end justify-around px-4 pb-4">
                  {[40, 55, 45, 65, 50, 70, 60, 75, 65, 80, 70, 85].map((h, i) => (
                    <div
                      key={i}
                      className="w-6 bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-sm"
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage your books
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From receipt scanning to tax-ready reports, SmartBookkeeper handles it all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Receipt,
                title: "AI Receipt Scanning",
                description: "Snap a photo of any receipt. Our AI extracts the merchant, date, amount, and category automatically.",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: PieChart,
                title: "Smart Categorization",
                description: "Expenses are automatically sorted into the right categories. No more manual data entry.",
                color: "bg-purple-50 text-purple-600",
              },
              {
                icon: BarChart3,
                title: "Real-Time Dashboard",
                description: "See your income, expenses, and profit at a glance. Track trends and spot issues early.",
                color: "bg-green-50 text-green-600",
              },
              {
                icon: FileText,
                title: "Tax-Ready Reports",
                description: "Generate P&L statements, balance sheets, and tax reports with one click. CPA-approved formats.",
                color: "bg-orange-50 text-orange-600",
              },
              {
                icon: Shield,
                title: "Bank-Level Security",
                description: "Your financial data is encrypted with 256-bit SSL and stored in SOC 2 compliant data centers.",
                color: "bg-red-50 text-red-600",
              },
              {
                icon: Users,
                title: "Multi-User Access",
                description: "Invite your accountant, bookkeeper, or team members. Set permissions and track changes.",
                color: "bg-indigo-50 text-indigo-600",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free. Upgrade when you need more. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
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
                price: "$79",
                period: "/month",
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
                price: "$199",
                period: "/month",
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
            ].map((plan, i) => (
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
                    {plan.price}
                  </span>
                  <span className={plan.popular ? "text-blue-100" : "text-gray-500"}>
                    {plan.period}
                  </span>
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

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by small business owners
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "SmartBookkeeper saved me 10+ hours per month. I used to dread bookkeeping — now it just happens automatically.",
                name: "Sarah Chen",
                role: "Founder, Design Studio",
                avatar: "SC",
              },
              {
                quote: "The AI categorization is scary accurate. It even caught expenses I would have missed. My accountant loves it.",
                name: "Mike Rodriguez",
                role: "Owner, Rodriguez Consulting",
                avatar: "MR",
              },
              {
                quote: "I switched from QuickBooks and never looked back. The receipt scanning alone is worth the subscription.",
                name: "Emily Watson",
                role: "CEO, Watson & Co",
                avatar: "EW",
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to automate your bookkeeping?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of small businesses who trust SmartBookkeeper with their finances.
          </p>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg shadow-blue-600/25 inline-flex items-center gap-2"
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SmartBookkeeper</span>
              </div>
              <p className="text-sm leading-relaxed">
                AI-powered bookkeeping for small businesses. Automate your finances and focus on what matters.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 SmartBookkeeper. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
