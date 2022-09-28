export default class StoreToLocal {
  public static getStore() {
    return JSON.parse(localStorage.getItem('store') || '{}');
  }

  public static setStore(store: any) {
    localStorage.setItem('store', JSON.stringify(store));
  }
}
