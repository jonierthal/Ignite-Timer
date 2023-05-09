export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupdtedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case 'ADD_NEW_CICLE':
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycle: action.payload.newCycle.id,
      }
    case 'INTERRUPT_CURRENT_CYCLE':
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interrupdtedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCyclesId: null,
      }
    case 'MARK_CURRENT_CYCLE_AS_FINISHED':
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCyclesId: null,
      }
    default:
      return state
  }
}
