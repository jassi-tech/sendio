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
    id: "free",
    name: "Free",
    price: 0,
    description: "Ideal for testing and evaluation",
    color: "from-gray-500 to-gray-700",
    popular: false,
    features: [
      "200 emails per month",
      "1 team member",
      "Basic analytics",
      "Standard templates",
      "Community support",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 29,
    description: "Perfect for small projects and freelancers",
    color: "from-blue-500 to-cyan-500",
    popular: false,
    features: [
      "10,000 emails per month",
      "2 team members",
      "Basic analytics",
      "Email templates",
      "24/7 email support",
      "API access",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 99,
    description: "For growing businesses and teams",
    color: "from-indigo-500 to-purple-500",
    popular: true,
    features: [
      "100,000 emails per month",
      "10 team members",
      "Advanced analytics",
      "Custom templates",
      "Priority support",
      "API access",
      "Custom integrations",
      "Dedicated IP address",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    description: "For large organizations with custom needs",
    color: "from-violet-500 to-pink-500",
    popular: false,
    features: [
      "Unlimited emails",
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
