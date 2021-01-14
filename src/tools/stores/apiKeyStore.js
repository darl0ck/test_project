import { observable, decorate } from 'mobx';
const uuidAPIKey = require('uuid-apikey');

let id = 0;
function createData(keys, status, lastUse, carbs) {
  id += 1;
  return { id, keys, status, lastUse, carbs };
}


class ApiKeyStore {

  constructor() {
    this.rows = [
        createData('s12s534371251agdv1263v8f5bb9b', true, 6.0, 24, 4.0),
        createData('asdwf2g24gh34h54hj4jh3g2f', false, 6.0, 24, 4.0),
];
  }

  deleteKey(id) {
    this.rows = this.rows.filter(obj => 
        obj.id !== id
    );
    console.info(this.rows);
  }

  handleChangeSwitch = el => event => {
    el.status = !el.status;
    //   let el = this.rows.find((el,i) => el.id === id)
  };

  addNewAPIKey() {
      const nowDate = new Date();
      const key = uuidAPIKey.toAPIKey(uuidAPIKey.create().uuid, { 'noDashes': true }).toLowerCase();

      this.rows.push(
                  createData(key, false, `${nowDate.getFullYear()}-${nowDate.getDay()}-${nowDate.getMonth()}`, 24, 4.0),
      )
  }

}
decorate(ApiKeyStore, { rows: observable })
const apiKeyStore = new ApiKeyStore();
export default apiKeyStore;
export { ApiKeyStore };