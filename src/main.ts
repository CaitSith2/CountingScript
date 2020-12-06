import "./extensions";
import * as Config from "./config";
import * as Utils from "./utils";
import {Element, Paragraph, Button, NumberInput, Selection} from "./element";

class State {
    textBox?: HTMLTextAreaElement;
    submitButton?: HTMLInputElement;
    quickPostForm?: HTMLFormElement;
    layoutDiv: HTMLDivElement;
    currentPageNum: number = NaN;
    lastPageNum: number = NaN;
    postCount: number = NaN;

    constructor() {
        this.UpdateElems();
        let pageNumbers = document.querySelector(".pagenums");
        let posts = document.querySelectorAll(".post_block");
        
        if (pageNumbers !== undefined) {
            this.lastPageNum = parseInt(pageNumbers.lastChild.textContent);
            if (this.lastPageNum === NaN)
                this.lastPageNum = parseInt(pageNumbers.children[pageNumbers.children.length - 3].textContent);
            
            let noLinkPage = pageNumbers.querySelector(".nolink");
            if (noLinkPage !== undefined)
                this.currentPageNum = parseInt(noLinkPage.lastChild.textContent);
        }

        if (posts !== undefined) {
            this.postCount = posts.length;
        }

        this.layoutDiv = Utils.HTMLNodeFromText("<div style='display: block;text-align: center;padding:10px 10px 10px 10px;' class='' id='utilityButtons'></div>") as HTMLDivElement;
    }

    private UpdateElems(): void {
        this.textBox = document.querySelector("#quickpost") as HTMLTextAreaElement;
        this.submitButton = document.querySelector("#post_button") as HTMLInputElement;
        this.quickPostForm = document.querySelector("#quickpostform") as HTMLFormElement;
    }

    OnLastPage(): boolean {
        return this.currentPageNum === this.lastPageNum;
    }

    NextNumber(lenient: boolean = true): number {
        if (!lenient && !this.OnLastPage())
            return NaN;
        
        return 25 * (this.currentPageNum - 1) + this.postCount + 1;
    }

    AppendText(text: string): void {
        this.UpdateElems();
        if (this.textBox)
            this.textBox.value = this.textBox.value + text;
    }

    FocusToText(): void {
        this.UpdateElems();
        if (this.textBox)
            this.textBox.focus();
    }

    SubmitText(): void {
        this.UpdateElems();
        if (this.submitButton)
            this.submitButton.click();
    }

    InsertElementLayout(layout: Element[][]): void {
        this.UpdateElems();
        let br = Utils.HTMLNodeFromText("<br style='display:block;margin:5px;0'/>") as HTMLBRElement;
        
        layout.forEach((row, rowIndex) => {
            let startLength = this.layoutDiv.childNodes.length;
    
            row.forEach((elem, elemIndex) => {
                if (elem instanceof Button) {
                    //if (elem.type === EButtonType.Testing && !config.testing)
                    //    return;
                    this.layoutDiv.appendChild(elem.GetNode());
                } else if (elem instanceof Element) {
                    this.layoutDiv.appendChild(elem.GetNode());
                }
    
                if (elemIndex !== (row.length - 1))
                    this.layoutDiv.appendChild(document.createTextNode(' '));
            });
    
            if ((rowIndex !== (layout.length - 1)) && (startLength != this.layoutDiv.childNodes.length))
                this.layoutDiv.appendChild(br.cloneNode(true));
        });
    
    
        this.quickPostForm.appendChild(this.layoutDiv);
    }
};

let config = Object.assign({}, Config.defaultConfig);
let state = new State();

{
    let digits_digitSetPresets: number[] | undefined = GM_getValue("digits_digitSetPresets", undefined);
    let digits_hoverText: string | undefined = GM_getValue("digits_hoverText", undefined);
    let digits_url: string | undefined = GM_getValue("digits_url", undefined);
    let digits_digitChooserPreset: number | undefined = GM_getValue("digits_digitChooserPreset", undefined);
    let digits_digitBase: number | undefined = GM_getValue("digits_digitBase", undefined);
    let nices: string[] | undefined = GM_getValue("nices", undefined);
    let npEmojis: string[] | undefined = GM_getValue("npEmojis", undefined);
    let quickTexts: string[][] | undefined = GM_getValue("quickTexts", undefined);

    if (digits_digitSetPresets !== undefined) {
        config.fancyDigitConfig.digitSets = [];
        digits_digitSetPresets.forEach(val => config.fancyDigitConfig.digitSets.push(Config.digitSetPresets[val]));
    }

    if (digits_hoverText !== undefined) config.fancyDigitConfig.hoverText = digits_hoverText;
    if (digits_url !== undefined) config.fancyDigitConfig.url = digits_url;
    if (digits_digitChooserPreset !== undefined) config.fancyDigitConfig.digitChooser = Config.digitChooserPresets[digits_digitChooserPreset];
    if (digits_digitBase !== undefined) config.fancyDigitConfig.digitBase = digits_digitBase;
    if (nices !== undefined) config.nices = nices;
    if (npEmojis !== undefined) config.newPageEmojis = npEmojis;

    if (quickTexts !== undefined) {
        config.quickTexts = [];
        quickTexts.forEach(val => config.quickTexts.push({text: val[0], value: val[1]}));
    }
}

