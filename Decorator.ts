namespace Decorator {
  interface IPlan {
    getPrice(): number;
    getDescription(): string;
  }

  class Plan implements IPlan {
    private name: string;
    private price = 100;

    constructor(name: string) {
      this.name = name;
    }

    getName() {
      return this.name;
    }

    getPrice(): number {
      return this.price;
    }

    getDescription() {
      return 'Plan ' + this.name;
    }
  }

  class PremiumPlan implements IPlan {
    plan: Plan;

    constructor(plan: Plan) {
      this.plan = plan;
    }

    getPrice(): number {
      return this.plan.getPrice() + 50;
    }

    getDescription() {
      return 'Premium Plan ' + this.plan.getName();
    }
  }

  const simplePlan = new Plan('Gold');
  console.log(simplePlan.getDescription()); // Plan Gold

  const premiumPlan = new PremiumPlan(simplePlan);
  console.log(premiumPlan.getDescription()); // Premium Plan Gold
}
