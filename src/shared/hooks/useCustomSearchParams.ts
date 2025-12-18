import { useCallback } from 'react'
import { useSearchParams } from 'react-router'

export function useCustomSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const get = useCallback((name: string) => {
    return searchParams.get(name)
  }, [searchParams])


  const update = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams)

    if(value){
    params.set(name, value)
    }else{
    params.delete(name)
    }

    setSearchParams(params, { replace: true })
  } , [searchParams, setSearchParams])

  const remove = useCallback((name: string) => {
    const params = new URLSearchParams(searchParams)
    params.delete(name)
    setSearchParams(params, { replace: true })
  } , [searchParams, setSearchParams])

  return {
    get,
    update,
    remove,
    searchParams
  }
}
