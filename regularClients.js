const clientsArray = {
    "Keeley Bosco":{email:"katlyn@jenkinsmaggio.net",city:"Lake Gladysberg",creditcard:"1228-1221-1221-1431",level:"gold",day:14,month:6},
    "Rubye Jerde":{email:"juvenal@johnston.name",city:null,creditcard:"1228-1221-1221-1431",level:"silver",day:24,month:3},
    "Miss Darian Breitenberg":{email:null,city:null,creditcard:null,level:"gold",day:5,month:5},
    "Celine Ankunding":{email:"emery_kunze@rogahn.net",city:null,"creditcard":"1228-1221-1221-1431",level:"gold",day:14,month:6},
    "Dr. Araceli Lang":{email:"mavis_lehner@jacobi.name",city:"Yvettemouth","creditcard":"1211-1221-1234-2201",level:"silver",day:14,month:6},
    "Esteban Von":{email:null,city:null,creditcard:null,level:"silver",day:14,month:6},
    "Everette Swift":{email:"gielle_jacobs@flatleyboehm.biz",city:null,"creditcard":null, level:"silver",day:14,month:6},
    "Terrell Boyle":{email:"augustine.conroy@keebler.name",city:"Port Reaganfort",creditcard:"1228-1221-1221-1431",level:"silver",day:8,month:6},
    "Miss Emmie Muller":{email:null,city:"Kaleyhaven",creditcard:null,level:"platinum",day:14,month:6},
    "Libby Renner":{email:null,city:"Port Reneeside",creditcard:"1234-2121-1221-1211",level:"platinum",day:14,month:6},
    "Kris Spencer":{email:null,city:null,creditcard:null,level:"silver"}
};
const privilegeProperties = {
    silver:{ sendNewProducts: true, sendPromotions:true, discount:0.85},
    gold:{ sendNewProducts: false, sendPromotions:true,discount:0.9},
    platinum:{sendNewProducts: false, sendPromotions:true,discount:0.95},
    bronze:{sendNewProducts: false, sendPromotions:true,discount:0.97}
}
export {
    clientsArray,
    privilegeProperties
}
