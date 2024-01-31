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

    setCity(city: string) {
      this.user.city = city;
      return this;
    }

    setAge(age: number) {
      this.user.age = age;
      return this;
    }

    build() {
      return this.user;
    }
  }

  const user = new UserBuilder("Alex").setAge(24).setCity("London").build();

  console.log(user);
}
