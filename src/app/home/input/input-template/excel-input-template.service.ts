import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelInputTemplateService {

  constructor() {

  }

  async generateExcel() {


    const header = ['Year', 'Month', 'Facebook', 'Reddit', 'LinkedIn', 'Instagram'];

    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sharing Data');

// Add Header Row
    const headerRow = worksheet.addRow(header);

// Cell Style : Fill and Border
headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
  });

    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);

// Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, 'InputTemplate.xlsx');
});

  }
}