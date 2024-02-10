// Create and use a type guard
function exercise29() {
  type TWidget = {
    name: string;
  };
  type TGadget = {
    os: string;
  };
  type TThing = TWidget | TGadget;

  // TODO: implement isWidget function to be a type guard
  function isWidget(arg: TThing): arg is TWidget {
    return (arg as TWidget).name !== undefined;
  }
  console.log(isWidget({ name: 'widget' }));

  function printThingDescription(arg: TThing) {
    console.log(arg);
    if (isWidget(arg)) {
      console.log(arg.name);
    } else {
      console.log(arg.os);
    }
  }
  printThingDescription({ name: 'widget' });
  printThingDescription({ os: 'android' });
}
exercise29();

// Create an overloaded function definitions
function exercise30() {
  type TWidget = {
    name: string;
    cost?: number;
  };
  type TGadget = {
    os: string;
    cost?: number;
  };
  type TThing = TWidget | TGadget;

  // TODO: add function overloading here to ensure that function return type matches the input value type
  function assignWidgetCost(obj: TWidget): TWidget;
  function assignWidgetCost(obj: TGadget): TGadget;
  function assignWidgetCost(obj: TThing): TThing {
    obj.cost = 100;

    return obj;
  }

  // TODO: fix problem - typeof a: TThing, not TWidget
  const a = assignWidgetCost({ name: 'widget' });
  // TODO: fix same here - typeof b: TThing, not TGadget
  const b = assignWidgetCost({ os: 'android' });

  console.log(a, b);
}
exercise30();

// Create call signatures
function exercise31() {
  // TODO: implement handleSaveUserSubmit function with function overrides
  function handleSaveUserSubmit(
    firstName: string,
    lastName: string,
    email?: string,
  ) {
    console.log(firstName, lastName, email);
  }
  handleSaveUserSubmit('John', 'Smith');

  // TODO: add call signatures here. Add overrides for optional email param
  type TSaveUserCallback = (
    firstName: string,
    lastName: string,
    email?: string,
  ) => void;
  // TODO: implement handleSaveUserSubmit function with this type
  const handleSaveUserSubmit2: TSaveUserCallback = (
    firstName,
    lastName,
    email,
  ) => {
    console.log(firstName, lastName, email);
  };
  // TODO: add call signatures here. Add overrides for optional email param
  interface ISaveUserCallback {
    (firstName: string, lastName: string, email?: string): void;
  }
  // TODO: implement handleSaveUserSubmit function with this type and interface
  const handleSaveUserSubmit3: ISaveUserCallback = (
    firstName,
    lastName,
    email,
  ) => {
    console.log(firstName, lastName, email);
  };

  function createForm(onSubmit: TSaveUserCallback) {
    const firstName = 'John';
    const lastName = 'Smith';
    // TODO: uncomment the following line
    onSubmit(firstName, lastName);
  }
  // TODO: remove type assertion, fix the error
  createForm(handleSaveUserSubmit2);

  function createForm2(onSubmit: ISaveUserCallback) {
    const firstName = 'John';
    const lastName = 'Smith';
    const email = 'jsmith@somemail.some.com';

    // TOOD: uncomment the following line
    onSubmit(firstName, lastName, email);
  }
  // TODO: remove type assertion, fix the error
  createForm2(handleSaveUserSubmit3);

  // *** add constructor signatures here ***
  type TUserConstructor = {
    new (fullName: string): { fullName: string };
    new (firstName: string, lastName: string): { fullName: string };
  };
  function createAndPrintUser(ctor: TUserConstructor) {
    // TOOD: uncomment the following lines
    const user = new ctor('John Smith');
    console.log(user);
  }
  // TODO: create instance of TUserConstructor type
  const userConstructor: TUserConstructor = class {
    constructor(public fullName: string) {}
  };
  // TODO: update the following line, call createAndPrintUser, pass the constructor
  createAndPrintUser(userConstructor);
}
exercise31();

