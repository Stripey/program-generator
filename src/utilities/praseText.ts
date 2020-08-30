import { Program, workoutDay } from "../types/program";

export const parseText = (file: string[]): Program => {
  let program: Program = {
    name: file[0],
    trackedLifts: [],
    rounding: 5,
    notes: [],
    routine: [],
  };

  // Figure out what items the files have
  let pointer = file.indexOf("Tracked Lifts:") + 1;
  let hasNotes = file.indexOf("Notes:") !== -1;
  let hasRounding = file.indexOf("Rounding:") !== -1;

  if (pointer === -1) throw new Error("Invalid Format - Tracked Lifts");
  if (!hasRounding) throw new Error("Invalid Format - Rounding");

  // Read in the tracked lifts
  while (!file[pointer].includes("Rounding")) {
    program.trackedLifts.push(file[pointer]);
    pointer++;
  }

  // console.log(pointer, file[pointer])
  program.rounding = +file[++pointer];
  pointer++;

  // If next section has notes then additional parsing required
  if (hasNotes) {
    // Pointer would be on "Notes:" if hasNotes, else would be on "Week 1"
    pointer++;

    while (!file[pointer].includes("Week")) {
      program.notes?.push(file[pointer]);
      pointer++;
    }
  }

  // Base parsing is done now it is time to parse the routine
  let week: any = [];
  let day: workoutDay = {};
  let trackedLift: string = "";

  for (; pointer < file.length; pointer++) {
    const line: string = file[pointer];
    // Week is over append it to routine and clear it.
    if (line.includes("Week")) {
      if (week.length === 0) continue;

      if (Object.keys(day).length !== 0) {
        week.push(day);
        day = {};
      }
      program.routine?.push(week);
      week = [];
      continue;
    }

    if (line.includes("Day")) {
      if (Object.keys(day).length === 0) continue;
      week.push(day);
      day = {};
      continue;
    }

    // Now is tracked lift
    if (program.trackedLifts.includes(line)) {
      if (day[line] === undefined) day[line] = [];
      trackedLift = line;
    } else if (line.includes("@")) {
      day[trackedLift].push(line);
    } else {
      trackedLift = "untracked";

      if (day[trackedLift] === undefined) day[trackedLift] = [];
      day[trackedLift].push(line);
    }
  }

  // Have to handle the last loop
  week.push(day);
  program.routine?.push(week);
  return program;
};
