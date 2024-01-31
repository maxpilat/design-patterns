namespace FactoryMethod {
  enum EmployeeTypes {
    Developer,
    Tester,
  }

  abstract class Employee {
    name: string;
    type!: EmployeeTypes;

    constructor(name: string) {
      this.name = name;
    }
  }

  class Developer extends Employee {
    constructor(name: string) {
      super(name);
      this.type = EmployeeTypes.Developer;
    }
  }

  class Tester extends Employee {
    constructor(name: string) {
      super(name);
      this.type = EmployeeTypes.Tester;
    }
  }

  class EmployeeFactory {
    static createEmployee(name: string, type: EmployeeTypes) {
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

  const employees: Employee[] = [];

  employees.push(
    EmployeeFactory.createEmployee('John', EmployeeTypes.Developer)
  );
  employees.push(EmployeeFactory.createEmployee('Sam', EmployeeTypes.Tester));

  console.log(employees);
}
