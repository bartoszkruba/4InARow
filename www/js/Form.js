class Form extends Component{
    constructor(game){
        super();
        this.addEvents({
            'click .btn-start': 'readValues',
            'keyup .name-player1': 'addOnEnter',
            'keyup .name-player2': 'addOnEnter'
        });
        this.gamePage = game;
    }

    addOnEnter(e){
        if(e.which === 13){
          this.readValues();
        }
      }

    readValues(){
        let p1 = {};
        let p2 = {};

        p1.name = this.baseEl.find('.name-player1').val();
        p2.name = this.baseEl.find('.name-player2').val();
        p1.type = document.querySelector('.form-player1 input[name="player1-type"]:checked').value;
        p2.type = document.querySelector('.form-player2 input[name="player2-type"]:checked').value;

        this.validate(p1,p2);
    }

    validate(p1, p2){
        let validP1, validP2 = false;
        p1.name = p1.name.trim();
        p2.name = p2.name.trim();

        if(p1.name.length > 20 || p1.name.length < 2){
            $('#p1-invalid').removeClass('d-none').addClass('d-unset');
        } else {
            $('#p1-invalid').removeClass('d-unset').addClass('d-none');
            validP1 = true;
        }
        if(p2.name.length > 20 || p2.name.length < 2){
            $('#p2-invalid').removeClass('d-none').addClass('d-unset');
        } else {
            $('#p2-invalid').removeClass('d-unset').addClass('d-none');
            validP2 = true;
        }

        if(validP1 && validP2)
        this.createGame(p1, p2);
    }

    createGame(p1, p2){
        p1.color = 'red';
        p2.color = 'yellow';

        let player1, player2;
        if(p1.type === 'human'){
            player1 = new Player(p1, this.gamePage);
        } else if (p1.type === 'bot'){
            player1 = new Bot(p1);
        }
        if(p2.type === 'human'){
            player2 = new Player(p2, this.gamePage);
        } else if (p2.type === 'bot'){
            player2 = new Bot(p2);
        }

        if(player1.type === "bot"){
            player1.opponent = player2;
        }
        if(player2.type === "bot"){
            player2.opponent = player1;
        }
        this.gamePage.game = new Game(player1, player2, this.gamePage);
        this.gamePage.render();
        FixEverything.navbar.render(); 
        console.log(player1, player2);
    }
}
