#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Bank account class
class BankAccount {
    accountnumber;
    Balance;
    constructor(accountnumber, balance) {
        this.accountnumber = accountnumber;
        this.Balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.Balance >= amount) {
            this.Balance -= amount;
            console.log(chalk.greenBright(`Withdrawl of $${chalk.yellowBright(amount)} successful,Remaining balance$${chalk.yellowBright(this.Balance)}`));
        }
        else {
            console.log(chalk.redBright("Insufficient Balance,withdrawl unsuccessful"));
        }
        // Credit Money
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
            this.Balance = this.Balance + amount;
            console.log(chalk.greenBright(`$${chalk.yellowBright(amount)} have been successfully credited,Your current balance is $${chalk.yellowBright(this.Balance)}`));
        }
        else {
            this.Balance += amount;
            console.log(chalk.greenBright(`$${chalk.yellowBright(amount)} have been successfully credited,your current balance is,$${chalk.yellowBright(this.Balance)}`));
        }
    }
    // Check balance
    checkBalance() {
        console.log(chalk.cyanBright(`your current balance is $${chalk.yellowBright(this.Balance)}`));
    }
}
// creating customers class
class customers {
    firstName;
    LastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(FirstName, Lastname, gender, age, mobilenumber, account) {
        this.firstName = FirstName;
        this.LastName = Lastname;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobilenumber;
        this.account = account;
    }
}
// Create Bank accounts
const accounts = [
    new BankAccount(2006, 1000),
    new BankAccount(2004, 1500),
    new BankAccount(2001, 2000)
];
// create customers 
const customer = [
    new customers("Iqra", "Abdul Ghaffar", "Female", 18, 3162223334, accounts[0]),
    new customers("Bisma", "Abdul Ghaffar", "Female", 19, 3162223335, accounts[1]),
    new customers("Ammara", "Abdul Ghaffar", "Female", 23, 3162223336, accounts[2])
];
// function to interact with bank account
async function main() {
    console.log(chalk.magentaBright("\n\t*^*^*^*^*^*^*^*^*^*"));
    console.log(chalk.greenBright("\twelcome to OOP-Bank"));
    console.log(chalk.magentaBright("\t*^*^*^*^*^*^*^*^*^*\n"));
    do {
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountnumber",
                type: "number",
                message: chalk.gray("Enter your account number"),
            }
        ]);
        const customerr = customer.find(customer => customer.account.accountnumber === accountNumberInput.accountnumber);
        if (customerr) {
            console.log(chalk.magentaBright.italic(`\t\nWelcome, ${chalk.blueBright(customerr.firstName)} ${chalk.blueBright(customerr.LastName)}\n`));
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: chalk.gray("Select an operation :"),
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: chalk.gray("Enter the amount to deposit: "),
                        }
                    ]);
                    customerr.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const Withdraw_Amount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: chalk.gray("Enter the amount you want to withdraw")
                        }
                    ]);
                    customerr.account.withdraw(Withdraw_Amount.amount);
                    break;
                case "Check Balance":
                    customerr.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.whiteBright("Exiting bank program.."));
                    return;
            }
        }
        else {
            console.log(chalk.red("Invalid account number.please try again."));
        }
    } while (true);
}
main();
