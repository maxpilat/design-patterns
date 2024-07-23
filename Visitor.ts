namespace Visitor {
  abstract class Component {
    accept(visitor: IVisitor) {
      visitor.visit(this);
    }
  }

  class ComponentA extends Component {
    infoA() {
      return 'ComponentA';
    }
  }

  class ComponentB extends Component {
    infoB() {
      return 'ComponentB';
    }
  }

  interface IVisitor {
    visit(component: Component): void;
  }

  class Visitor {
    visit(component: Component) {
      if (component instanceof ComponentA) {
        console.log(component.infoA() + ' has been visited.');
      } else if (component instanceof ComponentB) {
        console.log(component.infoB() + ' has been visited.');
      }
    }
  }

  (function clientCode() {
    const visitor = new Visitor();

    const component1 = new ComponentA();
    const component2 = new ComponentB();

    component1.accept(visitor);
    component2.accept(visitor);
  })();
}
