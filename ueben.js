"use strict"

const mindestalter = 18;

let eingabe = prompt(`Wie alt bist du:`);

if (eingabe > mindestalter){
    console.log(`Du bist alt genug mein lieber!`)
}else if (eingabe == mindestalter){
    console.log(`Du bist gerade 18 Jahre geworden mein lieber!`)
}else {
    console.log(`Zu jung kleiner!`);
}