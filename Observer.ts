namespace Observer {
  interface ISubject {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(): void;
  }

  class Subject implements ISubject {
    private state: number = Math.floor(Math.random() * (10 + 1));
    private observers: IObserver[] = [];

    getState() {
      return this.state;
    }

    attach(observer: IObserver): void {
      const isExist = this.observers.includes(observer);
      if (isExist) console.log('Subject: Observer has been attached already.');
      this.observers.push(observer);
      console.log('Subject: Attached an observer.');
    }

    detach(observer: IObserver): void {
      const observerIndex = this.observers.indexOf(observer);
      if (observerIndex === -1) console.log('Subject: Nonexistent observer.');
      this.observers.splice(observerIndex, 1);
      console.log('Subject: Detached an observer.');
    }

    notify(): void {
      console.log('Subject: Notifying observers.');
      this.observers.forEach((observer) => observer.update(this));
    }

    someBusinessLogic(): void {
      console.log("Subject: I'm doing something important.");
      this.state = Math.floor(Math.random() * (10 + 1));
      console.log(`Subject: My state has changed to <${this.state}>.`);
      this.notify();
    }
  }

  interface IObserver {
    update(subject: ISubject): void;
  }

  class ObserverA implements IObserver {
    update(subject: ISubject): void {
      if (subject instanceof Subject && subject.getState() < 3)
        console.log('ObserverA: Reacted to the event.');
    }
  }

  class ObserverB implements IObserver {
    update(subject: ISubject): void {
      if (
        subject instanceof Subject &&
        (subject.getState() === 0 || subject.getState() >= 2)
      )
        console.log('ObserverB: Reacted to the event.');
    }
  }

  (function clientCode() {
    const subject = new Subject();

    const observerA = new ObserverA();
    const observerB = new ObserverB();

    subject.attach(observerA);
    subject.attach(observerB);

    subject.someBusinessLogic();
    subject.someBusinessLogic();

    subject.detach(observerB);

    subject.someBusinessLogic();
  })();
}
