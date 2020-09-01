import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Program } from "../types/program";

export const exportToSpreadsheet = async (program: Program) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(program.name);

  // Create an object of tracked lists to easuky get address
  // The address is based off of the first row, can have N tracked lifts
  let trackedLifts: { [lift: string]: ExcelJS.Cell } = {};
  worksheet.addRow([...program.trackedLifts, "Rounding"]);
  worksheet.getRow(1).eachCell((cell) => {
    const liftCell = worksheet.getCell(cell.address.replace("1", "2"));
    liftCell.value = cell.value === "Rounding" ? program.rounding : 100;
    trackedLifts[cell.value as string] = liftCell;
  });
  if(program.notes) worksheet.addRow([...program.notes]);
  // Being writing of routine
  // Only increment main row by largest day, that is what counter is for
  let mainRow = 6;
  for (const week of program.routine) {
    let col = 2;
    let longest = 0;

    for (const day of week) {
      let row = mainRow;

      const colLetter1 = worksheet.getColumn(col).letter;
      const colLetter2 = worksheet.getColumn(col + 1).letter;

      let counter = 0;
      for (const lift in day) {
        // console.log(day[lift])
        const liftNameCell = worksheet.getCell(`${colLetter1}${row}`);
        liftNameCell.value = lift;
        row++;
        counter++;
        for (const set of day[lift]) {
          if (!set.includes("@")) {
            const accessoryCell = worksheet.getCell(`${colLetter1}${row}`);
            accessoryCell.value = set;
            row++;
            counter++;
            continue;
          }
          const [setsReps, intensity] = set.split("@");
          const isPercent = intensity.includes("%");
          let setRepsCell = worksheet.getCell(`${colLetter1}${row}`);
          setRepsCell.value = setsReps;

          let intensityCell = worksheet.getCell(`${colLetter2}${row}`);

          // Note you must enable editing to see the values
          if (isPercent) {
            const actualValue = `0.${intensity.replace("%", "")}`;
            intensityCell.value = {
              formula: `=ROUND(${trackedLifts[lift].address} * ${actualValue}, ${trackedLifts["Rounding"].address})`,
              date1904: true,
              result: `${Math.round((100 * +actualValue) / program.rounding) * program.rounding}`
            };
          }

          row++;
          counter++;
        }
        col += 2;
      }

      if (counter > longest) longest = counter + 2;
    }
    mainRow += longest;
    longest= 0;
  }
  // Write to file at the end.
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const fileExtension = ".xlsx";
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: fileType });

  saveAs(blob, `${program.name}.${fileExtension}`);
};
