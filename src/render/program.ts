export class Program {
  program: WebGLProgram;

  constructor(gl: WebGL2RenderingContext, source: { fragmentSource: string; vertexSource: string }) {
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, source.fragmentSource);
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, source.vertexSource);
    this.program = this.createProgram(gl, vertexShader, fragmentShader);

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
  }

  createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  createShader(gl: WebGL2RenderingContext, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
}
