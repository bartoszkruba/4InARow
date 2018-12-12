class App extends Component {

  constructor(){
    super();
    this.navBar = new NavBar();
    this.pageContent = new PageContent();
    this.footer = new Footer();
    FixEverything.navbar = this.navBar; 
    // only in the App class:
    new Router(this.pageContent);
    $('body').html(this.render());
  }

}
