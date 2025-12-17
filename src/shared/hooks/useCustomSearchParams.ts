import { useSearchParams } from 'react-router'

export function useCustomSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const get = (name: string ) => {
    return searchParams.get(name)
  }


  const update = (name: string, value: string) => {
    if(value.length > 0){
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    setSearchParams(params)
    }else{
      remove("search")
    }
  }

  const remove = (name: string) => {
    const params = new URLSearchParams(searchParams)
    params.delete(name)
    setSearchParams(params)
  }

  return {
    get,
    update,
    remove,
    searchParams
  }
}
