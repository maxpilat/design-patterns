namespace TemplateMethod {
  abstract class AbstractClass {
    public templateMethod(): void {
      this.baseOperation1();
      this.requiredOperations1();
      this.baseOperation2();
      this.hook1();
      this.requiredOperation2();
      this.baseOperation3();
      this.hook2();
    }

    protected baseOperation1(): void {
      console.log('AbstractClass says: I am doing the bulk of the work');
    }

    protected baseOperation2(): void {
      console.log(
        'AbstractClass says: But I let subclasses override some operations'
      );
    }

    protected baseOperation3(): void {
      console.log(
        'AbstractClass says: But I am doing the bulk of the work anyway'
      );
    }

    protected abstract requiredOperations1(): void;

    protected abstract requiredOperation2(): void;

    protected hook1(): void {}

    protected hook2(): void {}
  }

  class Class1 extends AbstractClass {
    protected requiredOperations1(): void {
      console.log('ConcreteClass1 says: Implemented Operation1');
    }

    protected requiredOperation2(): void {
      console.log('ConcreteClass1 says: Implemented Operation2');
    }
  }

  class Class2 extends AbstractClass {
    protected requiredOperations1(): void {
      console.log('ConcreteClass2 says: Implemented Operation1');
    }

    protected requiredOperation2(): void {
      console.log('ConcreteClass2 says: Implemented Operation2');
    }

    protected hook1(): void {
      console.log('ConcreteClass2 says: Overridden Hook1');
    }
  }

  console.log('Same client code can work with different subclasses:');
  new Class1().templateMethod();

  console.log('');

  console.log('Same client code can work with different subclasses:');
  new Class2().templateMethod();
}
