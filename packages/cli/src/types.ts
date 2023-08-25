type JsonValueBase<T> = string | number | boolean | Array<string | number | boolean | T> | Record<string, T>

export type JsonType = Record<
  string,
  | string
  | number
  | boolean
  | Array<string | number | boolean | JsonValueBase<string | number | boolean>>
  | Record<string, JsonValueBase<string | number | boolean>>
>
