export class GameResponse {
    constructor(gameStatus, params) {
        this.gameStatus = gameStatus;
        this.params = params;
    }
}

export class GameResult {
    constructor(type, rounds, prize) {
        this.type = type;
        this.rounds = rounds;
        this.prize = prize;
    }
}