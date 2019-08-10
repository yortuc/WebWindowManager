import Window from './core/Window.js';
import WindowManager from './core/WindowManager.js';
import RenderingContext from './core/Rendering.js';

const renderingContext = new RenderingContext();
const w1 = new Window({title:"Hello World!", x: 100, y: 100, width: 360, height: 240, renderingContext })
const w2 = new Window({title:"Calculator", x: 500, y: 180, width: 260, height: 240, renderingContext })

const wm = new WindowManager([w1, w2], 1200, 800, renderingContext);
wm.render()

document.getElementById("b").onclick = function(){
    const num = wm.windows.length + 1
    const newWin = new Window({title:"New window " + num, x: 50 * num, y: 50 * num, width: 360, height: 240})
    wm.windows.push(newWin)
    wm.topWin = newWin
    wm.render()
}
