"use client";

import { Mail, Globe, MapPin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface FormData {
  email: string;
  country: string;
  zipcode: string;
  cardName: string;
}

interface DetailsFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onContinue: () => void;
}

export function DetailsForm({
  formData,
  setFormData,
  onContinue,
}: DetailsFormProps) {
  const isValid = !!(formData.email && formData.country && formData.zipcode);

  return (
    <div className="flex flex-col">
      <p className="text-s-13 text-text-secondary mb-s-32 leading-relaxed">
        Please confirm your billing details. We collect this information to help
        combat fraud and to keep your payment secure.
      </p>

      <div className="space-y-s-24">
        {/* Email */}
        <div className="space-y-s-8">
          <label className="block text-s-12 font-bold text-text-secondary uppercase tracking-wider">
            Email address *
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-s-16 pt-s-12 flex items-center pointer-events-none text-text-muted group-focus-within:text-accent transition-colors">
              <Mail className="w-s-18 h-s-18" />
            </div>
            <Input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full pl-s-48 py-s-12 transition-all focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* Country */}
        <div className="space-y-s-8">
          <label className="block text-s-12 font-bold text-text-secondary uppercase tracking-wider">
            Country *
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-s-16 pt-s-12 flex items-center pointer-events-none text-text-muted group-focus-within:text-accent transition-colors">
              <Globe className="w-s-18 h-s-18" />
            </div>
            <select
              value={formData.country}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="w-full pl-s-48 pr-s-40 py-s-12 bg-bg-elevated border border-border/40 rounded-s-8 text-s-13 text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none appearance-none cursor-pointer transition-all shadow-sm"
            >
              <option value="">Select country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
            <div className="absolute right-s-16 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-s-12 h-s-12 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ZIP */}
        <div className="space-y-s-8">
          <label className="block text-s-12 font-bold text-text-secondary uppercase tracking-wider">
            ZIP/Postcode *
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-s-16 pt-s-12 flex items-center pointer-events-none text-text-muted group-focus-within:text-accent transition-colors">
              <MapPin className="w-s-18 h-s-18" />
            </div>
            <Input
              type="text"
              placeholder="e.g. 135102"
              value={formData.zipcode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, zipcode: e.target.value })
              }
              className="w-full pl-s-48 py-s-12 transition-all focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-s-48">
        <button
          onClick={onContinue}
          disabled={!isValid}
          className={`group w-full flex items-center justify-center gap-s-8 py-s-16 bg-bg-elevated border border-border rounded-s-8 font-bold text-s-14 transition-all ${
            isValid
              ? "text-text-primary hover:text-accent hover:border-accent/40 cursor-pointer"
              : "text-text-muted opacity-50 cursor-not-allowed"
          }`}
        >
          Continue to Payment
          <ArrowRight className="w-s-16 h-s-16 group-hover:translate-x-s-4 transition-transform" />
        </button>
      </div>
    </div>
  );
}
