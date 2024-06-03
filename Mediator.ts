namespace Mediator {
  interface IMediator {
    notify(sender: string, event: string): void;
  }

  class Mediator implements IMediator {
    constructor(
      private component1: Component1,
      private component2: Component2
    ) {
      this.component1.setMediator(this);
      this.component2.setMediator(this);
    }

    notify(sender: string, event: string): void {
      if (event === 'A') {
        console.log(
          `Mediator reacts on A from ${sender} and triggers following operatons:`
        );
        this.component2.doC();
      } else if (event === 'D') {
        console.log(
          `Mediator reacts on D from ${sender} and triggers following operatons:`
        );
        this.component1.doB();
        this.component2.doC();
      }
    }
  }

  class BaseComponent {
    constructor(protected mediator?: IMediator) {}

    setMediator(mediator: IMediator) {
      this.mediator = mediator;
    }
  }

  class Component1 extends BaseComponent {
    doA() {
      console.log('Component 1 does A');
      this.mediator?.notify('Component 1', 'A');
    }

    doB() {
      console.log('Component 1 does B');
      this.mediator?.notify('Component 1', 'B');
    }
  }

  class Component2 extends BaseComponent {
    doC() {
      console.log('Component 2 does C');
      this.mediator?.notify('Component 2', 'C');
    }

    doD() {
      console.log('Component 2 does D');
      this.mediator?.notify('Component 2', 'D');
    }
  }

  (function clientCode() {
    const component1 = new Component1();
    const component2 = new Component2();

    const mediator = new Mediator(component1, component2);

    component1.setMediator(mediator);
    component2.setMediator(mediator);

    console.log('Client triggers operation A');
    component1.doA();

    console.log('');

    console.log('Client triggers operation D');
    component2.doD();
  })();
}
