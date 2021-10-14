class Human {
  public name: string;
  public age: number;
  public gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const person = new Human("g", 23, "male");

const sayHi = (person: Human): string => {
  return `${person.name}, ${person.age}, ${person.gender}`;
};

export {};
