interface String {
    bbSize(size: number): string;
    bbAlign(align: string): string;
    bbURL(url: string): string;
    bbImage(hover?: string): string;
    bbColour(colour: string): string;
};

interface Array<T> {
    getUnique(): Array<T>;
    randomPick(): T;
    isPalindrome(): boolean;
};

Array.prototype.getUnique = function<T>(): T {
    return this.filter((val: T, idx: number, arr: Array<T>) => arr.indexOf(val) === idx);
}

Array.prototype.randomPick = function<T>(): T {
    return this[Math.floor(Math.random() * this.length)];
}

Array.prototype.isPalindrome = function<T>(): boolean {
    for(let i = 0; i <= Math.floor(this.length/2); i++)
        if (this[i] !== this[this.length - i - 1])
            return false;

    return true;
}

console.log([1, 2, 3, 2, 1].isPalindrome());
console.log([1, 2, 2, 1].isPalindrome());
console.log([1, 2, 3, 2].isPalindrome());
console.log([1, 2, 3].isPalindrome());

String.prototype.bbSize = function(size: number): string {
    return "[size=" + size + "]" + this.toString() + "[/size]";
}

String.prototype.bbAlign = function(align: string): string {
    return "[align=" + align + "]" + this.toString() + "[/align]";
}

String.prototype.bbURL = function(url: string): string {
    return "[url=" + url + ']' + this.toString() + "[/url]"
}

String.prototype.bbImage = function(hover?: string): string {
    return "[img" + (hover ? '=' + hover : "") + ']' + this.toString() + "[/img]";
}

String.prototype.bbColour = function(colour: string): string {
    return "[color=" + colour + ']' + this.toString() + "[/color]";
}