// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {teamMatchesDetails: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)

    const data = await response.json()

    const teamBannerUrl = data.team_banner_url
    const latestMatchDetails = data.latest_match_details
    const recentMatches = data.recent_matches

    const updatedLatestMatchDetails = {
      umpires: latestMatchDetails.umpires,
      result: latestMatchDetails.result,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      id: latestMatchDetails.id,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      matchStatus: latestMatchDetails.match_status,
    }

    const updatedRecentMatches = recentMatches.map(eachMatch => ({
      umpires: eachMatch.umpires,
      result: eachMatch.result,
      manOfTheMatch: eachMatch.man_of_the_match,
      id: eachMatch.id,
      date: eachMatch.date,
      venue: eachMatch.venue,
      competingTeam: eachMatch.competing_team,
      competingTeamLogo: eachMatch.competing_team_logo,
      firstInnings: eachMatch.first_innings,
      secondInnings: eachMatch.second_innings,
      matchStatus: eachMatch.match_status,
    }))

    const updatedTeamMatchesDetails = {
      teamBannerUrl,
      latestMatch: updatedLatestMatchDetails,
      recentMatches: updatedRecentMatches,
    }

    this.setState({
      teamMatchesDetails: updatedTeamMatchesDetails,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'sh'
      case 'DC':
        return 'dc'
      default:
        return ' '
    }
  }

  render() {
    const {isLoading, teamMatchesDetails} = this.state
    const {latestMatch, teamBannerUrl, recentMatches} = teamMatchesDetails
    const className = `team-matches-container ${this.getClassName()}`

    return (
      <div>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className={className}>
            <img src={teamBannerUrl} alt="team banner" />
            <LatestMatch latestMatchDetails={latestMatch} />

            <ul className="recent-matches-list">
              {recentMatches.map(recentMatch => (
                <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
