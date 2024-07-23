namespace Strategy {
  class Context {
    private strategy: IStrategy;

    constructor(strategy: IStrategy) {
      this.strategy = strategy;
    }

    public setStrategy(strategy: IStrategy) {
      this.strategy = strategy;
    }

    public doSomeBusinessLogic(): void {
      console.log(
        "Context: Sorting data using the strategy (not sure how it'll do it)"
      );
      const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
      console.log(result.join(','));
    }
  }

  interface IStrategy {
    doAlgorithm(data: string[]): string[];
  }

  class StrategyA implements IStrategy {
    public doAlgorithm(data: string[]): string[] {
      return data.sort();
    }
  }

  class StrategyB implements IStrategy {
    public doAlgorithm(data: string[]): string[] {
      return data.reverse();
    }
  }

  (function clientCode() {
    const context = new Context(new StrategyA());
    console.log('Client: Strategy is set to normal sorting.');
    context.doSomeBusinessLogic();

    console.log('');

    console.log('Client: Strategy is set to reverse sorting.');
    context.setStrategy(new StrategyB());
    context.doSomeBusinessLogic();
  })();
}
