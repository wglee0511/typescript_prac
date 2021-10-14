interface Human {
  name: string;
  age: number;
  gender: string;
}

const person = {
  name: "h",
  age: 23,
  gender: "male",
};

const sayHi = (person: Human): string => {
  return `${person.name}, ${person.age}, ${person.gender}`;
};

export {};
