namespace Flyweight {
  type TTreeProps = {
    name: string;
    color: string;
    texture: string;
  };

  class TreeType {
    private props: TTreeProps;

    constructor(props: TTreeProps) {
      this.props = props;
    }

    draw(x: number, y: number) {
      console.log(
        `Drawing tree of type ${this.props.name} at (${x}, ${y}) with color ${this.props.color} and texture ${this.props.texture}`
      );
    }
  }

  class TreeFactory {
    private treeTypes: Map<string, TreeType> = new Map();

    getTreeType(props: TTreeProps) {
      const key = `${props.name}_${props.color}_${props.texture}`;
      if (!this.treeTypes.has(key))
        this.treeTypes.set(key, new TreeType(props));
      return this.treeTypes.get(key) as TreeType;
    }
  }

  class Tree {
    constructor(private x: number, private y: number, private type: TreeType) {
      this.x = x;
      this.y = y;
      this.type = type;
    }

    draw() {
      this.type.draw(this.x, this.y);
    }
  }

  class Forest {
    private trees: Tree[] = [];
    private treeFactory = new TreeFactory();

    plantTree(x: number, y: number, props: TTreeProps) {
      const type = this.treeFactory.getTreeType(props);
      const tree = new Tree(x, y, type);
      this.trees.push(tree);
    }

    draw() {
      this.trees.forEach((tree) => tree.draw());
    }
  }

  (function clientCode() {
    const forest = new Forest();

    forest.plantTree(1, 1, {
      name: 'Oak',
      color: 'green',
      texture: 'Rough',
    });
    forest.plantTree(2, 3, {
      name: 'Pine',
      color: 'Dark Green',
      texture: 'Smooth',
    });
    forest.plantTree(3, 5, { name: 'Oak', color: 'green', texture: 'Rough' }); // an existing type is used

    forest.draw();
  })();
}
