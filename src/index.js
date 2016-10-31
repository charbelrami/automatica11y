/* @license MIT. Copyright (c) 2016 Charbel Rami. All rights reserved. */

import automatica11yTabPanels from './tabpanel'

const automatica11y = (automatica11yConfig = {}) => {
  const componentsConfig = automatica11yConfig.components || {}
  const tabPanelConfig = componentsConfig.tabPanel || {}

  automatica11yTabPanels(tabPanelConfig)
}

typeof automatica11yConfig === 'undefined' ? automatica11y() : automatica11y(automatica11yConfig) // eslint-disable-line no-undef, no-unused-expressions

export default automatica11y
