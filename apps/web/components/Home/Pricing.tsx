const plans = [
  {
    title: 'First Year',
    price: '$0',
    features: ['5 Scrolls', '100 Owls / month', '2 House Themes'],
  },
  {
    title: 'Prefect',
    price: '$9',
    featured: true,
    features: ['Unlimited Scrolls', 'Full Analytics', 'All Themes'],
  },
  {
    title: 'Headmaster',
    price: '$29',
    features: ['Team Members', 'Custom Themes', 'Priority Support'],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#110c02] px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[#c9a84c]">
            Gringotts Vault
          </p>

          <h2 className="mt-5 font-display text-5xl text-[#e8d5a3]">
            Simple magical pricing
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`border border-[rgba(201,168,76,0.2)] p-10 ${
                plan.featured ? 'bg-[#1e1500]' : 'bg-[#1a1200]'
              }`}
            >
              <h3 className="font-display text-xs uppercase tracking-[0.2em] text-[#9a8060]">
                {plan.title}
              </h3>

              <div className="mt-5 font-display text-6xl text-[#c9a84c]">
                {plan.price}
              </div>

              <div className="mt-8 space-y-3 text-[#9a8060]">
                {plan.features.map((feature) => (
                  <div key={feature}>✦ {feature}</div>
                ))}
              </div>

              <button className="mt-10 w-full border border-[#c9a84c] py-3 font-display text-xs uppercase tracking-[0.15em] text-[#c9a84c] transition hover:bg-[#c9a84c] hover:text-black">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}