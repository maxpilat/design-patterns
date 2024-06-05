namespace Memento {
  class Originator {
    private state: string;

    constructor() {
      this.state = this.generateRandomString();
      console.log(`Originator: My initial state is ${this.state}`);
    }

    doSomething(): void {
      console.log(`Originator: I'm doing something`);
      this.state = this.generateRandomString();
      console.log(`Originator: My state has changed to ${this.state}`);
    }

    generateRandomString(length: number = 10): string {
      return Math.random().toString(36).substring(2, length);
    }

    save() {
      return new Memento(this.state);
    }

    restore(memento: IMemento): void {
      this.state = memento.getState();
      console.log(`Originator: My state has changed to ${this.state}`);
    }
  }

  interface IMemento {
    getState(): string;
    getDate(): string;
    getName(): string;
  }

  class Memento implements IMemento {
    private date: string;

    constructor(private state: string) {
      this.date = new Date().toISOString().slice(0, 19).replace('T', '|');
    }

    getState(): string {
      return this.state;
    }

    getDate(): string {
      return this.date;
    }

    getName(): string {
      return this.date + ' / ' + this.state;
    }
  }

  class Caretaker {
    private history: IMemento[] = [];

    constructor(private originator: Originator) {}

    backup(): void {
      console.log(`Caretaker: Saving Originator's state`);
      this.history.push(this.originator.save());
    }

    undo(): void {
      if (!this.history.length) return console.log(`History is empty`);

      const memento = this.history.pop() as IMemento;
      console.log(`Caretaker: Restoring state to ${memento.getName()}`);
      this.originator.restore(memento);
    }

    showHistory(): void {
      console.log(`History list:`);
      this.history.forEach((memento) => console.log(memento.getName()));
    }
  }

  (function clientCode() {
    const originator = new Originator();
    const caretaker = new Caretaker(originator);

    console.log('');
    caretaker.backup();
    originator.doSomething();

    console.log('');
    caretaker.backup();
    originator.doSomething();

    console.log('');
    caretaker.showHistory();

    console.log(`\nClient: Let's rollback`);
    caretaker.undo();

    console.log(`\nClient: Let's rollback once more`);
    caretaker.undo();

    console.log(`\nClient: Let's rollback once more`);
    caretaker.undo(); // history is empty
  })();
}
