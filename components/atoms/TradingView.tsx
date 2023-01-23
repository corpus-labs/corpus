import React, { useCallback } from 'react'
import { CHART_DATA_FEED } from '../../utils/chartDataConnector'
import {
  widget,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  ResolutionString,
} from '../../public/charting_library/charting_library'
import { UDFCompatibleDatafeed } from '../../public/datafeeds/udf/src/udf-compatible-datafeed'

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions['symbol']
  interval: ChartingLibraryWidgetOptions['interval']
  auto_save_delay: ChartingLibraryWidgetOptions['auto_save_delay']
  // BEWARE: no trailing slash is expected in feed URL
  datafeedUrl: string
  libraryPath: ChartingLibraryWidgetOptions['library_path']
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']
  chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']
  clientId: ChartingLibraryWidgetOptions['client_id']
  userId: ChartingLibraryWidgetOptions['user_id']
  fullscreen: ChartingLibraryWidgetOptions['fullscreen']
  autosize: ChartingLibraryWidgetOptions['autosize']
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides']
  overrides: ChartingLibraryWidgetOptions['overrides']
  containerId: ChartingLibraryWidgetOptions['container_id']
  theme: string
}

const TradingView: React.VFC = () => {
  const defaultProps: ChartContainerProps = {
    symbol: 'SOL/USDC',
    // @ts-ignore
    interval: '60',
    auto_save_delay: 5,
    theme: 'Dark',
    containerId: 'tv_chart_container',
    datafeedUrl: CHART_DATA_FEED,
    libraryPath: '/charting_library/',
    // chartsStorageUrl: 'https://saveload.tradingview.com',
    // chartsStorageApiVersion: '1.1',
    // clientId: 'tradingview.com',
    // userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  }

  const { theme } = defaultProps

  const tvWidgetRef = React.useRef<IChartingLibraryWidget | null>(null)
  // const index = React.useMemo(() => market.name + "-INDEX", [market.name]);
  const index = 'SOL/USDC'
  // const chartProperties = JSON.parse(
  //   localStorage.getItem("chartproperties") || "{}"
  // );

  React.useEffect(() => {
    // const savedProperties = flatten(chartProperties, {
    //   restrictTo: ["scalesProperties", "paneProperties", "tradingProperties"],
    // });

    const widgetOptions: ChartingLibraryWidgetOptions = {
      // symbol: market.name,
      // container: defaultProps.containerId!,
      symbol: index,
      // BEWARE: no trailing slash is expected in feed URL
      // tslint:disable-next-line:no-any
      // @ts-ignore
      datafeed: new UDFCompatibleDatafeed(defaultProps.datafeedUrl),
      interval:
        defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
      container_id:
        defaultProps.containerId as ChartingLibraryWidgetOptions['container_id'],
      library_path: defaultProps.libraryPath as string,
      // auto_save_delay: 5,
      locale: 'en',
      // header_widget_buttons_mode: 'fullsize',
      disabled_features: [
        'use_localstorage_for_settings',
        'show_logo_on_all_charts',
        'caption_buttons_text_if_possible',
        'header_symbol_search',
        'header_indicators',
        'header_settings',
        'header_compare',
        'control_bar',
        'main_series_scale_menu',
        'popup_hints',
        'timeframes_toolbar',
        'header_screenshot',
        'header_undo_redo',
        'header_widget_dom_node',
        'header_saveload',
        'header_chart_type',
        'scales_context_menu',
        'pane_context_menu',
        'header_symbol_search',
        'timeframes_toolbar',
        'source_selection_markers',
        'header_interval_dialog_button',
        'edit_buttons_in_legend',
        'header_settings',
        // 'context_menus',
        // 'left_toolbar',
      ],
      enabled_features: [
        'hide_left_toolbar_by_default',
        'items_favoriting',
        // 'volume_force_overlay',
        'create_volume_indicator_by_default_once',
        'header_settings',
      ],
      load_last_chart: true,
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      studies_overrides: defaultProps.studiesOverrides,

      favorites: {
        intervals: [
          '1' as ResolutionString,
          '5' as ResolutionString,
          '15' as ResolutionString,
          '30' as ResolutionString,
          '60' as ResolutionString,
          '240' as ResolutionString,
          '1D' as ResolutionString,
        ],
        chartTypes: ['Candles'],
      },
      loading_screen: { backgroundColor: 'rgba(24, 24, 27, 1)' },
      custom_css_url: '/tradingview.css',
      theme: 'Dark',
      overrides: {
        'paneProperties.background': 'rgba(24, 24, 27, 1)',
        'mainSeriesProperties.candleStyle.barColorsOnPrevClose': true,
        'mainSeriesProperties.candleStyle.drawWick': true,
        'mainSeriesProperties.candleStyle.drawBorder': true,
        'mainSeriesProperties.candleStyle.upColor': 'rgb(16, 185, 129)',
        'mainSeriesProperties.candleStyle.downColor': 'rgb(244, 63, 94)',
        // 'mainSeriesProperties.candleStyle.borderColor': 'rgb(16, 185, 129)',
        'mainSeriesProperties.candleStyle.borderUpColor': 'rgb(16, 185, 129)',
        'mainSeriesProperties.candleStyle.borderDownColor': 'rgb(244, 63, 94)',
        'mainSeriesProperties.candleStyle.wickUpColor': 'rgb(16, 185, 129)',
        'mainSeriesProperties.candleStyle.wickDownColor': 'rgb(244, 63, 94)',
        'paneProperties.vertGridProperties.color': 'rgba(39, 39, 42, 0.5)',
        'paneProperties.horzGridProperties.color': 'rgba(39, 39, 42, 0.5)',
        'scalesProperties.lineColor': 'rgb(39, 39, 42)',
      },
    }

    const tvWidget = new widget(widgetOptions)

    tvWidget.onChartReady(() => {
      tvWidgetRef.current = tvWidget
    })

    return () => {}
  }, [
    // market,
    // chartProperties,
    defaultProps.autosize,
    defaultProps.clientId,
    defaultProps.containerId,
    defaultProps.datafeedUrl,
    defaultProps.fullscreen,
    defaultProps.interval,
    defaultProps.libraryPath,
    defaultProps.studiesOverrides,
    defaultProps.theme,
    defaultProps.userId,
    index,
  ])

  return <div id={defaultProps.containerId} style={{ height: 'calc(75vh)' }} />
}

export default TradingView
