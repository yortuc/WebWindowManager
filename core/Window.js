class Window {
  constructor(opts){
    this.pos = {x: opts.x, y: opts.y, width: opts.width, height: opts.height}
    this.cap = {text: opts.title, fontSize: 16, color: opts.capColor || "black"}
    this.z = -1
    this.hasFocus = opts.hasFocus
    this.gripMargin = 15
    this.wm = opts.wm
    this.bgColor = opts.bgColor || "white"
    this.renderingContext = opts.renderingContext
  }

  _renderButtons() {
    const c = this.renderingContext.c;

    if(this.hasFocus){
      this.renderingContext.drawCircle(this.pos.x + 20, this.pos.y + 20, 7).stroke()
      this.renderingContext.drawCircle(this.pos.x + 44, this.pos.y + 20, 7).stroke()
      this.renderingContext.drawCircle(this.pos.x + 66, this.pos.y + 20, 7).stroke()
    }
    c.fillStyle = this.hasFocus ? "rgb(255,45,85)" : "#ccc"
    this.renderingContext.drawCircle(this.pos.x + 20, this.pos.y + 20, 7).fill()

    c.fillStyle = this.hasFocus ? "rgb(255,204,0)" : "#ccc"
    this.renderingContext.drawCircle(this.pos.x + 44, this.pos.y + 20, 7).fill()

    c.fillStyle = this.hasFocus ? "rgb(40,205,65)" : "#ccc"
    this.renderingContext.drawCircle(this.pos.x + 66, this.pos.y + 20, 7).fill()

  }
  
  _renderWindow() {
    const c = this.renderingContext.c;

    // fill window 
    c.save()
        
    if(this.hasFocus){
      c.shadowColor = '#999';
      c.shadowBlur = 15;
      c.shadowOffsetY = 15;
    }

    c.fillStyle = this.bgColor;
    c.roundRect(this.pos.x, this.pos.y, this.pos.width, this.pos.height, 10).fill();    
    c.restore()
    
    // draw resize grip
    c.moveTo(this.pos.x + this.pos.width - this.gripMargin, this.pos.y + this.pos.height)
    c.lineTo(this.pos.x + this.pos.width, this.pos.y + this.pos.height - this.gripMargin)
    c.moveTo(this.pos.x + this.pos.width - this.gripMargin/1.5, this.pos.y + this.pos.height)
    c.lineTo(this.pos.x + this.pos.width, this.pos.y + this.pos.height - this.gripMargin/1.5)
  }

  _renderCaption() {
    const c = this.renderingContext.c;

    c.fillStyle = this.cap.color
    c.font = this.cap.fontSize + "px Verdana";
    const cWidth = c.measureText(this.cap.text).width
    const cLeft = this.pos.x + (this.pos.width - cWidth)/2
    const cap = {x: cLeft, y: this.pos.y + 27, text: this.cap.text}
    cap.length = c.measureText(cap.txt).width
    c.fillText(cap.text, cap.x, cap.y);
    c.moveTo(this.pos.x, this.pos.y+40);
    c.lineTo(this.pos.x + this.pos.width, this.pos.y+40);
    c.stroke();
  }
  
  render(){
    this._renderWindow()
    this._renderCaption()
    this._renderButtons()
  }
}

export default Window;
