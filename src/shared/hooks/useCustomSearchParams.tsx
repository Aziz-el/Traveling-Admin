import { useSearchParams } from 'react-router'

export function useCustomSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const get = (name: string ) => {
    return searchParams.get(name)
  }

  const add = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.append(name, value)
    setSearchParams(params)
  }

  const update = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    setSearchParams(params)
  }

  const remove = (name: string) => {
    const params = new URLSearchParams(searchParams)
    params.delete(name)
    setSearchParams(params)
  }

  return {
    get,
    add,
    update,
    remove,
    searchParams
  }
}
