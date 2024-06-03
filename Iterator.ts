namespace Iterator {
  interface IIterator<T> {
    current(): T;
    next(): T;
    index(): number;
    isValid(): boolean;
    rewind(): void;
  }

  interface ICollection<T> {
    getItems(): T[];
    getCount(): number;
    addItem(item: T): void;
    getIterator(): IIterator<T>;
    getReverseIterator(): IIterator<T>;
  }

  class Iterator implements IIterator<string> {
    private position = 0;

    constructor(private collection: Collection, private isReversed: boolean = false) {
      if (isReversed) this.position = this.collection.getCount() - 1;
    }

    current(): string {
      return this.collection.getItems()[this.position];
    }

    next(): string {
      const item = this.collection.getItems()[this.position];
      this.position += this.isReversed ? -1 : 1;
      return item;
    }

    index(): number {
      return this.position;
    }

    isValid(): boolean {
      if (this.isReversed) return this.position >= 0;
      return this.position < this.collection.getCount();
    }

    rewind(): void {
      if (this.isReversed) this.position = this.collection.getCount() - 1;
      else this.position = 0;
    }
  }

  class Collection implements ICollection<string> {
    private items: string[] = [];

    getItems(): string[] {
      return this.items;
    }

    getCount(): number {
      return this.items.length;
    }

    addItem(item: string): void {
      this.items.push(item);
    }

    getIterator(): IIterator<string> {
      return new Iterator(this);
    }

    getReverseIterator(): IIterator<string> {
      return new Iterator(this);
    }
  }

  (function clientCode() {
    const collection = new Collection();

    collection.addItem("item-1");
    collection.addItem("item-2");
    collection.addItem("item-3");

    const iterator = new Iterator(collection);

    while (iterator.isValid()) console.log(iterator.next());
  })();
}
