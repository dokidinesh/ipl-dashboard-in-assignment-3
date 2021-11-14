// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails
  const matchStatusClassname =
    matchStatus === 'Won' ? 'match-won' : 'match-lost'

  console.log(matchDetails)

  return (
    <li className="match-container">
      <img
        className="logo"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={matchStatusClassname}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
