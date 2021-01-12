import { ISortBy } from './index'

export interface IRejectValue {
  errors: string[]
  fieldsErrors?: IFieldError[]
}

export interface IThunkError {
  name: string
  message: string
  rejectValue: IRejectValue
}

export interface IFieldError {
  field: string
  error: string
}

export interface IFetchItemsParam {
  category: number
  sortBy: ISortBy
}
