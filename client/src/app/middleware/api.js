import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import values from 'lodash/object/values'

// const API_ROOT = `${window.config.apiUrl}/`

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, method, data, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  const options = {
    headers: {
      'Accept': 'application/vnd.yihuode.v1',
      'Content-Type': 'application/json'
    },
    method: method,
    body: JSON.stringify(data),
    credentials: 'include'
  }

  return fetch(fullUrl, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json)

      return schema ? Object.assign({}, normalize(camelizedJson, schema)) : camelizedJson
    })
}

const brandSchema = new Schema('brand', {idAttribute: 'id'})
const activitySchema = new Schema('activity', {idAttribute: 'id'})
const courseSchema = new Schema('course', {idAttribute: 'id'})
const articleSchema = new Schema('article', {idAttribute: 'id'})

export const Schemas = {
  BRAND: brandSchema,
  ACTIVITY: activitySchema,
  COURSE: courseSchema,
  ARTICLE: articleSchema
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, method, data, success } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.')
  // }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, method, data, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: values(error).join(', ') || 'Something bad happened'
    }))
  )
}
