import { Skia } from "@shopify/react-native-skia";

export const colors = {
  white: "white",
  black: "black",
};

export const fontStyle = {
  textStyle: {
    color: Skia.Color(colors.white),
    fontFamilies: ["Anek-Bold"],
    fontSize: 36,
    lineHeight: 24,
    letterSpacing: -0.8,
  },
  paragraphStyle: {
    foregroundPrimaryStyle: 1,
    foregroundSecondaryStyle: 0,
    foregroundPrimaryColor: Skia.Color(colors.black),
    foregroundSecondaryColor: Skia.Color(colors.white),
    foregroundStrokeWidth: 4,
  },
  shadow: {
    dx: 0,
    dy: 4,
  },
};

export const source = Skia.RuntimeEffect.Make(`
uniform vec4 position;
uniform vec4 colors[4];

vec4 main(vec2 pos) {
  vec2 uv = (pos - vec2(position.x, position.y))/vec2(position.z, position.w);
  vec4 colorA = mix(colors[0], colors[1], uv.x);
  vec4 colorB = mix(colors[2], colors[3], uv.x);
  return mix(colorA, colorB, uv.y);
}`)!;

// Define an array of colors for the gradient to be used in shader uniform
export const _colors = [
  // #dafb61
  0.85, 0.98, 0.38, 1.0,
  // #61dafb
  0.38, 0.85, 0.98, 1.0,
  // #fb61da
  0.98, 0.38, 0.85, 1.0,
  // #61fbcf
  0.38, 0.98, 0.81, 1.0,
];
