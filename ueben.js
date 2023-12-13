"use strict"

// let waren =  [
//     "Äpfel",
//     "Bannen",
//     "Birnen",
//     "Möhren",
//     "Salerie",
//     "Kohl",
//     "Birnen",
//     "Möhren",
//     "Birnen",
//     "Möhren"
// ];

// for (let i in waren){
//     console.log(i);
//     console.log(waren[i])
// }
// for (let e of waren){
//     console.log(e);
// }


let waren2 = [
    [
        // [
        //     "Affen",
        //     "Bohnen",
        //     "Hurensohn",
        //     "MöhGurkenren",
        //     "Schneggen",
        //     "Kuh",
        //     "Bär",
        //     "Schneggen"
        // ],
        "Äpfel",
        "Bannen",
        "Birnen",
        "Möhren",
        "Salerie",
        "Kohl",
        "Birnen",
        "Möhren",
        "Birnen",
        "Möhren"
    ],
    [
        "Affen",
        "Bohnen",
        "Huren",
        "MöhGurkenren",
        "Schnggen",
        "Kuh"
    ],
    [
        "Äpfel",
        "Bannen",
        "Birnen",
        "Möhren",
        "Salerie",
        "Kohl",
        "Kohl"
    ]
];


let o1 = {
    0: "null",
    1: "eins",
    2: "zwei",
    der: "wert",
    das: "noch",
    3: "drei",
    4: "vier"
}


for(let e of Object.values(o1)){
    console.log(e);
}