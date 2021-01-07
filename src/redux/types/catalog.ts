import { ISortBy } from './index'

export interface IThunkError {
  rejectValue: {
    errors: string[]
    fieldsErrors?: IFieldError[]
  }
}

export interface IFieldError {
  field: string
  error: string
}

export interface IFetchItemsParam {
  category: number
  sortBy: ISortBy
}
