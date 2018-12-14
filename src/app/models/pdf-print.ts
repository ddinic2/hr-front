export class PdfPrint {
  title: string;
  dataKey: string;
  private constructor(myName: string, myValue: string) {
    this.title = myName;
    this.dataKey = myValue;
  }

  static setPrint = (dateList) => {
    for (let i = 1; i < dateList.length; i++) {
      return new PdfPrint(dateList[i], i.toString());
      }
  }
}
