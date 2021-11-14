// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import TeamCard from '../TeamCard'

class Home extends Component {
  state = {
    teamsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const teamsList = data.teams
    const formattedData = teamsList.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({teamsList: formattedData, isLoading: false})
  }

  renderLoader = () => (
    // FIX7: For the purpose of testing here testid attribute should be added with the value "loader"
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {teamsList, isLoading} = this.state
    return (
      <div className="home-container">
        <div className="title-logo-container">
          <img
            className="ipl-logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="heading">IPL Dashboard</h1>
        </div>

        {isLoading ? (
          this.renderLoader()
        ) : (
          <div>
            <ul className="teams-list-container">
              {teamsList.map(eachTeam => (
                <TeamCard teamDetails={eachTeam} key={eachTeam.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
