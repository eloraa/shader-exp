uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_tex_ratio;
uniform sampler2D u_texture;

void main() {
  
    vec2 uv = gl_FragCoord.xy / u_resolution;
  

    float scaleX = 1.0;
    float scaleY = 1.0;

    float textureAspect = u_tex_ratio.x / u_tex_ratio.y;
    float frameAspect = u_resolution.x / u_resolution.y;
    float textureFrameRatio = textureAspect / frameAspect;

    // Determine if the texture and frame are in portrait mode
    bool portraitTexture = textureAspect < 1.0;
    bool portraitFrame = frameAspect < 1.0;

    // Adjust the scaling factors based on portrait or landscape orientation

    if(portraitFrame)
        scaleX = 1.0 / textureFrameRatio;
    else
        scaleY = textureFrameRatio;

    vec4 color = texture2D(u_texture, uv);

    // Apply the scaling factors to UV coordinates
    uv.x *= scaleX;
    uv.y *= scaleY;

    // Center the texture
    uv -= 0.5 * vec2(scaleX - 1.0, scaleY - 1.0);

    uv = uv * 2.0  - 1.0;

    // warp the corners
    vec2 offset = abs(uv.yx) / vec2(4.);
    uv = uv + uv * offset * offset;

    uv = uv * 0.5 + 0.5;

    

    bool outsideRange = uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0;

    // Set color to vec4(vec3(0.0), 0.0) if UV coordinates are outside the valid range
    color = outsideRange ? vec4(vec3(0.0), 0.0) : texture2D(u_texture, uv);

    uv = uv * 2.0 - 1.0;

    vec2 vignette = 40. / u_resolution.xy;
	  vignette = smoothstep(vec2(0.0), vignette, 1.0 - abs(uv));

    float crtOffset = sin(u_time * 5.0) * 0.5; // Adjust the frequency and amplitude as needed

    color.g *= (sin((uv.y + crtOffset) * u_resolution.x * 10.25) + 2.) * 0.15 + 1.0;
    color.rb *= (cos((uv.x + crtOffset) * u_resolution.y * 10.25) + 2.) * 0.145 + 1.0;

	  color *= color * vignette.x * vignette.y;
    

    gl_FragColor = color;
}