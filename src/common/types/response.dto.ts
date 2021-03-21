export type ResponseData<TData> = { type: 'data'; data: TData }
export type ResponseError<TError> = { type: 'error'; error: TError }

export type ResponseDto<TData, TError> = ResponseData<TData> | ResponseError<TError>

export class CreateResponse {
  static data = <TData>(data: TData): ResponseData<TData> => ({
    type: 'data',
    data,
  })

  static error = <TError>(error: TError): ResponseError<TError> => ({
    type: 'error',
    error,
  })
}
