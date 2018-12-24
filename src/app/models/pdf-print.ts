export class PdfPrint {
  static setPrint = dateList => {
    const columnsArray = [];
    const datesList = dateList[0].Dates;
    columnsArray.push({ title: 'Zaposleni', dataKey: 'employeeFullName'});
    for (let i = 0; i < datesList.length; i++) {
      columnsArray.push({ title: datesList[i], dataKey: 'name' + i.toString() });
    }
    return columnsArray;
  }

  static setRowsPrint = dateList => {
    const rowsArray = {'employeeFullName': dateList.EmployeeFullName};
    for (let i = 0; i < dateList.DayStatus.length; i++) {
      const data = 'name' + i.toString();
      rowsArray[data] = dateList.DayStatus[i];
    }
    return rowsArray;
  }
}
