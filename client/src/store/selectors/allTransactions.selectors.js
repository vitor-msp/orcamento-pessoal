export const searchTransactions = (state)=>{
  return state.allTransactions.filter(({descriptionLowerCase}) =>{
    return descriptionLowerCase.includes(state.currentText.toLowerCase());
  })
}