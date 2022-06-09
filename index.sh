":" //#;exec /usr/bin/env node --input-type=module - "$@" < "$0"

console.log('hello');

import { program } from 'commander';

const myFun = ()=>{
    console.log('done!');
}

program
    .command('go')
    .description('success')
    .action(myFun);

program.parse();