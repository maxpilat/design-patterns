namespace Command {
  interface ICommand {
    execute(): void;
  }

  class SimpleCommand implements ICommand {
    constructor(private payload: string) {}

    execute() {
      console.log('SimpleCommand: ' + this.payload);
    }
  }

  class ComplexCommand implements ICommand {
    constructor(
      private receiver: Receiver,
      private arg1: string,
      private arg2: string
    ) {}

    execute() {
      console.log(
        'ComplexCommand: Complex stuff should be done by a receiver object:'
      );
      this.receiver.action1(this.arg1);
      this.receiver.action2(this.arg2);
    }
  }

  class Invoker {
    private onStart!: ICommand;
    private onFinish!: ICommand;

    setOnStart(command: ICommand) {
      this.onStart = command;
    }

    setOnFinish(command: ICommand) {
      this.onFinish = command;
    }

    doSomething() {
      console.log('Invoker: Start');
      this.onStart.execute();
      console.log('Invoker: Finish');
      this.onFinish.execute();
    }
  }

  class Receiver {
    action1(arg: string) {
      console.log(`Receiver: working on action1 with ${arg}`);
    }

    action2(arg: string) {
      console.log(`Receiver: Working on action2 with ${arg}`);
    }
  }

  (function clientCode() {
    const invoker = new Invoker();
    const receiver = new Receiver();

    const simpleCommand = new SimpleCommand('Hi!');
    const complexCommand = new ComplexCommand(receiver, 'arg1', 'arg2');

    invoker.setOnStart(simpleCommand);
    invoker.setOnFinish(complexCommand);

    invoker.doSomething();
  })();
}
