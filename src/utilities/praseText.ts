
interface workoutDay{

}

interface Program{
  name: string,
  trackedLifts: string[],
  notes: string[],
  routine: Record<string, string[][]>
}
/*
  name : lift
  trackedLifts: [squat, bench, ohp deadlift]
  notes: [add 5 when x, add 10 when x]
  routine: {
    week 1 : {
      [
        [lift1@x, lift2@x],
        [lift1@x, lift2@x],
        [lift1@x, lift2@x],
        [lift1@x, lift2@x],
      ]
    }
  }

*/
export const parseText = (array: string[])  => {
  return {};
}