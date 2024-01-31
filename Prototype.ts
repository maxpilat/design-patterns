namespace Prototype {
  class Prototype {
    greeting: string;

    constructor() {
      this.greeting = "Hello";
    }

    greet() {
      console.log(this.greeting);
    }

    clone() {
      return new Prototype();
    }
  }

  const proto1 = new Prototype();
  const proto2 = proto1.clone();
  proto2.greeting = "Hi";

  proto1.greet(); // "Hello"
  proto2.greet(); // "Hi"
}
