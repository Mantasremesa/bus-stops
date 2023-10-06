import { createStore } from 'vuex'
import { IBusTimeTableItem } from '@/interfaces/BusTimeTable'

enum EBusMutations {
  STORE_BUS_STOPS_DATA = 'busStops/store',
  SET_SELECTED_BUS_LINE = 'busStops/setSelectedBusLine',
  SET_SELECTED_STOP = 'busStops/setSelectedStop',
}

export enum EBusActions {
  storeBusStops = 'storeBusStops',
  setBusLineSelect = 'setBusLineSelect',
  setStopSelect = 'setStopSelect',
}

interface IState {
  busStops: IBusTimeTableItem[] | null
  selectedLine: number | null
  selectedStop: string | null
}

const store = createStore({
  state: () =>
    ({
      selectedLine: null,
      selectedStop: null,
      busStops: null,
    } as IState),

  getters: {
    getBusStops(state) {
      return state.busStops
    },
    getSelectedBusLineNumber(state) {
      return state.selectedLine
    },
    getSelectedStop(state) {
      return state.selectedStop
    },
  },

  mutations: {
    [EBusMutations.STORE_BUS_STOPS_DATA](state, data: IBusTimeTableItem[]) {
      state.busStops = data
    },
    [EBusMutations.SET_SELECTED_BUS_LINE](state, selectedNumber: number) {
      state.selectedLine = selectedNumber
    },
    [EBusMutations.SET_SELECTED_STOP](state, selectedStop: string) {
      state.selectedStop = selectedStop
    },
  },

  actions: {
    [EBusActions.storeBusStops]({ commit }, data: IBusTimeTableItem[]) {
      commit(EBusMutations.STORE_BUS_STOPS_DATA, data)
    },
    [EBusActions.setBusLineSelect]({ commit }, selectedNumber: number) {
      commit(EBusMutations.SET_SELECTED_BUS_LINE, selectedNumber)
    },
    [EBusActions.setStopSelect]({ commit }, selectedStop: string) {
      commit(EBusMutations.SET_SELECTED_STOP, selectedStop)
    },
  },
})

export default store
