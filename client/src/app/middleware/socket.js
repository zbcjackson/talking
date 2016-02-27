export const SOCKET = Symbol('SOCKET')

export default store => next => action => {
  const socket = action[SOCKET]
  if (typeof socket === 'undefined') {
    return next(action)
  }
  const {url, data, types} = socket;
  const [ requestType, successType, failureType ] = types
  next({ type: requestType })
  mySocket.post(url, data, (resData, jwres) => {
    next({type: successType, payload: {message: resData}})
  })
}
