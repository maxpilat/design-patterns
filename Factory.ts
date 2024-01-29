enum EmployeeTypes {
  Developer,
  Tester,
}

class Employee {
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
  static create = (name: string, type: EmployeeTypes) => {
    switch (type) {
      case EmployeeTypes.Developer:
        return new Developer(name);
      case EmployeeTypes.Tester:
        return new Tester(name);
      default:
        throw new Error('Invalid EmployeeType');
    }
  };
}

const employees: Employee[] = [];

employees.push(EmployeeFactory.create('John', EmployeeTypes.Developer));
employees.push(EmployeeFactory.create('Sam', EmployeeTypes.Tester));

console.log(employees);
