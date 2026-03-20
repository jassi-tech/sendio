'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowLeft, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { plans, getPrice } from '@/lib/pricing';
import { PricingCard } from '@/components/pricing/PricingCard';

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
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [showPromoInput, setShowPromoInput] = useState(false);

  const isYearly = billingCycle === 'yearly';
  const basePrice = getPrice(selectedPlan?.price, isYearly) || 0;
  const discount = appliedPromo ? (appliedPromo.type === 'percentage' ? basePrice * (appliedPromo.value / 100) : appliedPromo.value) : 0;
  const finalPrice = Math.max(0, basePrice - discount);

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
                <h1 className="text-s-48 font-black text-text-primary mb-s-16 tracking-tight">Choose your next level</h1>
                <p className="text-s-16 text-text-secondary max-w-s-600">Upgrade your infrastructure to handle more scale and unlock advanced deliverability features.</p>
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center gap-s-32 mb-s-48">
              <span className={`text-s-16 font-semibold transition-colors ${!isYearly ? 'text-text-primary' : 'text-text-muted'}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(isYearly ? 'monthly' : 'yearly')}
                className="relative inline-flex h-s-40 w-s-72 items-center rounded-full bg-bg-card border border-border transition-colors hover:border-accent/40"
              >
                <div
                  className={`inline-block h-s-32 w-s-32 transform rounded-full bg-gradient-to-br from-accent to-accent-dim shadow-lg transition-transform ${
                    isYearly ? 'translate-x-s-36' : 'translate-x-s-2'
                  }`}
                />
              </button>
              <div className="flex items-center gap-s-12">
                <span className={`text-s-16 font-semibold transition-colors ${isYearly ? 'text-accent' : 'text-text-muted'}`}>
                  Yearly
                </span>
                <div className="bg-success/15 border border-success/30 px-s-12 py-s-4 rounded-full">
                  <span className="text-s-11 font-extrabold text-success tracking-wide uppercase">20% OFF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-s-40 items-stretch mb-s-80">
            {plans.filter(p => p.id !== 'free').map((plan, idx) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isYearly={isYearly}
                index={idx}
                ctaText="Purchase Plan"
                onSelect={(pid) => setSelectedPlan(plans.find(p => p.id === pid))}
              />
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
                    ${getPrice(selectedPlan.price, isYearly)}
                  </div>
                  <p className="text-s-12 text-text-muted">
                    inc. GST
                  </p>
                  <p className="text-s-12 text-text-secondary mt-s-8">
                    then ${getPrice(selectedPlan.price, isYearly)} {isYearly ? 'yearly' : 'monthly'}
                  </p>
                </div>

                <div className="border-t border-border/40 pt-s-24 mb-s-40">
                  <div className="flex items-start gap-s-16 mb-s-24">
                    <div className="w-s-40 h-s-40 bg-accent/20 rounded-s-8 flex items-center justify-center flex-shrink-0">
                      <Check className="w-s-20 h-s-20 text-accent" />
                    </div>
                    <div>
                      <p className="text-s-13 font-semibold text-text-primary mb-s-4">{selectedPlan.name} Plan / {isYearly ? 'Yearly' : 'Monthly'}</p>
                      <p className="text-s-11 text-text-secondary">{selectedPlan.features[0]}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-s-12 border-t border-border/40 pt-s-24 mb-s-32">
                  <div className="flex justify-between text-s-13">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="text-text-primary font-semibold">${(finalPrice * 0.8).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-s-13">
                    <span className="text-text-secondary">GST (20%)</span>
                    <span className="text-text-primary font-semibold">${(finalPrice * 0.2).toFixed(2)}</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-s-13 text-success font-medium bg-success/5 p-s-12 rounded-s-8 border border-success/20">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  {!showPromoInput && !appliedPromo && (
                    <button 
                      onClick={() => setShowPromoInput(true)}
                      className="text-s-12 text-accent hover:text-accent-dim font-semibold transition-colors mt-s-8"
                    >
                      Have a promo code?
                    </button>
                  )}

                  {showPromoInput && !appliedPromo && (
                    <div className="flex gap-s-8 mt-s-8">
                      <Input 
                        placeholder="Enter code" 
                        value={promoCode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPromoCode(e.target.value.toUpperCase())}
                        className="flex-1 text-s-12 py-s-8"
                      />
                      <Button 
                        size="sm" 
                        onClick={() => {
                          if (promoCode === 'SAVE20') {
                            setAppliedPromo({ code: 'SAVE20', type: 'percentage', value: 20 });
                            setShowPromoInput(false);
                          } else {
                            alert('Invalid promo code');
                          }
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                  
                  <div className="border-t border-border/40 pt-s-12 mt-s-12">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Due today</span>
                      <span className="text-text-primary font-black text-s-20">${finalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-s-12">
                    <span className="text-text-muted">Due on {new Date(Date.now() + (isYearly ? 365 : 30) * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                    <span className="text-text-primary font-semibold">${finalPrice.toFixed(2)}</span>
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
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-s-12 font-semibold text-text-secondary mb-s-8">Country *</label>
                        <div className="relative">
                          <select
                            value={formData.country}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, country: e.target.value})}
                            className="w-full px-s-16 py-s-12 bg-bg-elevated border border-border/40 rounded-s-8 text-s-13 text-text-primary focus:border-accent outline-none appearance-none cursor-pointer pr-s-40"
                          >
                            <option value="" className="bg-bg-elevated text-text-primary">Select country</option>
                            <option value="India" className="bg-bg-elevated text-text-primary">India</option>
                            <option value="USA" className="bg-bg-elevated text-text-primary">USA</option>
                            <option value="UK" className="bg-bg-elevated text-text-primary">UK</option>
                            <option value="Canada" className="bg-bg-elevated text-text-primary">Canada</option>
                            <option value="Australia" className="bg-bg-elevated text-text-primary">Australia</option>
                          </select>
                          <div className="absolute right-s-16 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-s-12 h-s-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-s-12 font-semibold text-text-secondary mb-s-8">ZIP/Postcode *</label>
                        <Input
                          type="text"
                          placeholder="135102"
                          value={formData.zipcode}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, zipcode: e.target.value})}
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, cardNumber: e.target.value})}
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, cardName: e.target.value})}
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
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, cardExpiry: e.target.value})}
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
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, cardCVV: e.target.value})}
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