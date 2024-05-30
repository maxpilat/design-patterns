namespace Builder {
  class User {
    name: string;
    age!: number;
    city!: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  class UserBuilder {
    user: User;

    constructor(name: string) {
      this.user = new User(name);
    }

    setAge(age: number) {
      this.user.age = age;
      return this;
    }

    setCity(city: string) {
      this.user.city = city;
      return this;
    }

    build() {
      return this.user;
    }
  }

  (function clientCode() {
    const user = new UserBuilder('Alex').setAge(24).build();

    console.log(user); // User { name: 'Alex', age: 24 }
  })();
}
