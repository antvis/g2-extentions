import { Polyline } from "@antv/g";
import { ShapeComponent as SC, select, applyStyle } from "@antv/g2";

export type LineOptions = Record<string, any>;

export const Line: SC<LineOptions> = (options, context) => {
  return (P, value, defaults) => {
    const { color: defaultColor, lineWidth: defaultSize, ...rest } = defaults;
    const { color = defaultColor, size = defaultSize } = value;
    const stroke = color;
    const finalStyle = {
      isBillboard: true,
      ...rest,
      ...(stroke && { stroke }),
      ...(size && { lineWidth: size }),
    };

    return select(new Polyline()).style("points", P).call(applyStyle, finalStyle).node();
  };
};

Line.props = {
  defaultMarker: "line",
};
