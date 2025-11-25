import ISearch from "@/types/Search";
import { NonNullEntry } from "@/types/Utils";

export const searchParamsNextToNative = (search: ISearch): URLSearchParams => {
  const NativeSearchParms = new URLSearchParams()

  const entries = Object.entries(search)
    .reduce((acc, [key, value]) => {
      if (value === undefined || value === null)
        return acc
      if (!Array.isArray(value))
        return [...acc, [key, value]]
      return [...acc, ...value.map(x => ([key, x]))]
    }, [] as string[][])

  entries.forEach(([key, value]) => NativeSearchParms.append(key, value))

  return NativeSearchParms
}

export const toToggleURLSearchParams = (search: URLSearchParams | undefined, key: string, value: string): URLSearchParams => {
  const result = new URLSearchParams(search)
  if (result.has(key, value))
    result.delete(key, value)
  else
    result.set(key, value)
  return result
}