import {getByPeriod} from '../../api/api'

export const allTransactionsReducer = (state = getByPeriod("2021-06"), action)=>{
  switch (action.type) {
    case 'action':
      break;
  
    default:
      return state;
  }
}