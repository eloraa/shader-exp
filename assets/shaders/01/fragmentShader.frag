uniform vec2 u_resolution;
uniform float u_time;


//https://www.shadertoy.com/view/mtyGWy
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.y;

    gl_FragColor = vec4(vec3(0.5 + 0.5*cos(u_time + uv.xyx+vec3(0,2,4))), 1.0);
}