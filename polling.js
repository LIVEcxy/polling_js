/*
 * @LastEditors: liusm
 */

export default class Polling {
  constructor() {
    this.pollingList = {};
    console.info('Polling is ready')
  }

  add (sec = 3000, callback = false, sign = '0') {
    this.sec = sec;
    this.callback = callback;
    this.pollingState = true;
    this.pollingList[sign] = {
      state: false,
      image: null,
      sec,
      callback
    }
    return this;
  }

  start (sign = false) {
    if (!sign) throw ('sign is undefiend')

    this.pollingList[sign].state = true;
    this.pollingList[sign].image = setInterval(() => {
      if (this.pollingList[sign].state) {
        this.pollingList[sign].callback()
      } else {
        this.pollingList[sign].image = null;
      }
    }, this.pollingList[sign].sec)
    return this;
  }

  stop (sign = false) {
    if (!this.pollingList[sign]) throw ('sign is undefiend')

    this.pollingList[sign].state = false;
    this.pollingList[sign].image = null;
    return this;
  }

  clear (sign = false) {
    if (sign) {
      this.stop(sign);
      setTimeout(() => {
        this.pollingList[sign] = {};
      }, 0)
    } else {
      for (let key in this.pollingList) {
        this.stop(key)
      }
      setTimeout(() => {
        this.pollingList = {};
      }, 0)
    }
  }

  getList = (sign = false) => sign ? this.pollingList[sign] : this.pollingList;
}
