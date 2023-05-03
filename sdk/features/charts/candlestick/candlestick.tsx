import React, { useEffect, useRef, useState } from 'react';
import LightweightCharts from 'lightweight-charts';

export type CandlestickChartProps = {
  /**
   * An array of OHLC values
   */
  ohlcv: Array<{
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }>;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function CandlestickChart({ ohlcv, ...rest }: CandlestickChartProps) {
  const chartRef = useRef();
  const [chart, setChart] = useState<LightweightCharts.IChartApi>();
  const [candleSeries, setCandleSeries] =
    useState<LightweightCharts.ISeriesApi<'Candlestick'>>();

  // Init chart on mount
  useEffect(() => {
    if (!chart) {
      const chart = LightweightCharts.createChart(chartRef.current, {
        width: 600,
        height: 300,
        crosshair: {
          mode: LightweightCharts.CrosshairMode.Normal,
        },
      });

      const candleSeries = chart.addCandlestickSeries();

      setChart(chart);
      setCandleSeries(candleSeries);
    }
  }, [chart]);

  // Add candlestick series after chart init
  useEffect(() => {
    if (!candleSeries && chart) {
      const candleSeries = chart.addCandlestickSeries();

      setCandleSeries(candleSeries);
    }
  }, [chart, candleSeries]);

  // Update chart on ohlcv change
  useEffect(() => {
    if (candleSeries && ohlcv) {
      candleSeries.setData(ohlcv);
    }
  }, [candleSeries, ohlcv]);

  return <div {...rest} ref={chartRef} />;
}
