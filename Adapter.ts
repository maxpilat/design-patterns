namespace Adapter {
  interface IEngine {
    simpleStart(): void;
  }

  class EngineV4 implements IEngine {
    simpleStart() {
      console.log('V4 started');
    }
  }

  class EngineV8 {
    complicatedStart() {
      console.log('V8 started');
    }
  }

  class EngineV8Adapter implements IEngine {
    private engine: EngineV4;

    constructor(engine: EngineV4) {
      this.engine = engine;
    }

    simpleStart() {
      this.engine.simpleStart();
    }
  }

  function clientCode(engine: IEngine) {
    engine.simpleStart();
  }

  const oldEngine = new EngineV4();
  clientCode(oldEngine); // OK

  const newEngine = new EngineV8();
  // clientCode(newEngine); Error

  const adapter = new EngineV8Adapter(oldEngine);
  clientCode(adapter); // OK
}
