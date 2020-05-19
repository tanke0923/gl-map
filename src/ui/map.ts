export class GLMap {
  _canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._setup();
  }

  _setup() {
    this.gl = this._canvas.getContext('webgl2');

    if (!this.gl) {
        throw new Error('Failed to initialize WebGL 2');
        return;
    }
  }

  resize() {
    const cssToRealPixels = window.devicePixelRatio || 1;
    // Lookup the size the browser is displaying the canvas.
    const displayWidth  = this._canvas.clientWidth * cssToRealPixels;
    const displayHeight = this._canvas.clientHeight * cssToRealPixels;

    // Check if the canvas is not the same size.
    if (this._canvas.width  !== displayWidth || this._canvas.height !== displayHeight) {

      // Make the canvas the same size
      this._canvas.width  = displayWidth;
      this._canvas.height = displayHeight;
    }
  }
}