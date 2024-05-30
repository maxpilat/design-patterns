namespace Bridge {
  interface IShape {
    draw(): void;
  }

  interface IDrawAPI {
    drawCircle(x: number, y: number, radius: number): void;
  }

  class DrawAPI1 implements IDrawAPI {
    drawCircle(x: number, y: number, radius: number): void {
      console.log(`API1: Drawing circle at (${x}, ${y}) with radius ${radius}`);
    }
  }

  class DrawAPI2 implements IDrawAPI {
    drawCircle(x: number, y: number, radius: number): void {
      console.log(`API2: Drawing circle at (${x}, ${y}) with radius ${radius}`);
    }
  }

  class Circle implements IShape {
    private x: number;
    private y: number;
    private radius: number;
    private drawAPI: IDrawAPI;

    constructor(x: number, y: number, radius: number, drawingAPI: IDrawAPI) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.drawAPI = drawingAPI;
    }

    draw() {
      this.drawAPI.drawCircle(this.x, this.y, this.radius);
    }
  }

  (function clientCode() {
    const circle1 = new Circle(1, 2, 3, new DrawAPI1());
    const circle2 = new Circle(5, 7, 11, new DrawAPI2());

    circle1.draw(); // API1: Drawing circle at (1, 2) with radius 3
    circle2.draw(); // API2: Drawing circle at (5, 7) with radius 11
  })();
}
