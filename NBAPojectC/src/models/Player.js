import API_URL from './util';

export default class Player {
    constructor(attributes) {
        for(let k in attributes) this[k] = attributes[k];
    }

    static async getAll() {
        let players = (await (await fetch(`${API_URL}/Players`)).json()).players;
        return players.map(playerData => new Player(Player.RichardToEmilio(playerData)));
    }
    
    static async getAllForTeam(teamId) {
        try {
            let players = (await (await fetch(`${API_URL}/TeamPlayers/${teamId}`)).json()).players;
            return players.map(playerData => new Player(Player.RichardToEmilio(playerData)));
        } catch {
            return []; // Error whilst retrieving data so return empty array
        }
    }

    static async get(id) {
        let player = (await (await fetch(`${API_URL}/Players/${id}`)).json()).players[0];
        return new Player(Player.RichardToEmilio(player));
    }

    static RichardToEmilio(richard) {
        let emilio = {
            Player: `${richard.firstName} ${richard.lastName}`,
            key: richard.playerId
        };
        for(let k in richard.stats) emilio[k] = richard.stats[k];
    
        return emilio;
    }

    serialize = () => ({
        playerId: this.key,
        firstName: this.Player.split(' ')[0],
        lastName:  this.Player.split(' ')[1],
        stats: {
            W_PCT: this.W_PCT, 
            MIN: this.MIN, 
            FGA: this.FGA, 
            FGA3: this.FGA3, 
            FTA: this.FTA, 
            OREB: this.OREB, 
            DREB: this.DREB, 
            AST: this.AST, 
            TOV: this.TOV, 
            STL: this.STL, 
            BLK: this.BLK, 
            PF: this.PF, 
            PTS: this.PTS 
        }
    });
}