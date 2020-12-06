export interface FancyDigitConfig {
    digitSets: string[][];
    hoverText?: string;
    url?: string;
    digitChooser(digit: number, digits: number[], index: number, digitSets: string[][]): string;
    digitBase: number;
};

export interface Config {
    fancyDigitConfig: FancyDigitConfig;
    nices: string[];
    newPageEmojis: string[];
    quickTexts: {text: string, value: string | {(): string}}[];
    testing: boolean;
};

export let digitChooserPresets = [
    (digit: number, digits: number[], index: number, digitSets: string[][]) => { //plain chooser
        return digitSets[0][digit];
    },
    (digit: number, digits: number[], index: number, digitSets: string[][]) => { //interlaced
        return digitSets[index % 2][digit];
    },
    (digit: number, digits: number[], index: number, digitSets: string[][]) => { //cerfe's nonzero finder thing
        let nzIndex = 0;
        digits.reverse().forEach((d, i) => { if (d === 0) nzIndex = i + 1; });
        nzIndex = (digits.length - 1) - nzIndex;
        digits.reverse();
        
        if (index >= nzIndex)
            return digitSets[1][digit];
        else
            return digitSets[0][digit];
    }
];

export let digitSetPresets: string[][] = [
    //0
    [ //Shimmie2 digits (rule34 (paheal) runs it). Used by me(daswf852) and caitsith
        "https://mei.animebytes.tv/x1dEkFZKZps.gif",
        "https://mei.animebytes.tv/bnb60Tz8ZNN.gif",
        "https://mei.animebytes.tv/uy9okFjAxZR.gif",
        "https://mei.animebytes.tv/vv3Ca74RDEU.gif",
        "https://mei.animebytes.tv/OUSyO464lR8.gif",
        "https://mei.animebytes.tv/z9SJ4Q7iCuu.gif",
        "https://mei.animebytes.tv/Ja51PIgKTuI.gif",
        "https://mei.animebytes.tv/QDtXWy3TEf1.gif",
        "https://mei.animebytes.tv/LKogZHBk8z1.gif",
        "https://mei.animebytes.tv/PKxtjSBHRSo.gif",
    ],
    //1
    [ //mario kart wii digits (red). Stolen from Cerfe
        "https://mei.animebytes.tv/GoNnQmqpo9q.png",
        "https://mei.animebytes.tv/PSn3VBd8BHb.png",
        "https://mei.animebytes.tv/yO9Ao3cxs9B.png",
        "https://mei.animebytes.tv/i7Sx2MXnEwh.png",
        "https://mei.animebytes.tv/R9ndr8nnqQa.png",
        "https://mei.animebytes.tv/CDtrpqNDVGW.png",
        "https://mei.animebytes.tv/NzaNCisppBP.png",
        "https://mei.animebytes.tv/ZemEFwuCBEa.png",
        "https://mei.animebytes.tv/CKx0MyneGzC.png",
        "https://mei.animebytes.tv/g465lPrAMjl.png",
    ],
    //2
    [ //mario kart wii digits (blue). Stolen from Cerfe
        "https://mei.animebytes.tv/vBhoqb8midp.png",
        "https://mei.animebytes.tv/ZgURCRf6G5d.png",
        "https://mei.animebytes.tv/OPPkZBkGe6K.png",
        "https://mei.animebytes.tv/6kfoAIDPuLV.png",
        "https://mei.animebytes.tv/jDH2t4eDChL.png",
        "https://mei.animebytes.tv/Mx3rsvU5zio.png",
        "https://mei.animebytes.tv/wTOiZ1kZNEj.png",
        "https://mei.animebytes.tv/O6TWGgGtbe6.png",
        "https://mei.animebytes.tv/8ZfOPHaEPZb.png",
        "https://mei.animebytes.tv/bDxkDbErkMz.png",
    ],
    //3
    [ //Kaktovik Iñupiaq digits, from Alaskan Iñupiat. used by hennusk
        "https://mei.animebytes.tv/Aa25k9Ssb2s.png",
        "https://mei.animebytes.tv/L8kTVcMYCeq.png",
        "https://mei.animebytes.tv/ZRUEPlDjXOA.png",
        "https://mei.animebytes.tv/RW5FRPqb8nO.png",
        "https://mei.animebytes.tv/0WcqW7T2OC2.png",
        "https://mei.animebytes.tv/b1eOibkTKpG.png",
        "https://mei.animebytes.tv/EVUelcsf6Nh.png",
        "https://mei.animebytes.tv/oUmHTbDUwoh.png",
        "https://mei.animebytes.tv/sDbdV4YXlvP.png",
        "https://mei.animebytes.tv/woLN5JaBQuk.png",
        "https://mei.animebytes.tv/k6Gt3oZScdC.png",
        "https://mei.animebytes.tv/AIIyivbVJIB.png",
        "https://mei.animebytes.tv/fvFNajIjSWY.png",
        "https://mei.animebytes.tv/whbNAE7YR0w.png",
        "https://mei.animebytes.tv/p8zeXn0xpIZ.png",
        "https://mei.animebytes.tv/2JpT1QfpUb2.png",
        "https://mei.animebytes.tv/4nQTv0Gm7Lp.png",
        "https://mei.animebytes.tv/bFR9NJad4nY.png",
        "https://mei.animebytes.tv/JOuWrURjU9g.png",
        "https://mei.animebytes.tv/AUfAwjj4Hos.png",
    ],
    //4
    [ //geblooru b0.2 digits, ran by rule34 (xxx one). stolen from CYMA
        "https://mei.animebytes.tv/bkPOEVfttTj.gif",
        "https://mei.animebytes.tv/zwzYpntMlyz.gif",
        "https://mei.animebytes.tv/FehaCYRLlIj.gif",
        "https://mei.animebytes.tv/QVsA08Qm2e9.gif",
        "https://mei.animebytes.tv/nxqlDOO7SRN.gif",
        "https://mei.animebytes.tv/yHaQ2grDaRA.gif",
        "https://mei.animebytes.tv/PKs0ENWAzqT.gif",
        "https://mei.animebytes.tv/aQC8Us708Ij.gif",
        "https://mei.animebytes.tv/ekGiJ5g15yS.gif",
        "https://mei.animebytes.tv/VuZsA3fUkRU.gif",
    ]
];

export let defaultConfig: Config = {
    fancyDigitConfig: {
        digitSets: [digitSetPresets[0]],
        hoverText: "Click me for cool music",
        url: "https://www.youtube.com/watch?v=cPCLFtxpadE",
        digitChooser: digitChooserPresets[0],
        digitBase: 10,
    },
    nices: ["( ͡° ͜ʖ ͡°)", "nice", ";)", "͡° ͜ʖ ͡ ", "😉", "Nice!", "niceeee", "👌 niice", "[i]niiiice[/i]", "N I C E", "noice!"],
    newPageEmojis: [ "✨","🍾","🎉","🎈", "🎆","🎇","🥳","🎊","🙌","🤗","👏","🍷","🍹","🍭","🍬","👻","🍰","🎂","🍡","🍩","🧁","🍨","💃","🤸","🍸","🍻","🥂","🍺","🎵","🎶"],
    quickTexts: [
        {text: "test", value: "this is a test"},
        {text: "test2", value: () => { return "this is also a test"; }},
    ],
    testing: false,
};
Object.freeze(defaultConfig);