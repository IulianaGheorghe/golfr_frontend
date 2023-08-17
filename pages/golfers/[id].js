import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import useGolfer from '../../lib/useGolfer'
import useGolferScores from '../../lib/useGolferScores'
import ScoreCard from '../../components/ScoreCard'

const Golfer = () => {
  const router = useRouter()
  const id = router.query.id
  const { golfer, golferError } = useGolfer(id)
  const { scores, scoresError } = useGolferScores(id)
  const error = golferError || scoresError

  return (
    <Layout>
      <>
        {error ? (
          error
        ) : (golfer && scores) ? (
          <>
            <div className="text-center text-3xl font-medium font-serif">
              {golfer.name} scores
            </div>
            {scores.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={score.user_name}
              />
            ))}
          </>
        ) : <p>Loading...</p> }
      </>
    </Layout>
  )
}

export default Golfer
