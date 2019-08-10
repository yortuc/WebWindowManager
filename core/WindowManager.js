class WindowManager {
  constructor(wins, width, height, renderingContext){
    this.windows = wins
    this.topWin = wins[0]
    this.width = width
    this.height = height
    this.renderingContext = renderingContext;

    // resize canvas
    this.renderingContext.canvas.width = width
    this.renderingContext.canvas.height = height

    let start = null, 
        end = null,
        resizing = false;    

    document.addEventListener("mousedown", function(e){
      start = this.renderingContext.getPosition(e);
      this.topWin = this.getTopMostWin(this.getWinsAtPoint(start));
      
      if(this.topWin){
        resizing = this.isPointInGrip(start, this.topWin)
        this.makeTopWindow(this.topWin)
        this.render();
      }
    }.bind(this))

    document.addEventListener("mouseup", function(e){
      start = null
      end = null
    })
    
    document.addEventListener("mousemove", function(e){
      const curPos = this.renderingContext.getPosition(e)
      
      if (start && this.topWin){
        const delta = {x: curPos.x - start.x, y: curPos.y - start.y}
        // check if resizing or dragging the window
        if(resizing){
         this.topWin.pos.width += delta.x
         this.topWin.pos.height += delta.y
        }
        else{
         this.topWin.pos.x += delta.x
         this.topWin.pos.y += delta.y
        }
        this.render()
        start = curPos;
      }
      
      // change cursor
      if(this.topWin && this.isPointInGrip(curPos, this.topWin)){
        this.renderingContext.canvas.style.cursor="nwse-resize"
      } else{
        this.renderingContext.canvas.style.cursor="default"
      }
    }.bind(this));
 }
  
  isPointInGrip(point, win) {
    return (point.x <= win.pos.x + win.pos.width &&
            point.x >= win.pos.x + win.pos.width - win.gripMargin &&
            point.y <= win.pos.y + win.pos.height &&
            point.y >= win.pos.y + win.pos.height - win.gripMargin);
  }
  
  makeTopWindow(win){
    this.windows.filter((w) => {
      if(w !== win) return win
    })
    this.windows.push(win);
  }
  
 render(){
    const c = this.renderingContext.c;

    // clear screen
    c.fillStyle = "#f7f7f7"
    c.fillRect(0, 0, this.width, this.height);
   
    this.windows.forEach(function(w, index){
      w.z = index
      if(w == this.topWin){
        w.hasFocus = true
      } else {
        w.hasFocus = false
      }
      w.render();
    }.bind(this))
  }
  
  getWinsAtPoint(p){
    const wins = this.windows.filter((w) => {
      const x1 = w.pos.x;
      const y1 = w.pos.y;
      const x2 = w.pos.x + w.pos.width;
      const y2 = w.pos.y + w.pos.height;
      if (p.x >= x1 && p.x <= x2 && p.y >= y1 && p.y <= y2){
        return w
      }
    })
    return wins
  }
  
  getTopMostWin(wins) {
    wins.sort((w1, w2) => { 
      if(w1.z > w2.z) return -1
      if(w1.z < w2.z) return 1
      if(w1.z === w2.z) return 0
    })
    return wins[0];
  }
  
  closeWindow(win){
    this.windows = this.windows.filter((w) => w!==win);
  }
}

export default WindowManager;
