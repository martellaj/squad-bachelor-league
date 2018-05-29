import './TheRose.css';
import React, { Component } from 'react';

export default class TheRose extends Component {
    constructor() {
        super();

        this.state = {
            standing: null
        };

        this.getStandings = this.getStandings.bind(this);
    }

    render() {
        const standings = this.getStandings();

        return (
            <div className="rose-container">
                <div className="rose-title-container">
                    <div>
                        <span className="rose-title">The Rose™</span> Standings
                    </div>
                    <span className="rose-last-updated">
                        (last updated 5/29/18)
                    </span>
                </div>
                {this.renderStandings(standings)}
                {this.renderPlayers()}
            </div>
        );
    }

    getStandings() {
        const standings = [];

        // Get team's points derived from player points.
        for (const team of this.props.teams) {
            let points = 0;

            for (const player of team.players) {
                points += player.points;
            }

            standings.push({
                name: team.name,
                points: points,
                players: team.players
            });
        }

        // Sort standings bsaed on points, then name.
        standings.sort((a, b) => {
            if (a.points > b.points) {
                return -1;
            } else if (a.points < b.points) {
                return 1;
            } else {
                return a.name > b.name;
            }
        });

        return standings;
    }

    renderStandings(standings) {
        const standingElements = [];

        for (const standing of standings) {
            standingElements.push(
                <div key={standing.name} className="rose-standing-container">
                    <a
                        className="rose-standing-name"
                        href="#"
                        onClick={() => this.onNameClick(standing)}
                    >
                        {standing.name}
                    </a>{' '}
                    <span className="rose-standing-points">
                        {standing.points}
                    </span>
                </div>
            );
        }

        return standingElements;
    }

    onNameClick(standing) {
        if (
            standing.name === (this.state.standing && this.state.standing.name)
        ) {
            this.setState({
                standing: null
            });
        } else {
            this.setState({
                standing: standing
            });
        }
    }

    renderPlayers() {
        const standing = this.state.standing;

        if (standing) {
            return (
                <div className="players-container">
                    <div>
                        <strong>{standing.name}'s Team</strong>
                    </div>
                    <div>{this.getPlayerElements(standing.players)}</div>
                </div>
            );
        }
    }

    getPlayerElements(players) {
        const playerElements = [];

        for (const player of players) {
            playerElements.push(
                <div
                    className="player-container"
                    onClick={() => window.open(player.bio, '_blank')}
                >
                    <span
                        className={
                            player.eliminated && 'player-name-eliminated'
                        }
                    >
                        {player.name} (pick #{player.pick})
                    </span>
                    {player.note && (
                        <div className="player-note">{player.note}</div>
                    )}
                    <img
                        className={`player-picture ${
                            player.eliminated ? 'player-picture-eliminated' : ''
                        }`}
                        src={player.picture}
                    />
                </div>
            );
        }

        return playerElements;
    }
}
