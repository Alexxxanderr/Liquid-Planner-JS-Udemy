"use strict"

let mymap = new Map();

mymap.set("Test", "Wert des Tests");

console.log(mymap);

mymap.set(14, "Zahl");

console.log(mymap);

mymap.set([], "Arraywert");

console.log(mymap);

mymap.set(function(){}, "Funtionswert");

console.log(mymap);

mymap.set({}, "Objektwert");

console.log(mymap + "\n--------------------------------");

mymap.forEach(function(wert,eigen,map){
    console.log(eigen);
    console.log(wert);
    // console.log(map);
});

console.log(mymap + "\n--------------------------------");


for (let paar of mymap){
    console.log(paar);
};

for (let [eigenschaft,wert] of mymap){
    console.log(eigenschaft);
    console.log(wert);
};

console.log("--------------------------------");

for (let [eigenschaft, wert] of mymap.entries()){
    console.log(eigenschaft);
    console.log(wert);
};

console.log("--------------------------------");

for (let eigenschaft of mymap.keys()){
    console.log(eigenschaft);
};

for (let eigenschaft of mymap.values()){
    console.log(eigenschaft);
};




console.log(mymap.get("Test"));
console.log(mymap.get(14));
console.log(mymap.get([]));
console.log(mymap.get(function(){}));
console.log(mymap.get({}));

console.log(mymap.has("Test"));
mymap.delete({});

console.log(mymap);

console.log(mymap.size);

mymap.clear();

console.log(mymap);

let myset = new Set();

console.log(myset);

myset.add("Wert");
myset.add("Wert");
myset.add(14);
myset.add([]);
myset.add([]);
myset.add(function(){});
myset.add(function(){});
myset.add({});
myset.add({});

console.log("------------------------------------------------------");

myset.forEach(function(werte){
    console.log(werte);
});


console.log("------------------------------------------------------");

for (let wert of myset){
    console.log(wert);
};


console.log(myset.has(14));
console.log(myset.has({}));
console.log(myset.has(7+7));

myset.clear();
console.log(myset.size);

console.log("------------------------------------------------------");


for (let eigenschaft of myset.values()){
    console.log(eigenschaft);
};



