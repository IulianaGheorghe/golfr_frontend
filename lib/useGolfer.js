import useSWR from 'swr'
import { getToken } from './userAuth'

const useGolfer = id => {
  const GOLFER_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`

  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching golfer data.')
      error.info = res.json()
      error.status = res.status
      throw error
    }

    return res.json().then(data => data.golfer)
  }

  const { data, error } = useSWR(GOLFER_URL, fetcher)

  return {
    golfer: data,
    error: error && error.message,
  }
}

export default useGolfer
