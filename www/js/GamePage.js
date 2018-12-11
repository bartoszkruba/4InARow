class GamePage extends Component{
    constructor(){
        super();
        this.addRoute('/gamepage', 'Play');
        this.form = new Form(this);
        this.board = new Board();
    }

    rematch(){
      let player1 = this.game.players[0];
      let player2 = this.game.players[1];
      this.game = new Game(player1, player2);
      this.render();
    }

    newGame(){
      delete this.game;
      this.form = new Form(this);
      this.render();
    }

    // takes an object with name and score property
    async saveScore(score){
        let scores = await JSON._load('scores.json');
        scores.push(score);
        JSON._save('scores.json', scores).then(()=>{
            console.log('Saved');
        })
    }

}
