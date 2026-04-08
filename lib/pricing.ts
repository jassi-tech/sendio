export interface Plan {
  id: string;
  name: string;
  price: number | null;
  description: string;
  color: string;
  popular: boolean;
  features: string[];
}

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 199,
    description: "Perfect for small projects and freelancers",
    color: "from-blue-500 to-cyan-500",
    popular: false,
    features: [
      "1,000 emails per month",
      "Basic analytics",
      "Email templates",
      "Standard API access",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 499,
    description: "For growing businesses and teams",
    color: "from-indigo-500 to-purple-500",
    popular: true,
    features: [
      "5,000 emails per month",
      "10 team members",
      "Advanced analytics",
      "Custom templates",
      "Priority support",
      "API access",
      "Custom integrations",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    description: "For large organizations with custom needs",
    color: "from-violet-500 to-pink-500",
    popular: false,
    features: [
      "20,000 emails per month",
      "Unlimited team members",
      "Enterprise analytics",
      "White-label solution",
      "24/7 phone support",
      "Advanced API access",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
    ],
  },
];

export const getPrice = (price: number | null, isYearly: boolean) => {
  if (price === null) return null;
  return isYearly ? Math.floor(price * 12 * 0.8) : price;
};
