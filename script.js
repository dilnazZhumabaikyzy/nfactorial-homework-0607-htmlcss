":" //#;exec /usr/bin/env node --input-type=module - "$@" < "$0"

import {
    teaArray,
    dessertArray
} from './mealDataBase.js';

import {
    program
} from 'commander';
import fs from 'fs';

const privilegeProperties = {
    silver: {
        sendNewProducts: true,
        sendPromotions: true,
        discount: 0.85
    },
    gold: {
        sendNewProducts: false,
        sendPromotions: true,
        discount: 0.9
    },
    platinum: {
        sendNewProducts: false,
        sendPromotions: true,
        discount: 0.95
    },
    bronze: {
        sendNewProducts: false,
        sendPromotions: true,
        discount: 0.97
    }
}


let clientsArray = [];


let data = null;

program
    .command('menu')
    .description("shows menu")
    .action(menu);
program
    .command('order')
    .argument("<string>", "name")
    .argument("<string>", "surname")
    .argument("<string>", "orders")
    .description("records order and prints Bill")
    .action(parseOrder);
program
    .command('filter-menu')
    .argument("<number>", "price")
    .description("shows menu with 'price =< argument'")
    .action(filteredMenu);
program
    .command('join')
    .argument("<string>", "name")
    .argument("<string>", "surname")
    .argument("<number>", "day")
    .argument("<number>", "month")
    .description("join DTS community")
    .action(joinDTS);


const someData = updateArray();

function updateArray() {
    return fs.readFileSync('myjsonfile.json', 'utf8');
}

function processFile(data) {
    clientsArray = JSON.parse(data);
}


processFile(someData);


function joinDTS(name, surname, dayc, monthc) {

    console.log(`Welcome to Dalida's Teashop Community ${name} ${surname}. You are BRONZE now.`);
    console.log("Make more than 5 orders to go to the SILVER level.");
    console.log("Make more than 10 orders to go to the SILVER level.");
    console.log("Make more than 15 orders to go to the SILVER level.");

    clientsArray[name + " " + surname] = {
        email: null,
        city: null,
        creditcard: null,
        level: "bronze",
        day: dayc,
        month: monthc,
        count: 0
    }
    updateJson();
}

function updateJson() {
    let json = JSON.stringify(clientsArray);
    fs.writeFile('myjsonfile.json', json, 'utf8', function (err) {
        if (err) throw err;
    });
}

function parseOrder(name, surname, orders) {
    let orderArray = decriptingToArray(orders);
    printBill(name + " " + surname, ...orderArray);
}

function decriptingToArray(orderString) {
    return orderString.split('-');
}



const teaMenu = teaMenuHandle(teaArray);

function teaMenuHandle(teaArray) {
    return teaArray.map(teaObject => {
        let str = '';
        let ingridients = '';
        teaObject['ingridients'].forEach(ingridient => {
            if (!(teaObject['ingridients'].indexOf(ingridient) === 0)) {
                ingridients += ', ' + ingridient;
            } else {
                ingridients += ingridient;
            }
        });
        return `${teaObject['id'].padEnd(5)}${teaObject['name'].padEnd(50)}${(teaObject['kcal'].toString()).padEnd(10)}${teaObject['cost'].toString().padEnd(15)}${ingridients}`;
    });
}

const dessertMenu = dessertMenuHandle(dessertArray);

function dessertMenuHandle(dessertArray) {
    return dessertArray.map(dessertObject => {
        return `${dessertObject['id'].padEnd(5)}${dessertObject['name'].padEnd(50)}${dessertObject['cost'].toString().padEnd(15)}`;
    });
}

const showMenues = (el) => {
    for (let each in el) {
        console.log(el[each]);
        console.log('_'.padEnd(117, '_'));
    }
}

function filterPrice(obj) {
    return obj['cost'] <= this;
}

function filteredMenu(price) {
    console.log(price);
    let firstArg = teaArray.filter(filterPrice, price);
    let secondArg = dessertArray.filter(filterPrice, price);

    menu(teaMenuHandle(firstArg), dessertMenuHandle(secondArg), true);
}


