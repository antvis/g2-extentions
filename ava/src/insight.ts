import { generateInsightVisualizationSpec, insightPatternsExtractor } from "@antv/ava";
import { deepMix, map } from "@antv/util";
import type { Mark } from "@antv/g2";
import type { InsightExtractorProps } from "@antv/ava";

/** 目前可支持的能产生 insight annotations 的 marks */
export const INSIGHT_TYPES: InsightExtractorProps['insightType'][] = ["category_outlier", "trend", "change_point", "time_series_outlier", "low_variance"]

export type InsightOptions = Mark & InsightExtractorProps & {
  insightType: typeof INSIGHT_TYPES[number];
};

export const Insight = (options: InsightOptions) => {
  if(!options) return {}
  const { data, dimensions, measures, insightType, options: insightExtractorOptions, ...rest } = options;
  // TODO 增加 try catch 流程，避免报错影响图表渲染
  const patterns = insightPatternsExtractor({
    data,
    dimensions,
    measures,
    options: insightExtractorOptions,
    insightType,
  });
  // TODO 改成直接使用 insight 模块的绘制 mark 函数
  const specs = map(generateInsightVisualizationSpec({
    dimensions: map(dimensions, dimension => ({
      fieldName: dimension,
    })),
    measures,
    subspace: [],
    patterns,
    data
  }), result => result.chartSpec)
  const children = specs[0].children
  return children;
};