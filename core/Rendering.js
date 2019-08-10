class RenderingContext {
    constructor() {
        this.canvas = document.getElementById('c');
        this.c = this.canvas.getContext('2d');
        this.init();
    }

    getPosition(event) {
        let x = event.x;
        let y = event.y;
        x -= this.canvas.offsetLeft;
        y -= this.canvas.offsetTop;
        return {x, y}
    }

    drawCircle(x,y,r) {
        this.c.beginPath();
        this.c.arc(x, y, r, 0, 2 * Math.PI);
        return this.c;
    }    

    init() {
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            this.beginPath();
            this.moveTo(x+r, y);
            this.arcTo(x+w, y,   x+w, y+h, r);
            this.arcTo(x+w, y+h, x,   y+h, r);
            this.arcTo(x,   y+h, x,   y,   r);
            this.arcTo(x,   y,   x+w, y,   r);
            this.closePath();
            return this;
        }
    }
}

export default RenderingContext;
