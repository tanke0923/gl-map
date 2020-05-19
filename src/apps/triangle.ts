import {GLMap} from '../ui/map';
import {Program} from '../render/program';
import fragment from '../shaders/basic.fragment.glsl';
import vertex from '../shaders/basic.vertex.glsl';

const map = new GLMap(document.getElementById('map') as HTMLCanvasElement);
const gl = map.gl;
const program = new Program(gl, {
  fragmentSource: fragment,
  vertexSource: vertex
});

const positionAttributeLocation = gl.getAttribLocation(program.program, 'a_position');

const positions = [
  -0.5, -0.5,
  0.5, -0.5,
  0, 0.5
];
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

// tell the attribute how to get data out of it
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);
gl.enableVertexAttribArray(positionAttributeLocation);
const size = 2;          // 2 components per iteration
const type = gl.FLOAT;   // the data is 32bit floats
const normalize = false; // don't normalize the data , from 0~1
const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
const offset = 0;        // start at the beginning of the buffer

// A hidden part of gl.vertexAttribPointer is that it binds the current ARRAY_BUFFER to the attribute.
gl.vertexAttribPointer(
  positionAttributeLocation,
  size,
  type,
  normalize,
  stride,
  offset
);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program.program);
gl.bindVertexArray(vao);

// resize canvas
map.resize();
// Tell WebGL how to convert from clip space to pixels
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.drawArrays(gl.TRIANGLES, 0, 3);