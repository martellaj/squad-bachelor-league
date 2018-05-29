import './TheRose.css';
import React, { Component } from 'react';

export default class TheRose extends Component {
    constructor() {
        super();

        this.state = {
            players: []
        };

        this.getStandings = this.getStandings.bind(this);
    }

    render() {
        const standings = this.getStandings();

        return (
            <div className="rose-container">
                <div className="rose-title-container">
                    <span className="rose-title">The Rose™</span> Standings
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
                        onClick={() => this.onNameClick(standing.players)}
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

    onNameClick(players) {
        this.setState({
            players: players
        });
    }

    renderPlayers() {
        const players = this.state.players;

        if (players.length) {
            return <div>{this.getPlayerElements(players)}</div>;
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
                    <span>{player.name}</span>
                    <img className="player-picture" src={player.picture} />
                </div>
            );
        }
        return playerElements;
    }
}
