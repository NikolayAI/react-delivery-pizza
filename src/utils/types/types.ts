export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U
}
  ? U
  : never

export enum appStatuses {
  success = 'success',
  loading = 'loading',
  error = 'error',
}