function DummyParagraph() {
    return new Paragraph("dummy string");
}

function DummyButton() {
    return new Button("dummy button");
}

let nextNumButton = new Button(
    "Next num",
    () => {
        state.AppendText(state.NextNumber() + '\n');
        state.FocusToText();
    },
    "nextNumButton",
);

let quickNumButton = new Button(
    "Append n' send",
    () => {
        state.AppendText(state.NextNumber() + '\n');
        state.FocusToText();
        state.SubmitText();
    },
    "quickNumButton",
);

let fancyNextNumButton = new Button(
    "Fancy",
    () => {
        FancyAppend();
    },
    "fancyNumButton",
);

let customNumberInput = new NumberInput(
    "customNumberInput",
    state.NextNumber()
);

let fancyCustomNumButton = new Button(
    "Custom Fancy",
    () => {
        FancyAppend(NumberInput.GetInput("customNumberInput"));
    },
    "fancyCustomNumButton",
);

let quickTextSelection = new Selection(
    "Quick text selection",
    "quickTextSelection",
    config.quickTexts.map(val => val.text),
);

let quickTextInsertButton = new Button(
    "Insert",
    () => {
        let selectionIdx = Selection.GetSelection("quickTextSelection");
        
        let selection = config.quickTexts[selectionIdx];

        if (typeof selection.value === "string")
            state.AppendText(selection.value);
        else if (typeof selection.value === "function")
            state.AppendText(selection.value());
        
        state.FocusToText();
    },
    "quickTextInsertButton",
);

let cerfeTestButton = new Button(
    "Test Cerfe's numbers",
    () => {
        let configSave = config;
        config.fancyDigitConfig.digitSets[0] = Config.digitSetPresets[1];
        config.fancyDigitConfig.digitSets[1] = Config.digitSetPresets[2];
        config.fancyDigitConfig.digitBase = 10;
        config.fancyDigitConfig.digitChooser = Config.digitChooserPresets[2];
        FancyAppend(12300);
        FancyAppend(1230);
        config = configSave;
    },
    "cerfeTestButton",
);

let hennuskTestButton = new Button(
    "Test hennusk's numbers",
    () => {
        let configSave = config;
        config.fancyDigitConfig.digitSets[0] = Config.digitSetPresets[3];
        config.fancyDigitConfig.digitSets[1] = Config.digitSetPresets[3];
        config.fancyDigitConfig.digitBase = 20;
        config.fancyDigitConfig.digitChooser = Config.digitChooserPresets[0];
        FancyAppend(177285); //12345
        FancyAppend(1019380); //67890
        FancyAppend(1693074); //ABCDE
        FancyAppend(2535179); //FGHIJ
        config = configSave;
    },
    "hennuskTestButton",
);

let nextUniqueNumbersParagraph = new Paragraph(
    (() => {
        let str = "Next 5 unique numbers: ";
        Utils.NextNDigitiallyUnique(state.NextNumber(), 5, true, true).forEach(val => str += val + ", ");
        return str.slice(0, -2);
    })(),
);

let timeLeftParagraph = new Paragraph(
    (() => {
        if (state.NextNumber() === NaN)
            return "An unknown amount of time is left. (couldn't find post no)";
        
        let startTimestamp = 1255376820000;
        let currentTimestamp = new Date().getTime();
        let diff = currentTimestamp - startTimestamp;
        let currentPostNo = state.NextNumber() - 1;
        let millisecondsPerPost = diff / currentPostNo;
        let hoursLeft = (millisecondsPerPost * (1000000 - currentPostNo)) / (1000 * 60 * 60);
        
        return Math.floor(hoursLeft/24) + " days are left. That makes around " + Math.floor(hoursLeft/24/365.25*10)/10 + " years.";    
    })(),
    undefined,
);

let layout: Element[][] = [
    [nextNumButton, fancyNextNumButton, quickNumButton],
    [customNumberInput, fancyCustomNumButton],
    [quickTextSelection, quickTextInsertButton],
    [nextUniqueNumbersParagraph],
    [timeLeftParagraph],
];

if (config.testing) {
    layout.push([cerfeTestButton, hennuskTestButton]);
}
state.InsertElementLayout(layout);

function FancyAppend(num?: number): void {
    if (!num)
        num = state.NextNumber();
    state.AppendText(Utils.GetFancyText(num, Config.defaultConfig) + "\n\n");
    state.FocusToText();
}