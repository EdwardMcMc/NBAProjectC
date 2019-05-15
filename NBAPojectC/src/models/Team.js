import * as _ from 'lodash';
import API_URL from './util';
import Player from './Player';

export default class Team {
    rows = [];
    keys = [];

    serverRows = [];

    constructor(attributes) {
        if(typeof(attributes) !== 'object') return; // No input object, don't set attributes
        for(let k in attributes) this[k] = attributes[k];
    }

    static async getAll() {
        let teams = (await (await fetch(`${API_URL}/Teams`)).json()).teams;
        return teams.map(teamData => new Team(teamData));
    }

    static async get(id) {
        let team = (await (await fetch(`${API_URL}/Teams/${id}`)).json()).teams[0];
        return new Team(team);
    }

    static async getWithPlayers(id) {
        let team = await Team.get(id);
        await team.loadPlayers();
        return team;
    }

    async loadPlayers() {
        this.rows = await Player.getAllForTeam(this.id);
        this.serverRows = _.clone(this.rows);
        this.keys = this.rows.map(player => player.key);
    }

    async delete() {
        await fetch(`${API_URL}/Teams/${this.id}`, {method: 'DELETE'});
    }

    async save() {
        if(typeof(this.id) !== 'number') {
            // Create a new team 
            let response = await fetch(`${API_URL}/Teams`, {
                method: 'POST',
                body: JSON.stringify({
                    teamName: this.teamName
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }});
            if(response.status !== 201) throw new Error("Failed to create new team");
            let data = await response.json();
            for(let k in data) this[k] = data[k];
        } else {
            // Update the team record
            let response = await fetch(`${API_URL}/Teams/${this.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    teamName: this.name
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }});
            if(response.status !== 200) throw new Error("Failed to update team");
        }

        // Attempt to post the new TeamPlayers if any have been added
        let newPlayersDelta = _.differenceBy(this.rows, this.serverRows, p => p.key).map(player => ({
            ...player.serialize(),
            teamId: this.id
        }));
        if(newPlayersDelta.length > 0) {
            let response = await fetch(`${API_URL}/TeamPlayers/${this.id}`, {
                method: 'POST',
                body: JSON.stringify({
                    players: newPlayersDelta
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if(response.status !== 201) throw new Error('Failed to update team players.');
        }

        // Attempt to delete the old team players
        for(let oldPlayer of _.differenceBy(this.serverRows, this.rows, p => p.key)) {
            let response = await fetch(`${API_URL}/TeamPlayers/${this.id}/${oldPlayer.key}`, {
                method: 'DELETE',
            });
            if(response.status !== 200) throw new Error('Failed to update team players.');
        }

        this.serverRows = _.clone(this.rows);
    }
}