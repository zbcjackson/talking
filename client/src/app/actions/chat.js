export function say(content){
  return {type: "SAY", payload: {content}}
}