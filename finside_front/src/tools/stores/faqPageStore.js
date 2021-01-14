import { observable, decorate } from 'mobx';

let id = 0;
function createData(date, text, own, authorName) {
  id += 1;
  return { id, date, text, own, authorName};
}

let id2 = 0;
function createDataArray(date, status,messages) {
  id2+= 1;
  let question = messages[0].text || 'No question';
  return { id2, date, question, status,messages};
}

class FaqPageStore {

  constructor() {
    this.questions = [
        createDataArray('21.12.14','Ожидание',[
            createData('12:33', 'ETH', true,1,'tst'),
            createData('12:53', 'TCH', false,'tst'),
            createData('12:12', 'BTC', 1,'tst'),
            createData('14:51', 'LTC', 1,'tst'),
        ]),
        createDataArray('31.12.18','В процессе',[
            createData('12:33', 'ETH', true,1,'tst'),
            createData('12:53', 'TCH', false,'tst'),
            createData('12:12', 'BTC', 1,'tst'),
            createData('14:51', 'LTC', 1,'tst'),
        ]),
        createDataArray('31.12.18','Ожидание',[
            createData('12:33', 'ETH', true,1,'tst'),
            createData('12:53', 'TCH', false,'tst'),
            createData('12:12', 'BTC', 1,'tst'),
            createData('14:51', 'LTC', 1,'tst'),
        ]),
        createDataArray('31.12.18','Решено',[
            createData('12:33', 'ETH', true,1,'tst'),
            createData('12:53', 'TCH', false,'tst'),
            createData('12:12', 'BTC', 1,'tst'),
            createData('14:51', 'LTC', 1,'tst'),
        ]),

      ];
    this.currentDialog = [];
  }

  handleDialogChange(id){
      console.info(id)
    this.currentDialog = this.questions.find(el => el.id2 === id ) || [];
    console.info(this.currentDialog,'storeChange')
    return this.currentDialog;
  }


}
decorate(FaqPageStore, { 
    questions: observable,
    currentDialog: observable,
 })
const faqPageStore = new FaqPageStore();
export default faqPageStore;
export { FaqPageStore };