// Create an abstract class and concrete classes
function exercise32() {
  // TODO: make this class abstract
  abstract class Animal {
    constructor(public name: string) {
      this.name = name;
    }
    abstract makeSound(): void;
    eat(): void {
      console.log('eating');
    }
  }
  // TODO: observe the error and comment out next 2 lines
  // const animal = new Animal('Rex');
  // console.log(animal.name);

  // TODO: inherit from Animal and implement makeSound method
  class Dog extends Animal {
    makeSound(): void {
      console.log('Woof!');
    }
  }
  // TODO: uncomment the following lines, fix the errors
  const myDog = new Dog('Buddy');
  myDog.eat();
  myDog.makeSound();
}
exercise32();

// Create a type for a dictionary with string keys and number values
function exercise33() {
  // TODO: create a type TDictionary, key is a string, value is a number
  type TDictionary = {
    [key: string]: number;
  };

  // TODO: const dictionary variable of TDictionary type, assign some values (1, 2, 3)
  const dictionary: TDictionary = {
    a: 1,
    b: 2,
    c: 3,
  };
  // TODO: uncomment the following lines, fix the errors
  dictionary['c'] = 3;
  // dictionary['d'] = '3'; // should cause an error error

  // TODO: implement a function that calculates number of characters
  // in a string using the dictionary type, and returns a most frequent character
  function getMostFrequentCharacter(str: string): string {
    const charCount: TDictionary = {};
    for (const char of str) {
      if (charCount[char]) {
        charCount[char]++;
      } else {
        charCount[char] = 1;
      }
    }

    let mostFrequentChar = '';
    let maxCount = 0;
    for (const char in charCount) {
      if (charCount[char] > maxCount) {
        maxCount = charCount[char];
        mostFrequentChar = char;
      }
    }

    return mostFrequentChar;
  }
  console.log(getMostFrequentCharacter('She sells seashells by the seashore.'));
}
exercise33();

// TODO: exporrt getMostFrequentCharacter function, and add a test for it in lesson7-homework.test.ts

type TDictionary = {
  [key: string]: number;
};

export function getMostFrequentCharacter(str: string): string {
  const charCount: TDictionary = {};
  for (const char of str) {
    if (charCount[char]) {
      charCount[char]++;
    } else {
      charCount[char] = 1;
    }
  }

  let mostFrequentChar = '';
  let maxCount = 0;
  for (const char in charCount) {
    if (charCount[char] > maxCount) {
      maxCount = charCount[char];
      mostFrequentChar = char;
    }
  }

  return mostFrequentChar;
}

// Use index signature and caching
function exercise34() {
  // TODO: Define a dictionary of student grades, add type definition using index signature
  // key is a student name, value is an array of grades (numbers)
  const studentGrades: { [key: string]: number[] } = {
    John: [100, 90, 80, 70, 90],
    Jane: [90, 80, 70, 60, 50],
    Jack: [80, 70, 60, 50, 40],
  };
  // TODO: Define a dictionary of cached results, add type definition using index signature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cachedResults: { [key: string]: number } = {};

  // TODO: Implement function to calculate the average grade for a student
  function calculateAverageGrade(studentName: string): number | string {
    // TODO: check if chached result exists, return it if it does

    if (cachedResults[studentName]) {
      // TODO: return cached result
      return cachedResults[studentName];
    } else {
      // TODO: calculate average grade
      const grades = studentGrades[studentName];
      if (!grades) return 'Студент не найден';
      const averageGrade =
        grades.reduce((acc, curr) => acc + curr, 0) / grades.length;
      // TODO: set cached result
      cachedResults[studentName] = averageGrade;
      // TODO: return average grade
      return averageGrade;
      return 0;
    }
  }

  for (const studentName in studentGrades) {
    console.log(`${studentName}: ${calculateAverageGrade(studentName)}`);
  }

  // TODO: find the student with the highest average grade
  let highestAverage = 0;
  let studentWithHighestAverage = '';
  for (const studentName in studentGrades) {
    const averageGrade = calculateAverageGrade(studentName);
    if (typeof averageGrade === 'number' && averageGrade > highestAverage) {
      highestAverage = averageGrade;
      studentWithHighestAverage = studentName;
    }
  }
  console.log(
    `Студент с наивысшей средней оценкой: ${studentWithHighestAverage}`,
  );
}
exercise34();

const test = 'test';
export default test;