const printBill = (name, ...order) => {

    console.log('__________________________________________________________________________________________________');
    console.log('CHECK');
    console.log('--------------------------------------------------------------------------------------------------');
    console.log(`Dalida's TeaShop ♡`);
    console.log('Your order:')

    let totalCost = 0;

    order.forEach(el => {
        let current = '';
        if (el.charAt(0) === 'T') {
            current = teaArray[parseInt(el.charAt(1))];
        } else {
            current = dessertArray[parseInt(el.charAt(1))];
        }
        totalCost += current.cost;
        console.log(`${current.name.padEnd(90,'-')} ${current.cost} TG`);
    });

    console.log('--------------------------------------------------------------------------------------------------');
    console.log('Total'.padEnd(91) + totalCost + ' TG');

    totalCost = calculateDiscount(totalCost, name);

    console.log('Total with discountotalCost'.padEnd(91) + totalCost + ' TG');
}

const calculateDiscount = function (totalCost, name) {

    let client = clientsArray[name];

    if (client) {
        client.count++;
        updateJson();
        updateLevel(client, client.count);


        let date = new Date();

        if (date.getDate() === client.day && (date.getMonth() + 1) === client.month) {
            console.log(`♡♡♡♡♡♡♡♡♡ Happy Birthday, dear ${name}! ♡♡♡♡♡♡♡♡♡♡♡`);

            return totalCost * 0.7;
        }

        let discount = privilegeProperties[`${client.level}`].discount;
        totalCost *= discount;
    } else {
        console.log('__________________________________________________________________________________________________');
        console.log("You are not in our clients base. Join us to get discounts based on your level: \n BRONZE 3% discount + subscribe to promotions \n SILVER 5% discount + subscribe to promotions \n GOLD 10% discount + subscribe to promotions\n PLATINUM 15% discount + subscribe to promotions + be the first to try a new product (we will send you as a present)\n\n to ALL 30% discount on Birthday!\n");
        console.log('                                  ------------------------------------------------------------------');
        console.log('TO JOIN WRITE FOLLOWING COMMAND  |script join yourFirstName yourLastName {birthday format:day month}|');
        console.log('                                  ------------------------------------------------------------------');
        console.log('EXAMPLE                           script join Dilnaz Zhumabaikyzy 22 03');
        console.log('__________________________________________________________________________________________________');
    }

    return totalCost;
}

function updateLevel(client, count) {
    console.log(count);
    if (count > 15) {
        client.level = 'platinum';
    } else if (count > 10) {
        client.level = 'gold';
    } else if (count > 5) {
        client.level = 'silver';
    } else {
        console.log('nothing now');
        return;
    }
    updateJson();


}


function showInterface(teaMenu, dessertMenu) {
    console.log('      _______________________________________________________________________ ');
    console.log('     |  SET TERMINAL WINDOW TO FULL FORMAT                                   |');
    console.log('     |  TO ORDER WRIE COMMAND ./script order {$mealId...}                    |');
    console.log('     |                                                                       |');
    console.log('     |  EXAMPLE: ./script order yourFirstName yourLastName D1                |');
    console.log('     |  EXAMPLE: ./script order yourFirstName yourLastName D1-T0-T1-... etc  |');
    console.log('     |_______________________________________________________________________|');
    console.log();
    console.log();
    console.log('♡'.padEnd(90, '♡'));
    console.log();
    console.log("Welcome to Dalida's TeaShop");
    console.log();
    console.log('♡'.padEnd(90, '♡'));
    console.log(`\nMenu\nTea\n`);
    console.log('ID'.padEnd(5) + 'Name'.padEnd(50) + 'kcal'.padEnd(10) + 'cost'.padEnd(15) + 'ingriedents\n');
    teaMenu.length ? showMenues(teaMenu) : console.log('No result in Tea Menu');
    console.log('\n\nDesserts')
    console.log('ID'.padEnd(5) + 'Name'.padEnd(50) + 'cost'.padEnd(15) + '\n');
    dessertMenu.length ? showMenues(dessertMenu) : console.log('No result in Dessert Menu');
}

function menu(teaMenuF = null, dessertMenuF = null, filter = false) {

    if (!filter) {
        teaMenuF = teaMenu;
        dessertMenuF = dessertMenu;
    }
    showInterface(teaMenuF, dessertMenuF);

}

program.parse();