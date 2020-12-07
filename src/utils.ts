import "./extensions"
import * as Config from "./config"

export function GetDigits(num: number, base: number = 10): number[] {
    let digits = [];
    
    while (num !== 0) {
        digits.push(num % base);
        num /= base;
        num = Math.floor(num);
    }

    return digits.reverse();
}

export function HTMLNodeFromText(innerHTML: string): Node {
    let template = document.createElement("template");
    template.innerHTML = innerHTML;
    return template.content.firstChild.cloneNode(true);
}

export function IsDigitiallyUnique(num: number): boolean {
    let digits = GetDigits(Math.abs(num), 10);
    return digits.length === digits.getUnique().length;
}

export function NextDigitallyUnique(after: number, next: boolean = true, inclusive: boolean = false, haltAfter?: number): number | undefined {
    for (let i = ((inclusive) ? after : after + 1); (haltAfter ? Math.abs(after - i) <= haltAfter : true); i += ((next) ? 1 : -1))
        if (IsDigitiallyUnique(i))
            return i;
    return undefined;
}

export function NextNDigitiallyUnique(after: number, nNums: number, next: boolean = true, inclusive: boolean = false, haltAfter?: number) {
    let arr = [];
    if (!inclusive)
        ++after;

    for (let nthNum = 0; nthNum < nNums;) {
        if (IsDigitiallyUnique(after)) {
            arr.push(after);
            ++nthNum;
        }
        after += ((next) ? 1 : -1);
    }

    return arr;
}

export function IsPrime(num: number): boolean {
    if (num <= 1)
        return false;
    
    num = Math.round(num);
    
    if (num === 2)
        return true;
    
    if (num % 2 === 0)
        return false;
    
    for (let i = 3; i < Math.sqrt(num); i+=2)
        if (num % i === 0)
            return false;
    
    return true;
}

//fancy digit things

export function GetDigitText(digit: number, digits: number[], index: number, fdConfig: Config.FancyDigitConfig): string {
    let text = fdConfig.digitChooser(digit, digits, index, fdConfig.digitSets).bbImage(fdConfig.hoverText);
    if (fdConfig.url)
        return text.bbURL(fdConfig.url);
    else
        return text;
}

export function GetFancyText(num: number, config: Config.Config): string {
    let baseDigitImages = "";
    let digits: number[] = GetDigits(num, config.fancyDigitConfig.digitBase);

    digits.forEach((val: number, idx: number) => {
        baseDigitImages += GetDigitText(val, digits, idx, config.fancyDigitConfig);
    });

    let checks = [
        {name: "prime", func: IsPrime},
        {name: "nice", func: (n: number) => { return n % 100 === 69; }},
        {name: "unique", func: IsDigitiallyUnique},
        {name: "palindromic", func: (n: number) => { return GetDigits(n).isPalindrome(); } },
    ];

    let checksText = "";

    checks.forEach((val) => {
        let text = val.name;
        if (val.func(num))
            text = ("is " + text).bbColour("green");
        else
            text = ("isn't " + text).bbColour("red");
        
        checksText += text + " | ";
    });

    checksText = checksText.slice(0, -3);

    let subSubText = "";

    if (num % 100 === 69)
        subSubText = config.nices.randomPick();

    if ((num-1) % 25 === 0)
        subSubText = config.newPageEmojis.randomPick() + "NEW PAGE!" + config.newPageEmojis.randomPick();

    return (baseDigitImages + "\n" + num.toString().bbSize(1) + "\n" + checksText.bbSize(1) + "\n" + subSubText.bbSize(1)).bbAlign("center");
}
