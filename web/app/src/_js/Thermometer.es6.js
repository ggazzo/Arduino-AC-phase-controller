export default class Thermometer {
    constructor(target) {
        this.controllerRange = target.querySelector(".meter__range");
        this.amount = target.querySelector(".on");
        this.total = target.querySelector(".count");
    }
    value(value) {
        this.amount.style.height = (value * 100 / 110) + "%";
        this.total.innerHTML = value + "º";
    }
}
