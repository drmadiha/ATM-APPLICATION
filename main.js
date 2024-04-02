#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 2000;
let myPin = 1234;
let count = 0;
atmmachine();
async function atmmachine() {
    const answer = await inquirer.prompt({
        name: "atmpin",
        message: "Enter your pin number",
        type: "number",
    });
    if (myPin === answer.atmpin) {
        const askques = await inquirer.prompt({
            name: "option1",
            type: "list",
            message: "Select an option",
            choices: ["Balance inquiry", "Fast Cash", "Cash withdrow", "change pincode"],
        });
        if (askques.option1 === "Balance inquiry") {
            console.log(chalk.bold.green(`your balance is${myBalance}`));
        }
        else if (askques.option1 === "change pincode") {
            const pincode = await inquirer.prompt([{
                    name: "old",
                    message: "Enter old pincode",
                    type: "number",
                },
                {
                    name: "new",
                    message: "Enter new pincode",
                    type: "number",
                },
                {
                    name: "new2",
                    type: "number",
                    message: "confirm new pincode"
                }
            ]);
            if (pincode.old == myPin && pincode.new == pincode.new2) {
                myPin = pincode.new;
                console.log(chalk.bold.green("your pin is successfuly changed"));
            }
            else {
                console.log(chalk.bold.redBright("pincode is not match try again"));
            }
        }
        else if (askques.option1 === "Fast Cash") {
            if (askques.option1 === "Fast Cash") {
                const fast = await inquirer.prompt({
                    name: "cash",
                    type: "list",
                    message: "select the notes",
                    choices: ["1000", "2000", "5000"]
                });
                if (fast.cash === "1000") {
                    myBalance = myBalance - 1000;
                }
                else if (fast.cash === "2000") {
                    myBalance = myBalance - 2000;
                }
                else if (fast.cash === "5000") {
                    myBalance = myBalance - 5000;
                }
                if (myBalance < 0) {
                    console.log(chalk.bold.redBright("your balance is unsuficient balance"));
                }
                else
                    console.log(chalk.bold.green(`your remaining balance is ${myBalance}`)); ////////////////
            }
        }
        else if (askques.option1 === "Cash withdrow") {
            const amt = await inquirer.prompt({
                name: "amount",
                type: "number",
                message: "Enter your amount",
            });
            if (amt.amount <= myBalance) {
                console.log(chalk.bold.green(`your remaining balance is ${myBalance - amt.amount}`));
            }
            else {
                console.log(chalk.bold.redBright("you have insufficient balance"));
            }
        }
    }
    else {
        console.log(chalk.bold.redBright("you have entered wrong pin"));
        count++;
        if (count > 2) {
            console.log(chalk.bold.green("your atm card is blocked.kindly contact with bank manager"));
        }
        else {
            atmmachine();
        }
    }
}
;
