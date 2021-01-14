import { observable, decorate } from 'mobx';

let id = 0;
function createData(coin, name, availableBalance, btcValue, inOrder, action) {
  id += 1;
  let totalBalance = availableBalance + inOrder
  return { id, coin, name, totalBalance, availableBalance, btcValue, inOrder, action};
}

class BalancePageStore {

  constructor() {
    this.balance = [
        createData('ETH', 'ETH', 0.73,1,0.3,'tst'),
        createData('TCH', 'TCH', 0.21,1,0.126,'tst'),
        createData('BTC', 'BTC', 0.5,1,0.32,'tst'),
        createData('LTC', 'LTC', 0.4,1,0.54,'tst'),
      ];
    this.creditExamples = '';
  }

  makeCredit(name,type,amount) {
    this.givedCredits.push(createData(name, type,amount))
    console.info(this.givedCredits);
  }

  getBalanceByName(name) {
    return this.balance.find(el => el.name === name);
    }

    reSumAfterCredit(name,value){
        console.info(name);
        let newBalance = this.getBalanceByName(name);
        console.info(newBalance,'asad ' , this.getBalanceByName(name))
        newBalance.availableBalance = newBalance.availableBalance - value;
        newBalance.inOrder = newBalance.inOrder + value;
    }

}
decorate(BalancePageStore, { balance: observable })
const balancePageStore = new BalancePageStore();
export default balancePageStore;
export { BalancePageStore };