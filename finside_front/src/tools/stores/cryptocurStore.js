import { observable, decorate } from 'mobx';

let id = 0;
function createData(name, price, dynamic,type) {
  id += 1;
  return { id, name, price, dynamic,type };
}

let r = 0;
class CryptocurStore {

  constructor() {
    this.tradingPair = '';
    this.curency = 'USD';
    this.coin = 'BTC';
    this.myDeals =[
      createData('LTC/USD', 159, 6.0, 'buy'),
      createData('ETH/USD', 237, 9.0, 'sell'),
    ];
    this.randomNums = '';
    this.myDealsLength = this.myDeals.length - 1;

    this.marketValue=[
            createData('RUB', 1621, 6.0),
            createData('TRY', 125, 6.0),
            createData('USD', 15, 6.0),
  ]
  }

  generateRandomInfo(min, max){
    console.info('random')
    
    this.marketValue[Math.floor(Math.random() * ((this.marketValue.length - 1) + 1))].price = (Math.random() * (max - min + 1)) + min;
    
    this.marketValue[Math.floor(Math.random() * ((this.marketValue.length - 1) + 1))].dynamic = (Math.random() * (max - min + 0.1)) + min;
  console.info(this.marketValue.length)
  }

  changePair(newPair) {
    console.info(newPair);
    this.curency = newPair
    this.tradingPair = `${this.coin}${newPair}`;
  }

  changeCoin(newCoin) {
    console.info(newCoin);
    this.coin = newCoin.toString();
  }

  buyCoin(coin,price,dynamic,type) {
    this.myDeals.push(createData(`${coin}/${this.curency}`,price,dynamic,type));
    this.myDealsLength = this.myDeals.length - 1;
  }

}
decorate(CryptocurStore, { 
  tradingPair: observable,
  coin: observable,
  myDeals: observable,
  marketValue: observable,
  randomNums: observable,
  curency: observable,
  myDealsLength: observable
 })

const cryptocurStore = new CryptocurStore();
export default cryptocurStore;
export { CryptocurStore };