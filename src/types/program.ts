export interface workoutDay {
  [key: string]: string[];
}
export interface Program {
  name?: string;
  trackedLifts: string[];
  rounding: number;
  notes?: string[];
  routine: workoutDay[][];
}
