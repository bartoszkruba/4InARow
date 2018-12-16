class GamePage extends Component{
    constructor(){
        super();
        this.addRoute('/gamepage', 'Play');
        this.form = new Form(this);
        this.winningPage;
        this.addEvents({
          'click .show-window-btn' : 'showWinningPage'
        })

        //*
        // this.gamesPlayed = 0;
        // this.draws = 0;
        //*

        // Test uncomment this if you want to test winningPage
        // this.winningPage = new WinningPage(this, {name: 'Jesus Christ Son Of God', turns: 13});
    }

    rematch(){
      let players = this.game.players;
      for(let i = 0; i < players.length; i++){
        if(players[i] instanceof Bot){
          players[i] = new Bot(players[i]);
        } else {
          players[i] = new Player(players[i]);
        }

        if(players[0] instanceof Bot){
          players[0].opponent = players[1];
        }
        if(players[1] instanceof Bot){
          players[1].opponent = players[0];
        }
      }
      clearTimeout(this.game.pendingTimeout);
      this.game = new Game(players[0], players[1], this);
      this.winningPage = undefined;
      this.render();
      FixEverything.navbar.render();
    }
    
    newGame(){
      this.game = undefined;
      this.form = new Form(this);
      this.winningPage = undefined;
      this.render();
      FixEverything.navbar.render();
    }

    // takes an object with name and score property
    async saveScore(score){
        let scores = await JSON._load('scores.json');
        scores.push(score);
        JSON._save('scores.json', scores).then(()=>{
            console.log('Saved');
        })
    }

    unmount(){
      if(this.game){
        this.game.activePage = false;
      }
    }

    showWinningPage(){
      document.querySelector(".win-page").style.display = "block";
    }

}
