namespace Composite {
  interface IItem {
    getPrice: () => number;
  }

  class Box implements IItem {
    private items: IItem[] = [];

    addItems(...items: IItem[]) {
      items.forEach((item) => this.items.push(item));
    }

    getPrice() {
      return this.items.reduce(
        (curSum, curProduct) => curSum + curProduct.getPrice(),
        0
      );
    }
  }

  class Product implements IItem {
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
