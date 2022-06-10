  const teaArray = [
    {name:'Green tea with strawberry & peach', kcal:12, ingridients:['green whole leaf tea','strawberries', 'peach'], cost: 1500},
    {name:'Smoky ginger & honey tea', kcal:14, ingridients:['thumbsized piece of root ginger','lapsang souchong tea leaves'], cost: 1290},
    {name: 'Chai tea',kcal: 100,ingridients: ['mugs milk (or use almond milk)',' English Breakfast tea bags'],cost: 1290},
    {name: 'Iced hibiscus tea',kcal:3,ingridients:['dried hibiscus flowers','ice and clear honey (optional)'], cost: 1590},
    {name: 'Turmeric tea',kcal: 10,ingridients:['ground turmeric','fresh grated ginger','orange' ,'zest pared'],cost: 1990},
    {name: 'White tea',kcal: 100,ingridients:['tea','milk'],cost: 690}
  ];
  const dessertArray = [{name:'Chocolate Mousse',kcal: 100,cost: 1690},
                       {name:'Crispy Chocolate Chip Cookies',kcal:130,cost: 1290},
                       {name:'Peanut Butter-Chocolate',kcal:129,cost: 1290},
                       {name:'Homemade Sunflower Butter Cups',kcal:150,cost:1690},
                       {name:'Brownie', kcal:100, cost: 2190}];

  let i = 0;
  teaArray.forEach((obj)=>{
    obj.category = 1;
    obj.id = "T"+i;
    i++;
  })
  i=0;
  dessertArray.forEach((obj)=>{
    obj.id = "D"+i;
    i++;
  })
export {
    teaArray, 
    dessertArray 
    }

    