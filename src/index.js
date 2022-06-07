import process from 'process';

export const startApp = async () => { 
    const args = process.argv.slice(2);
    args.forEach((element, index) => {
        if (index % 2 === 0) {
            console.log(`${element} = ${args[index +1]}`);
        } 
    });
};

startApp();
