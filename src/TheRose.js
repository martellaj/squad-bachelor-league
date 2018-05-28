import './TheRose.css';
import React, { Component } from 'react';

export default class TheRose extends Component {
    constructor() {
        super();

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
                points: points
            });
        }

        // Sort standings bsaed on points, then name.
        standings.sort((a, b) => {
            if (a.points > b.points) {
                return 1;
            } else if (a.points < b.points) {
                return -1;
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
                    <span className="rose-standing-name">{standing.name}</span>{' '}
                    <span className="rose-standing-points">
                        {standing.points}
                    </span>
                </div>
            );
        }

        return standingElements;
    }
}
