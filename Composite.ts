namespace Composite {
  interface Item {
    getPrice: () => number;
  }

  class Box implements Item {
    private items: Item[] = [];

    addItems(...items: Item[]) {
      items.forEach((item) => this.items.push(item));
    }

    getPrice() {
      return this.items.reduce(
        (curSum, curProduct) => curSum + curProduct.getPrice(),
        0
      );
    }
  }

  class Product implements Item {
    private price: number;

    constructor(price: number) {
      this.price = price;
    }

    getPrice() {
      return this.price;
    }
  }

  const box1 = new Box();
  const box2 = new Box();
  box2.addItems(new Product(10), new Product(25));
  box1.addItems(box2, new Product(40));

  console.log(box1.getPrice()); // 75
}
