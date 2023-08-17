import useSWR from 'swr'
import { getToken } from './userAuth'

const useGolferScores = id => {
  const SCORES_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/scores`

  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching golfer scores.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data.scores)
  }

  const { data, error } = useSWR(SCORES_URL, fetcher)

  return {
    scores: data,
    error: error && error.message,
  }
}

export default useGolferScores
