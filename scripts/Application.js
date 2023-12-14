class Application {
  constructor({ alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя" } = {}) {
    this._alphabet = alphabet.split("");
  }

  /**
   * 
   * @param {String} message 
   * @param {String} key 
   */
  encrypt(message, key = 1) {
    message = this.removeNoAlphabetSymbols(message);

    if (isNaN(key - 1) && this._alphabet.includes(key)) {
      key = this._alphabet.indexOf(key);
    }

    key = key % this._alphabet.length;

    return { message: this._encryptMessage(message, key), key};
  }

  _encryptMessage(message, key) {
    let messageOut = "";

    for (let i = 0; i < message.length; i++) {
      messageOut += this._alphabet[(this._alphabet.indexOf(message.charAt(i)) + key) % this._alphabet.length] ;
    }

    return messageOut;
  }

  decrypt(message, key) {
    if (!key) {
      console.error(`Can't decrypt. No key provided.`)
      return null;
    }

    message = this.removeNoAlphabetSymbols(message);

    return { message: this._decryptMessage(message, key), key };
  }

  getAlphabet() {
    return this._alphabet;
  }

  _decryptMessage(message, key) {
    let messageOut = "";

    for (let i = 0; i < message.length; i++) {
      let index = (this._alphabet.indexOf(message.charAt(i)) - key) % this._alphabet.length;

      if (index < 0) {
        index = this._alphabet.length + index;
      }
      messageOut += this._alphabet[index] ;
    }

    return messageOut;
  }

  removeNoAlphabetSymbols(message) {
    let outMessage = "";

    message.split("").forEach((symbol) => {
      let formedSymbol = this._getSymbolIfExistInAlphabet(symbol);
      if (formedSymbol) {
        outMessage += formedSymbol;
      }
    })

    return outMessage;
  }

  _getSymbolIfExistInAlphabet(symbol) {
    if (this._alphabet.includes(symbol)) {
      return symbol;
    }

    if (this._ignoreCase) {
      if (this._alphabet.includes(symbol.toLowerCase())) {
        return symbol.toLowerCase();
      }

      if (this._alphabet.includes(symbol.toUpperCase())) {
        return symbol.toUpperCase();
      }
    }
  }
}