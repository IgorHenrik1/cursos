class Person {
    age = 0;
    steps = 0;
    constructor(name, age) {
        this.name = name;
    }

    takeAStep() {
        this.steps++;
    }

    setAge(newAge) {
        if (typeof newAge == 'number') {
            this.age = newAge;
        }
    }
}
// instancias
let p1 = new Person('joao', 20);
let p2 = new Person('Maria', 30);
let p3 = new Person('Pedro', 40);

console.log(p1);
console.log(p2);
console.log(p3);

p1.takeAStep();
console.log(`Idade de ${p1.name}: ${p2.age}`);
console.log(`Passos de ${p1.name}: ${p1.steps}`);

p1.setAge(22);
console.log(`Nova idade de ${p1.name}: ${p1.age}`);
