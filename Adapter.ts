namespace Adapter {
  interface Engine {
    simpleStart(): void;
  }

  class EngineV4 implements Engine {
    simpleStart() {
      console.log('V4 started');
    }
  }

  class EngineV8 {
    complicatedStart() {
      console.log('V8 started');
    }
  }

  class EngineV8Adapter implements Engine {
    private engine: EngineV4;

    constructor(engine: EngineV4) {
      this.engine = engine;
    }
    simpleStart() {
      this.engine.simpleStart();
    }
  }

  function clientCode(engine: Engine) {
    engine.simpleStart();
  }

  const oldEngine = new EngineV4();
  clientCode(oldEngine); // OK

  const newEngine = new EngineV8();
  // clientCode(newEngine); Error

  const adapter = new EngineV8Adapter(oldEngine);
  clientCode(adapter); // OK
}
