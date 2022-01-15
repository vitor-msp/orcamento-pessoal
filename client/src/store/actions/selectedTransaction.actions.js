export const changeSelectedTransaction=(transaction)=>{
  return {
    type: 'changeSelectedTransaction',
    payload: transaction
  }
}