import { DataSourceParam, useFont } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";

type Props = {
  text: string;
  size: number;
  fontSource: DataSourceParam;
};

export const useFontMeasurements = ({ text, size, fontSource }: Props) => {
  const [textParams, setTextParams] = useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });
  const font = useFont(fontSource, size);

  useEffect(() => {
    if (!fontSource || !text || !size || !font) return;

    const { width, height, y } = font.measureText(text);

    setTextParams({ width, height: height - y / 2 });
  }, [font, size, fontSource, text]);

  return {
    height: textParams?.height,
    width: textParams?.width,
  };
};
