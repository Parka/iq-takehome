import { createLoader, createSerializer, parseAsInteger, parseAsString } from "nuqs/server";

const searchParams = {
  sort: parseAsString.withDefault(''),
  search: parseAsString.withDefault(''),
  difficulty: parseAsInteger.withDefault(0),
  type: parseAsString.withDefault(''),
  company: parseAsString.withDefault(''),
}

export const loadSearchParams = createLoader(searchParams)
export const serialize = createSerializer(searchParams)