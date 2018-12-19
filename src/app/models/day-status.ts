export class DayStatus {
  name: string;
  value: number;
  private constructor(myName: string, myValue: number) {
    this.name = myName;
    this.value = myValue;
  }



  static fromName(name: string): DayStatus {
    switch (name.trim().toUpperCase()) {
      case 'GO':
        return new DayStatus('GO', 1);
      case 'BO':
        return new DayStatus('BO', 4);
      case 'RR':
        return new DayStatus('RR', 8);
      case 'NPO':
        return new DayStatus('NPO', 9);
      case 'PO':
        return new DayStatus('PO', 3);
      case 'NN':
        return new DayStatus('NN', 10);
    }
  }
  static fromCode(code: number): DayStatus {
    switch (code) {
      case 1:
        return new DayStatus('GO', 1);
      case 4:
        return new DayStatus('BO', 4);
      case 8:
        return new DayStatus('RR', 8);
      case 9:
        return new DayStatus('NPO', 9);
      case 3:
        return new DayStatus('PO', 3);
      case 10:
        return new DayStatus('NN', 10);
    }
  }

  static fromSubtypeCode(code: number): DayStatus {
    switch (code) {
      case 2:
        return new DayStatus('BO', 2);
      case 3:
        return new DayStatus('BO', 3);
      case 4:
        return new DayStatus('BO', 4);
      case 5:
        return new DayStatus('PO', 5);
      case 6:
        return new DayStatus('PO', 6);
      case 7:
        return new DayStatus('PO', 8);
      case 8:
        return new DayStatus('PO', 9);
      case 9:
        return new DayStatus('PO', 9);
        case 10:
        return new DayStatus('PO', 10);
      case 11:
        return new DayStatus('PO', 11);
      case 12:
        return new DayStatus('RR', 12);
      case 13:
        return new DayStatus('!!', 13);
      case 14:
        return new DayStatus('VP', 14);
      case 15:
        return new DayStatus('XX', 15);
      case 16:
        return new DayStatus('DP', 16);
      case 17:
        return new DayStatus('VK', 17);
      case 18:
        return new DayStatus('GO', 18);
    }
  }

  set = (someName: string | number) => {
    if (typeof(someName) === 'string') {
      switch ((<string>someName).trim().toUpperCase()) {
        case 'G':
          this.name = 'GO';
          this.value = 1;
          break;
        case 'B':
          this.name = 'BO';
          this.value = 4;
          break;
        case 'R':
          this.name = 'RR';
          this.value = 8;
          break;
        case 'N':
          this.name = 'NPO';
          this.value = 9;
          break;
        case 'P':
          this.name = 'PO';
          this.value = 3;
          break;
      }
    } else {
      switch (someName) {
        case 1:
          this.name = 'GO';
          this.value = 1;
          break;
        case 4:
          this.name = 'BO';
          this.value = 4;
          break;
        case 8:
          this.name = 'RR';
          this.value = 8;
          break;
        case 9:
          this.name = 'NPO';
          this.value = 9;
          break;
        case 3:
          this.name = 'PO';
          this.value = 3;
          break;
      }
    }

  }
}
