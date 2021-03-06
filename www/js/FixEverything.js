class FixEverything{
  static fixBoardSize(){
    // Don't do this if not inside game
    if(window.location.pathname !== "/gamepage"){
      return ``;
    }
    // Wait for render 
    setTimeout(() => {
      let gameDom = document.getElementsByClassName('game-main')[0];
      let boardDom = document.getElementsByClassName('board')[0];
      let gWidth = gameDom.offsetWidth;
      let gHeight = gameDom.offsetHeight;
      if(gHeight > gWidth){
        boardDom.style.maxHeight = `${gWidth}px`;
        boardDom.style.maxWidth = `${gWidth}px`;

        boardDom.style.minHeight = `${gWidth}px`;
        boardDom.style.minWidth = `${gWidth}px`;
      } else {
        let diff = ((gWidth-gHeight)/2);
        boardDom.style.maxWidth = `${gHeight}px`;
        boardDom.style.maxHeight = `${gHeight}px`;

        boardDom.style.minWidth = `${gHeight}px`;
        boardDom.style.minHeight = `${gHeight}px`;

        boardDom.style.marginLeft = `${diff}px`;
        boardDom.style.marginRight = `-${diff}px`;
      }
    }, 0);
    return ``;
  };
}
