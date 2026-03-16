'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function UpgradePage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [checkoutTab, setCheckoutTab] = useState<'details' | 'payment'>('details');
  const [formData, setFormData] = useState({
    email: '',
    country: '',
    zipcode: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: ''
  });

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      
      <main className="flex-1 py-s-20 px-s-20">
        <div className="max-w-s-1400 mx-auto">
          {/* Header */}
          <div className="mb-s-80">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-s-8 text-accent hover:text-accent/80 transition-colors mb-s-40 font-semibold text-s-14"
            >
              <ArrowLeft className="w-s-16 h-s-16" />
              Back
            </button>

            <div className="flex items-start justify-between mb-s-48">
              <div>
                <h1 className="text-s-48 font-black text-text-primary mb-s-16">Choose the plan that best fits your needs</h1>
                <p className="text-s-16 text-text-secondary max-w-s-600">Select a plan to get started. You can always upgrade or downgrade later.</p>
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center gap-s-32">
              <span className={`text-s-16 font-semibold ${billingCycle === 'monthly' ? 'text-text-primary' : 'text-text-secondary'}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-s-40 w-s-72 items-center rounded-full bg-border/40 transition-colors hover:bg-border/60"
              >
                <span
                  className={`inline-block h-s-36 w-s-36 transform rounded-full bg-accent transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-s-32' : 'translate-x-s-2'
                  }`}
                />
              </button>
              <span className={`text-s-16 font-semibold ${billingCycle === 'yearly' ? 'text-accent' : 'text-text-secondary'}`}>
                Yearly <span className="text-accent/80 text-s-14">20% OFF</span>
              </span>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-s-40 mb-s-80">
            {[
              {
                name: 'PERSONAL',
                subtitle: 'For Personal Use',
                price: billingCycle === 'monthly' ? '$9' : '$86',
                cycle: billingCycle === 'monthly' ? '/month' : '/year',
                requests: '2,000 monthly requests',
                features: [
                  '6 email templates',
                  'Attachments up to 500kb',
                  'Whitelist',
                  'Unlimited contacts',
                  'Completely white label'
                ],
                requestOptions: null as (number[] | null)
              },
              {
                name: 'PROFESSIONAL',
                subtitle: 'Entrepreneurs & Freelancers',
                price: billingCycle === 'monthly' ? '$15' : '$144',
                cycle: billingCycle === 'monthly' ? '/month' : '/year',
                requests: 'monthly requests',
                requestRange: [5000, 10000],
                requestOptions: [5000, 10000],
                features: [
                  'Unlimited email templates',
                  'Attachments up to 2mb',
                  'Whitelist',
                  'Unlimited contacts',
                  'Completely white label',
                  'Suppressions list',
                  'Multi-user access',
                  'Priority support'
                ],
                featured: true
              },
              {
                name: 'BUSINESS',
                subtitle: 'Best for Small Business',
                price: billingCycle === 'monthly' ? '$40' : '$384',
                cycle: billingCycle === 'monthly' ? '/month' : '/year',
                requests: 'monthly requests',
                requestOptions: [25000, 50000, 100000, 200000],
                features: [
                  'Unlimited email templates',
                  'Attachments up to 30mb',
                  'Whitelist',
                  'Unlimited contacts',
                  'Completely white label',
                  'Suppressions list',
                  'Multi-user access',
                  'Priority support'
                ]
              }
            ].map((plan) => (
              <div
                key={plan.name}
                className={`border-2 rounded-s-24 p-s-40 transition-all ${
                  plan.featured
                    ? 'border-accent/60 bg-accent/5'
                    : 'border-border/40 hover:border-border/60'
                }`}
              >
                <div className="mb-s-32">
                  <h3 className="text-s-18 font-black text-text-primary tracking-wider mb-s-8">{plan.name}</h3>
                  <p className="text-s-13 text-text-secondary mb-s-28">{plan.subtitle}</p>
                  <div className="flex items-baseline gap-s-6 mb-s-16">
                    <span className="text-s-48 font-black text-text-primary">{plan.price}</span>
                    <span className="text-s-14 text-text-secondary">{plan.cycle}</span>
                  </div>
                  <p className="text-s-13 text-text-muted">{plan.requests}</p>
                </div>

                {plan.requestOptions && Array.isArray(plan.requestOptions) && (
                  <div className="mb-s-32 pb-s-32 border-b border-border/40">
                    <div className="flex justify-between gap-s-12 mb-s-20">
                      {(plan.requestOptions as number[]).map((option: number) => (
                        <div key={option} className="flex flex-col items-center flex-1">
                          <input
                            type="radio"
                            name={`${plan.name}-requests`}
                            defaultChecked={option === (plan.requestOptions as number[])[0]}
                            className="w-s-18 h-s-18 cursor-pointer mb-s-8"
                          />
                          <span className="text-s-12 text-text-secondary text-center font-semibold">{option.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-s-12 text-text-muted text-center">monthly requests</p>
                  </div>
                )}

                <div className="space-y-s-16 mb-s-40">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-s-12">
                      <Check className="w-s-18 h-s-18 text-accent flex-shrink-0 mt-s-2" />
                      <span className="text-s-13 text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan.featured ? 'primary' : 'secondary'}
                  className="w-full"
                  size="lg"
                  onClick={() => setSelectedPlan(plan)}
                >
                  Get {plan.name}
                </Button>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="border-2 border-border/40 rounded-s-20 p-s-32 bg-bg-card/50 text-center">
            <div className="flex items-center justify-center gap-s-12 mb-s-16">
              <div className="w-s-20 h-s-20 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <Check className="w-s-12 h-s-12" />
              </div>
              <p className="text-s-14 text-text-secondary">
                All plans include API access, detailed analytics, and dedicated support. <span className="text-accent font-semibold">Cancel anytime.</span>
              </p>
            </div>
            <p className="text-s-12 text-text-muted">Need a custom plan? <button className="text-accent hover:underline font-semibold">Contact our sales team</button></p>
          </div>
        </div>
      </main>

      {/* Checkout Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-s-20">
          <div className="bg-bg-card border border-border/40 rounded-s-16 max-w-s-1000 w-full max-h-[90vh] overflow-hidden">
            <div className="grid grid-cols-2 min-h-s-600">
              {/* Left: Order Summary */}
              <div className="border-r border-border/40 p-s-48">
                <h2 className="text-s-18 font-black text-text-primary mb-s-48">Order summary</h2>
                
                <div className="mb-s-40">
                  <div className="text-s-32 font-black text-accent mb-s-8">
                    ${billingCycle === 'monthly' ? selectedPlan.price.replace('$', '') : selectedPlan.price.replace('$', '')}
                  </div>
                  <p className="text-s-12 text-text-muted">
                    {billingCycle === 'monthly' ? 'inc. GST' : 'inc. GST'}
                  </p>
                  <p className="text-s-12 text-text-secondary mt-s-8">
                    then {billingCycle === 'monthly' ? '$' + selectedPlan.price.replace('$', '') : '$' + selectedPlan.price.replace('$', '')} {billingCycle === 'monthly' ? 'monthly' : 'yearly'}
                  </p>
                </div>

                <div className="border-t border-border/40 pt-s-24 mb-s-40">
                  <div className="flex items-start gap-s-16 mb-s-24">
                    <div className="w-s-40 h-s-40 bg-accent/20 rounded-s-8 flex items-center justify-center flex-shrink-0">
                      <Check className="w-s-20 h-s-20 text-accent" />
                    </div>
                    <div>
                      <p className="text-s-13 font-semibold text-text-primary mb-s-4">{selectedPlan.name} Plan / {billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}</p>
                      <p className="text-s-11 text-text-secondary">{selectedPlan.requests}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-s-12 border-t border-border/40 pt-s-24 mb-s-32">
                  <div className="flex justify-between text-s-13">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="text-text-primary font-semibold">${(parseFloat(selectedPlan.price.replace('$', '')) * 0.8).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-s-13">
                    <span className="text-text-secondary">GST</span>
                    <span className="text-text-primary font-semibold">${(parseFloat(selectedPlan.price.replace('$', '')) * 0.2).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border/40 pt-s-12 mt-s-12">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Due today</span>
                      <span className="text-text-primary font-black">${selectedPlan.price.replace('$', '')}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-s-12">
                    <span className="text-text-muted">Due on {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                    <span className="text-text-primary font-semibold">${selectedPlan.price.replace('$', '')}</span>
                  </div>
                </div>
              </div>

              {/* Right: Checkout Form */}
              <div className="p-s-48 bg-bg-card/50 relative">
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="absolute top-s-24 right-s-24 p-s-8 hover:bg-bg-base rounded-s-8 transition-colors"
                >
                  <X className="w-s-20 h-s-20 text-text-secondary" />
                </button>

                <div className="mb-s-48">
                  <div className="flex gap-s-24 mb-s-32 border-b border-border/40 pb-s-20">
                    <button 
                      onClick={() => setCheckoutTab('details')}
                      className={`text-s-14 font-semibold pb-s-8 transition-colors ${checkoutTab === 'details' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary hover:text-text-primary'}`}
                    >
                      Your details
                    </button>
                    <button 
                      onClick={() => setCheckoutTab('payment')}
                      className={`text-s-14 font-semibold pb-s-8 transition-colors ${checkoutTab === 'payment' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary hover:text-text-primary'}`}
                    >
                      Payment
                    </button>
                  </div>
                </div>

                {/* Your Details Tab */}
                {checkoutTab === 'details' && (
                  <>
                    <p className="text-s-12 text-text-secondary mb-s-32">We collect this information to help combat fraud, and to keep your payment secure.</p>

                    <div className="space-y-s-28 max-h-[calc(90vh-s-400)] overflow-y-auto">
                      <div>
                        <label className="block text-s-12 font-semibold text-text-secondary mb-s-8">Email address *</label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-s-12 font-semibold text-text-secondary mb-s-8">Country *</label>
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          className="w-full px-s-16 py-s-12 bg-bg-base/50 border border-border/40 rounded-s-8 text-s-13 text-text-primary focus:border-accent outline-none"
                        >
                          <option value="">Select country</option>
                          <option value="India">India</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-s-12 font-semibold text-text-secondary mb-s-8">ZIP/Postcode *</label>
                        <Input
                          type="text"
                          placeholder="135102"
                          value={formData.zipcode}
                          onChange={(e) => setFormData({...formData, zipcode: e.target.value})}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={() => setCheckoutTab('payment')}
                      className="w-full mt-s-48 py-s-16 bg-accent text-white rounded-s-8 font-bold text-s-14 hover:bg-accent/90 transition-all"
                    >
                      Continue
                    </button>
                  </>
                )}

                {/* Payment Tab */}
                {checkoutTab === 'payment' && (
                  <>
                    <div className="space-y-s-32 max-h-[calc(90vh-s-400)] overflow-y-auto">
                      {/* PayPal Option */}
                      <div>
                        <button className="w-full px-s-20 py-s-16 border-2 border-accent/30 rounded-s-8 flex items-center justify-center hover:border-accent transition-colors mb-s-16">
                          <div className="flex items-center gap-s-8">
                            <div className="text-s-18 font-black text-accent">₽ PayPal</div>
                          </div>
                        </button>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-border/40"></div>
                        </div>
                        <div className="relative flex justify-center text-s-12">
                          <span className="px-s-12 bg-bg-card text-text-muted">Or pay by card</span>
                        </div>
                      </div>

                      {/* Card Payment */}
                      <div className="space-y-s-20">
                        <div>
                          <label className="block text-s-12 font-semibold text-text-secondary mb-s-8">Card number</label>
                          <Input
                            type="text"
                            placeholder="XXXX XXXX XXXX XXXX"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                            className="w-full"
                          />
                          <div className="flex gap-s-8 justify-end mt-s-8 text-s-10">
                            <span className="text-accent">VISA</span>
                            <span className="text-text-secondary">MC</span>
                            <span className="text-text-secondary">AMEX</span>
                            <span className="text-text-secondary">JCB</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-s-12 font-semibold text-text-secondary mb-s-8">Name on card</label>
                          <Input
                            type="text"
                            placeholder="Full name"
                            value={formData.cardName}
                            onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                            className="w-full"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-s-20">
                          <div>
                            <label className="block text-s-12 font-semibold text-text-secondary mb-s-8">Expiration date</label>
                            <Input
                              type="text"
                              placeholder="MM / YY"
                              value={formData.cardExpiry}
                              onChange={(e) => setFormData({...formData, cardExpiry: e.target.value})}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-s-12 font-semibold text-text-secondary mb-s-8">Security code</label>
                            <div className="relative">
                              <Input
                                type="text"
                                placeholder="CVV"
                                value={formData.cardCVV}
                                onChange={(e) => setFormData({...formData, cardCVV: e.target.value})}
                                className="w-full"
                              />
                              <button className="absolute right-s-12 top-s-10 text-text-secondary hover:text-text-primary">?</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-s-48 py-s-16 bg-accent text-white rounded-s-8 font-bold text-s-14 hover:bg-accent/90 transition-all">
                      Subscribe now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}