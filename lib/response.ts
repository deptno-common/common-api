export const res200 = result => response(200, result)
export const res201 = result => response(201, result)
export const res400 = result => response(400, result)
export const res500 = result => response(500, result)

const headers = {
  'Access-Control-Allow-Origin': '*'
}

const response = (statusCode: number, body: Result) => ({
  headers,
  statusCode,
  body: JSON.stringify(body)
})

type Result = object | number | string
