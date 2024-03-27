namespace AbstractFactory {
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

  abstract class EmployeeFactory {
    abstract createEmployee(name: string): Employee;
  }

  class DeveloperFactory extends EmployeeFactory {
    createEmployee(name: string): Employee {
      return new Developer(name);
    }
  }

  class TesterFactory extends EmployeeFactory {
    createEmployee(name: string): Employee {
      return new Tester(name);
    }
  }

  const developerFactory = new DeveloperFactory();
  const testerFactory = new TesterFactory();

  const employees: Employee[] = [];

  employees.push(developerFactory.createEmployee('Mike'));
  employees.push(testerFactory.createEmployee('Calvin'));

  console.log(employees); // [Developer { name: 'Mike', type: 0 }, Tester { name: 'Calvin', type: 1 }]
}
