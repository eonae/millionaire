const Game = require('./game.js');

module.exports = {

    currentGame: null,

    callApi: function(command, params, callback) {

        switch (command) {

            case 'new':
                this.currentGame = new Game();
                callback(null, JSON.stringify(this.currentGame.ladder) );
                break;

            case 'quit':
                this.currentGame = null;
                callback(null, { status: 'success' } );
                break;

            default:
                if (this.currentGame && (command in this.currentGame)) {
                    this.currentGame[command](params, callback);
                } else {
                    callback({ message: 'Invalid command!'});
                }
        }
    }
}




