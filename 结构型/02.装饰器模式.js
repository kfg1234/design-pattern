// 在软件开发过程中，有时想用一些现存的组件。这些组件可能只是完成了一些核心功能。但在不改变其结构的情况下，可以动态地扩展其功能。所有这些都可以釆用装饰器模式

// 不改变现有对象结构的情况下，动态地给该对象增加一些职责（即增加其额外功能）的模式，它属于对象结构型模式

// 抽象一个Coffee类，用来生产咖啡
class Coffee {
    // constructor() {}
    make(water) {
        return water + "咖啡";
    }
    cost() {
        return 10;
    }
}

// 想要添加牛奶，则进行装饰
class MikeCoffee {
    constructor(parent) {
        this.parent = parent;
    }
    make(water) {
        return this.parent.make(water) + "牛奶";
    }
    cost() {
        return this.parent.cost + 5;
    }
}

// 想要添加牛奶，则进行装饰
class SugarCoffee {
    constructor(parent) {
        this.parent = parent;
    }
    make(water) {
        return this.parent.make(water) + "糖";
    }
    cost() {
        return this.parent.cost + 2;
    }
}

let coffee = new Coffee();
let milkCoffee = new MikeCoffee(coffee);
let sugarCoffee = new SugarCoffee(milkCoffee);

console.log(sugarCoffee.make("水"));

// 应用场景

// AOP 面向切面编程：在函数执行之前或之后添加一些额外的逻辑，而不需要修改函数的功能

function buy(money, goods) {
    console.log(`花${money}元买${goods}`);
}

Function.prototype.before = function (fn) {
    _this = this;
    return function () {
        // 执行buy之前，先执行传入的回调
        fn.apply(this, arguments);
        _this.apply(this, arguments);
    };
};

Function.prototype.after = function (fn) {
    _this = this;
    return function () {
        _this.apply(this, arguments);
        // 执行buy之后，执行传入的回调
        fn.apply(this, arguments);
    };
};

// buy = buy.before(() => {
//     console.log("买之前先拿钱");
// });

buy = buy.after(() => {
    console.log("买之后找零钱");
});

buy(10, "苹果");
