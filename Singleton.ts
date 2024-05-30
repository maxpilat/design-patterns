namespace Singleton {
  class Singleton {
    static instance: Singleton;

    private constructor() {
      console.log('Singleton instance created');
    }

    static getInstance() {
      // in context of a static method "Singleton." can be replaced with "this."
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }
      return Singleton.instance;
    }
  }

  (function clientCode() {
    const instance1 = Singleton.getInstance();
    const instance2 = Singleton.getInstance();

    console.log(instance1 === instance2); // true
  })();
}
