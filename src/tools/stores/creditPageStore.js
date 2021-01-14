import { observable, decorate } from 'mobx';

let id = 0;
function createData(coin, type, amount) {
  id += 1;
  return { id, coin, type, amount};
}

class CreditPageStore {

  constructor() {
    this.givedCredits = [
        createData('ETH', true, 6.0),
        createData('BTC', false, 6.0),
      ];
    this.creditExamples = '';
  }

  makeCredit(coin, type, amount) {
    this.givedCredits.push(createData(coin, type, amount))
    console.info(this.givedCredits);
  }

}
decorate(CreditPageStore, { givedCredits: observable })
const creditPageStore = new CreditPageStore();
export default creditPageStore;
export { CreditPageStore };