import {
  Canvas,
  Group,
  Paint,
  Paragraph,
  Shadow,
  SkParagraphStyle,
  Skia,
  TextAlign,
  useFont,
  useFonts,
} from "@shopify/react-native-skia";
import React, { useMemo } from "react";
import { _colors, colors, fontStyle, source } from "./styles";
import { useFontMeasurements } from "./useFontMeasurements";
import { View, ViewStyle } from "react-native";

export const CustomFont = ({
  text,
  style,
  color,
  contentContainerStyle,
}: {
  text: string;
  style?: SkParagraphStyle["textStyle"];
  color?: string;
  contentContainerStyle?: ViewStyle;
}) => {
  const { height, width } = useFontMeasurements({
    text: text,
    fontSource: require("../../assets/fonts/AnekLatin-Bold.ttf"),
    size: style?.fontSize ?? fontStyle.textStyle.fontSize,
  });

  const customFontMgr = useFonts({
    ["Anek-Bold"]: [require("../../assets/fonts/AnekLatin-Bold.ttf")],
  });

  const outerStroke = useMemo(() => {
    if (!customFontMgr) {
      return null;
    }

    const foregroundPaint = Skia.Paint();
    foregroundPaint.setStyle(fontStyle.paragraphStyle.foregroundPrimaryStyle);
    foregroundPaint.setColor(fontStyle.paragraphStyle.foregroundPrimaryColor);
    foregroundPaint.setStrokeWidth(
      fontStyle.paragraphStyle.foregroundStrokeWidth,
    );

    return Skia.ParagraphBuilder.Make(
      { textAlign: TextAlign.Center },
      customFontMgr,
    )
      .pushStyle({ ...fontStyle.textStyle, ...style }, foregroundPaint)
      .addText(text)
      .pop()
      .build();
  }, [customFontMgr, text]);

  const innerFont = useMemo(() => {
    if (!customFontMgr) {
      return null;
    }

    const innerFontStyle = {
      ...fontStyle.textStyle,
      ...style,
      color: Skia.Color(color ?? "white"),
    };

    return Skia.ParagraphBuilder.Make(
      { textAlign: TextAlign.Center },
      customFontMgr,
    )
      .pushStyle(innerFontStyle)
      .addText(text)
      .pop()
      .build();
  }, [customFontMgr, text]);

  return (
    <View style={contentContainerStyle}>
      <Canvas
        style={{
          width: width,
          height: height,
        }}
      >
        <Group
          layer={
            <Paint>
              <Shadow
                blur={0}
                dx={fontStyle.shadow.dx}
                dy={fontStyle.shadow.dy}
                color={colors.black}
              />
            </Paint>
          }
        >
          <Paragraph paragraph={outerStroke} x={0} y={0} width={width} />
          <Paragraph paragraph={innerFont} x={0} y={0} width={width} />
        </Group>
      </Canvas>
    </View>
  );
};
