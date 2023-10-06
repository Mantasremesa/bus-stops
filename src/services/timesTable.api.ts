import { IBusTimeTableItem } from '@/interfaces/BusTimeTable'
import axiosIns from '@/plugins/axios'

export default class TimesTableService {
  static getBusTimeTable(): Promise<IBusTimeTableItem[]> {
    return axiosIns.get('stops').then(response => response.data)
  }
}
