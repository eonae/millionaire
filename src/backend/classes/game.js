function createGame() {
    return {
        rounds: createLadder(),
        current: 0,
        status: 'start',
        prize: 0,
        hints: {
            half: true,
            percents: true
        },

        getCurrentQuestion: function() {
            return this.rounds[this.current].question;
        },

        tryAnswer: function(index) {
            var correct = this.getCurrentQuestion().correct == index;
            if (correct) {
                this.current++;
                if (this.current === this.rounds.length) {
                    this.win();
                } else {
                    this.status = 'promote';
                }
            }
            else {
                this.loose();
            }
            return this.status;
        },

        loose: function() {
            this.status = 'loose';
            this.prize = getMaxFixedPrize(this.rounds, this.current)

        },

        win: function() {
            this.status = 'win';
            this.prize = this.rounds[this.rounds.length - 1].prize;

        },

        flee: function() {
            this.status = 'flee';
            this.prize = this.rounds[this.current - 1].prize;
        }
    }
}

function getMaxFixedPrize(ladder, current) {
    var prize = 0;
    for (var i = 0; i < current; i++) {
        if (ladder[i].isFixed)
            prize = ladder[i].prize;
    }
    return prize;
}

function createLadder() {
    var ladder = getLadderTemplate();
    for (var i = 0; i < ladder.length; i++) {
        ladder[i].question = getQuestion(i);
        //ladder[i].success = null; // null - не сыграно, true - успех, false - провал
    }

    return ladder;
}