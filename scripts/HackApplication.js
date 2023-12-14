class HackApplication {
  static Alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  static AlphabetByFrequency = "оеаинтсрвлкмдпуяыьгзбчйхжшюцщэфъ";

  static Frequency = {
    о: 0.1097,
    е: 0.0845,
    а: 0.0801,
    и: 0.0735,
    н: 0.0670,
    т: 0.0626,
    с: 0.0547,
    р: 0.0473,
    в: 0.0454,
    л: 0.0440,
    к: 0.0349,
    м: 0.0321,
    д: 0.0298,
    п: 0.0281,
    у: 0.0262,
    я: 0.0201,
    ы: 0.0190,
    ь: 0.0174,
    г: 0.0170,
    з: 0.0165,
    б: 0.0159,
    ч: 0.0144,
    й: 0.0121,
    х: 0.0097,
    ж: 0.0094,
    ш: 0.0073,
    ю: 0.0064,
    ц: 0.0048,
    щ: 0.0036,
    э: 0.0032,
    ф: 0.0026,
    ё: 0.0004,
    ъ: 0.0004
  }

  static hack(message) {
    let frequency = HackApplication._getLettersFrequency(message);
    let key = HackApplication._getDifferencesByLetterFrequency(frequency);

    return { key, message: HackApplication._decryptMessage(message, Math.max(...key)) };
  }

  static _getLettersFrequency(message) {
    let output = new Map();

    message.split("").forEach((letter) => {
      if (HackApplication.Alphabet.indexOf(letter) != -1) {
        if (!output.has(letter)) {
          output.set(letter, 0);
        }

        output.set(letter, output.get(letter) + 1);
      }
    })

    return new Map([...output.entries()].sort((a, b) => b[1] - a[1]));
  } 
  
  /**
   * Выбор смещения по принципу ДЕМОКРАТИИ (большинство букв решает)
   */
  static _getDifferencesByLetterFrequency(frequency) {
    let i = 0;
    let differences = {};

    frequency.forEach((value, key) => {
      let originalLetter = HackApplication.AlphabetByFrequency.charAt(i);
      let currentLetter = key;

      let difference = Math.abs(HackApplication.Alphabet.indexOf(originalLetter) - HackApplication.Alphabet.indexOf(currentLetter));

      if (!differences[difference])
        differences[difference] = 0;

      differences[difference]++;
      i++;
    })

    let maxCollides = 0;
    let maxCollidesStep = 0;

    console.log(differences)
    for (const steps in differences) {
      if (differences[steps] > maxCollides) {
        maxCollidesStep = steps;
        maxCollides = differences[steps];
      }
    }

    return maxCollidesStep;
  }

  static _decryptMessage(message, key) {
    let messageOut = "";

    for (let i = 0; i < message.length; i++) {
      let index = (HackApplication.Alphabet.indexOf(message.charAt(i)) - key) % HackApplication.Alphabet.length;

      if (index < 0) {
        index = HackApplication.Alphabet.length + index;
      }
      messageOut += HackApplication.Alphabet[index];
    }

    return messageOut;
  }
}