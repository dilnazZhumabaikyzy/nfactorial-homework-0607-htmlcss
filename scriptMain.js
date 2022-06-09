
import {
    teaArray, 
    dessertArray 
    } from './mealDataBase.js';
import{
    clientsArray,
    privilegeProperties
    } from './regularClients.js';



console.log('           ____________________________________________________ ');
console.log('          |  SET TERMINAL WINDOW TO FULL FORMAT                |');
console.log('          |  TO ORDER WRIE COMMAND ./script order {$mealId...} |');
console.log('          |                                                    | ');
console.log('          |  EXAMPLE: ./script order D1                        |');
console.log('          |  EXAMPLE: ./script order D1 T0 T1 etc              |');
console.log('           ____________________________________________________');
console.log();
console.log();
console.log(`Welcome to Dalida's TeaShop`);
console.log(`\nMenu\nTea\n`);
console.log('ID'.padEnd(5)+'Name'.padEnd(50)+'kcal'.padEnd(10)+'cost'.padEnd(15)+'ingriedents\n');



const teaMenu = teaArray.map(teaObject => {
    let str = '';
    let ingridients ='';
    teaObject['ingridients'].forEach(ingridient => {
        if(!(teaObject['ingridients'].indexOf(ingridient)===0 || teaObject['ingridients'].indexOf(ingridient)=== (teaObject['ingridients'].length-1))){
            ingridients += ', '+ ingridient;             
        } else {
            ingridients += ingridient;
        }        
    });
    return `${teaObject['id'].padEnd(5)}+${teaObject['name'].padEnd(50)}${(teaObject['kcal'].toString()).padEnd(10)}${teaObject['cost'].toString().padEnd(15)}${ingridients}`;    
});

const dessertMenu = dessertArray.map(dessertObject => {
    return `${dessertObject['id'].padEnd(5)}+${dessertObject['name'].padEnd(50)}${dessertObject['cost'].toString().padEnd(15)}`;    
});

const showMenu = (el)=>{
    for(let each in el){
        console.log(el[each]);
        console.log();
    }
}

showMenu(teaMenu);
console.log('\n\nDesserts')
console.log('Name'.padEnd(50)+'cost'.padEnd(15)+'\n'); 
showMenu(dessertMenu);


 function filterPrice(obj){
    return obj['cost'] <=  this;        
}

// console.log(teaArray.filter(filterPrice,1300));
// console.log(dessertArray.filter(filterPrice,1300));


const printBill = (name,...order)=>{
    console.log('__________________________________________________________________________________________________');
    console.log('CHECK');
    console.log('--------------------------------------------------------------------------------------------------');
    console.log(`Dalida's TeaShop ♡`);
    console.log('Your order:')

    let totalCost = 0;
    
        order.forEach(el=>{
            
            if(el.charAt(0)==='T'){ 
               let current = teaArray[parseInt(el.charAt(1))];
               totalCost += current.cost;
               
               console.log(`${current.name.padEnd(90,'-')} ${current.cost} TG`);
            }
        });
        console.log('--------------------------------------------------------------------------------------------------');
        console.log('Total'.padEnd(91)+ totalCost+ ' TG');
        
        totalCost = calculateDiscount(totalCost,name);  
        console.log('Total with discountotalCost'.padEnd(91)+totalCost+ ' TG');                
}

const calculateDiscount = function(totalCost, name){
    let client = clientsArray[`${name}`];

      if(client){
        let date = new Date();
    
        if(date.getDate()===client.day && (date.getMonth()+1)===client.month){
            console.log(`♡♡♡♡♡♡♡♡♡ Happy Birthday, dear ${name}! ♡♡♡♡♡♡♡♡♡♡♡`);
            return totalCost * 0.7;
        }

        let discount = privilegeProperties[`${client.level}`].discount;
        totalCost *= discount;
      }else{
        console.log('__________________________________________________________________________________________________');
          console.log( "You are not in our clients base. Join us to get discounts based on your level: \n BRONZE 3% discount + subscribe to promotions \n SILVER 5% discount + subscribe to promotions \n GOLD 10% discount + subscribe to promotions\n PLATINUM 15% discount + subscribe to promotions + be the first to try a new product (we will send you as a present)\n\n to ALL 30% discount on Birthday!\n");
          console.log('                                  ------------------------------------------------------------------'); 
          console.log('TO JOIN WRITE FOLLOWING COMMAND  |script join yourFirstName yourLastName {birthday format:day month}|');
          console.log('                                  ------------------------------------------------------------------'); 
          console.log('EXAMPLE                           script join Dilnaz Zhumabaikyzy 22 03');
          console.log('__________________________________________________________________________________________________');
      }
      
      return totalCost;
}

printBill('Terrell Boyle','T0','T3');
