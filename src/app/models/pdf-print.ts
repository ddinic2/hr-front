export class PdfPrint {
  static setPrint = dateList => {
    const columnsArray = [];
    for (let i = 0; i < dateList.length; i++) {
      columnsArray.push({ title: dateList[i], dataKey: 'name' + i.toString() });
    }
    return columnsArray;
  }

  static setRowsPrint = dateList => {
    const rowsArrayTest = [{ test1: 'test2', test3: 'test4' }];
    const rowsArray = {};
    for (let i = 0; i < dateList.DayStatus.length; i++) {
      const data = 'name' + i.toString();
      // rowsArray.push({[data]: dateList.DayStatus[i]});
      rowsArray[data] = dateList.DayStatus[i];
    }

    return rowsArray;
  }
}
