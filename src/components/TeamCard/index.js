// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImageUrl} = teamDetails

  return (
    <li>
      <Link to={`/team-matches/${id}`} className="team-container">
        <img className="teamLogo" src={teamImageUrl} alt={name} />
        <p className="team-name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
