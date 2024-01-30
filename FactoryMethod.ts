namespace FactoryMethod {
  export enum EmployeeTypes {
    Developer,
    Tester,
  }

  export abstract class Employee {
    name: string;
    type!: EmployeeTypes;

    constructor(name: string) {
      this.name = name;
    }
  }

  export class Developer extends Employee {
    constructor(name: string) {
      super(name);
      this.type = EmployeeTypes.Developer;
    }
  }

  export class Tester extends Employee {
    constructor(name: string) {
      super(name);
      this.type = EmployeeTypes.Tester;
    }
  }

  export class EmployeeFactory {
    static create(name: string, type: EmployeeTypes) {
      switch (type) {
        case EmployeeTypes.Developer:
          return new Developer(name);
        case EmployeeTypes.Tester:
          return new Tester(name);
        default:
          throw new Error('Invalid EmployeeType');
      }
    }
  }
}

const employees: FactoryMethod.Employee[] = [];

employees.push(
  FactoryMethod.EmployeeFactory.create(
    'John',
    FactoryMethod.EmployeeTypes.Developer
  )
);
employees.push(
  FactoryMethod.EmployeeFactory.create(
    'Sam',
    FactoryMethod.EmployeeTypes.Tester
  )
);

console.log(employees);
