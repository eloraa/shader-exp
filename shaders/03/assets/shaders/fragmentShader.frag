uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    float y = smoothstep(0.2, 0.5, uv.x) - smoothstep(0.5, 0.8, uv.x);

    vec3 color = vec3(y);

    float pct = plot(uv, y);
    color = (1.0 - pct) * color + pct * vec3(1.0, 0.0, 0.0);

	gl_FragColor = vec4(color, 1.0);
}