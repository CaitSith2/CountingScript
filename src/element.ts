import * as Utils from "./utils";

export class Element {
    private node: Node;

    constructor(node: Node) {
        this.node = node;
    }

    public GetNode() {
        return this.node;
    }
};

export class Paragraph extends Element {
    constructor(text: string, id?: string) {
        let elem = document.createElement("p");
        elem.innerHTML = text;
        if (id)
            elem.id = id;
        
        super(elem);
    }
};

export class Button extends Element {
    constructor(text: string, callback?: { (): void }, id?: string) {
        let elem = document.createElement("input");
        elem.type = "button"
        elem.className = "btn";
        elem.value = text;
        if (callback)
            elem.onclick = callback;
        if (id)
            elem.id = id;
        super(elem);
    }
};

export class NumberInput extends Element {
    private static numberInputs: {[index: string]: number} = {};

    constructor(id: string, defValue: number = 1, min: number = 1, step: number = 1, max?: number) {
        let elem = document.createElement("input") as HTMLInputElement;
        elem.type = "number";
        elem.id = id;
        elem.value = defValue.toString();
        elem.min = min.toString();
        elem.step = step.toString();
        if (max)
            elem.max = max.toString();
        
        elem.oninput = ev => NumberInput.numberInputs[id] = parseInt(elem.value);

        super(elem);
    }

    public static GetInput(id: string): number | undefined {
        return NumberInput.numberInputs[id];
    }
};

export class Selection extends Element {
    private static selectionIndices: {[index: string]: number} = {};

    constructor(name: string, id: string, selections: string[]) {
        let node = document.createElement("select");
        node.name = name;
        node.id = id;

        selections.forEach((value, idx) => {
            let option = document.createElement("option");
            option.value = idx.toString();
            option.innerHTML = value;
            node.appendChild(option);
        });

        node.onchange = ev => Selection.selectionIndices[id] = (ev.target as HTMLSelectElement).selectedIndex;

        super(node);

        Selection.selectionIndices[id] = 0;
    }

    public static GetSelection(id: string): number | undefined {
        return Selection.selectionIndices[id];
    }
}