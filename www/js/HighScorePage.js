class HighScorePage extends Component {

    // propably need some optimization - scores loads up each team user switches between top10/all
    // edit - fixed, added a refresh button
    constructor() {
        super();
        this.addRoute('/highscores', 'HighScores');
        // boolean for switching between only ten HighScores/All HighScores
        this.showOnlyTen = true;
        this.scores = [];
        this.updateScore();
        this.addEvents({
            // event for switching between all scores / top ten
            'click .switch-mode-btn': 'switchMode',
            'click .refresh-btn' : 'updateScore'
        });
    }

    // loading up json file, converting into an array, sorting and displaying it on the page
    async updateScore() {
        this.scores = await JSON._load('scores.json');

        this.scores = this.scores.slice().sort((a, b) => {
            return a.score > b.score ? 1 : -1;
          });

        // this.bubble(this.scores);
        this.render();
    }

    // switching between all scores / top ten
    switchMode() {
        this.showOnlyTen = !this.showOnlyTen;
        this.render();
    }


    // Dont know why all text is bold - Some bootstrap thing 
    // edit - it was th instead of td
    getScoresUI() {
        let scoresUI = `<table class="table">\n`;
        scoresUI += `<thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
        </tr>
      </thead>`;
        if (this.showOnlyTen && this.scores.length > 10) {
            let i = 0;
            while (i < 10) {
                scoresUI += `<tr>
                <td scope="col">${i + 1}</th>
                <td scope="col">${this.scores[i].name}</th>
                <td scope="col">${this.scores[i].score}</th>
              </tr>`;
                i++;
            }
        }
        else {
            this.scores.forEach((el, i) => {
                scoresUI += `<tr>
                <td scope="col">${i + 1}</th>
                <td scope="col">${this.scores[i].name}</th>
                <td scope="col">${this.scores[i].score}</th>
              </tr>`;
            });
        }
        scoresUI += `</tbody>\n`
        scoresUI += `</table>`
        return scoresUI;
    }
}




/*

*/