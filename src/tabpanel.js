const automatica11yTabPanels = tabPanelConfig => {
  {
    const {
      data: {
        identifier = 'a11y-tabpanel',
        tabList = 'a11y-tabpanel-tablist',
        tab: tab = 'a11y-tabpanel-tab',
        pane: pane = 'a11y-tabpanel-pane'
      } = {},
      selected: {
        enable = false,
        tab: selectedTab = {},
        pane: selectedPane = {}
      } = {}
    } = tabPanelConfig

    tabPanelConfig = {
      data: {
        identifier,
        tabList,
        tab,
        pane
      },
      selected: {
        enable,
        tab: selectedTab,
        pane: selectedPane
      }
    }
  }

  const tabPanels = document.querySelectorAll(`[data-${tabPanelConfig.data.identifier}]`)

  const getPreviousTab = currentTab => {
    const reference = currentTab.dataset.automatica11yTabpanelReference
    const allTabs = document.querySelectorAll(`[data-automatica11y-tabpanel-reference='${reference}']`)
    let previousTab
    for (const x of allTabs) {
      if (x.getAttribute('aria-selected') === 'true') {
        previousTab = x
      }
    }
    return previousTab
  }

  const roveFocus = nextTab => {
    nextTab.focus()
  }

  const roveTabs = (previousTab, nextTab) => {
    const associatedPane = document.getElementById(nextTab.getAttribute('aria-controls'))
    const previousPane = document.getElementById(previousTab.getAttribute('aria-controls'))

    previousTab.setAttribute('tabindex', -1)
    previousTab.setAttribute('aria-selected', false)
    previousPane.setAttribute('aria-hidden', true)

    nextTab.setAttribute('tabindex', 0)
    nextTab.setAttribute('aria-selected', true)
    associatedPane.setAttribute('aria-hidden', false)

    if (tabPanelConfig.selected.enable) {
      if (tabPanelConfig.selected.tab.attributes) {
        for (const selectedTabAttribute of tabPanelConfig.selected.tab.attributes) {
          previousTab.setAttribute(selectedTabAttribute, false)
          nextTab.setAttribute(selectedTabAttribute, true)
        }
      }
      if (tabPanelConfig.selected.tab.classes) {
        for (const selectedTabClass of tabPanelConfig.selected.tab.classes) {
          previousTab.classList.remove(selectedTabClass)
          nextTab.classList.add(selectedTabClass)
        }
      }
      if (tabPanelConfig.selected.pane.attributes) {
        for (const selectedPaneAttribute of tabPanelConfig.selected.pane.attributes) {
          previousPane.setAttribute(selectedPaneAttribute, false)
          associatedPane.setAttribute(selectedPaneAttribute, true)
        }
      }
      if (tabPanelConfig.selected.pane.classes) {
        for (const selectedPaneClass of tabPanelConfig.selected.pane.classes) {
          previousPane.classList.remove(selectedPaneClass)
          associatedPane.classList.add(selectedPaneClass)
        }
      }
    }
  }

  const moveForwards = e => {
    const currentTab = e.target
    const currentTabIndex = parseInt(currentTab.dataset.automatica11yTabpanelTab, 10)
    const reference = currentTab.dataset.automatica11yTabpanelReference
    const container = document.querySelector(`[data-automatica11y-tabpanel='${reference}']`)
    const nextTabIndex = currentTabIndex + 1
    const nextTab = container.querySelector(`[data-automatica11y-tabpanel-tab='${nextTabIndex}']`) || container.querySelector(`[data-automatica11y-tabpanel-tab='${0}']`)

    roveFocus(nextTab)
    roveTabs(currentTab, nextTab)
  }

  const moveBackwards = e => {
    const currentTab = e.target

    const currentTabIndex = parseInt(currentTab.dataset.automatica11yTabpanelTab, 10)
    const reference = currentTab.dataset.automatica11yTabpanelReference
    const container = document.querySelector(`[data-automatica11y-tabpanel='${reference}']`)
    const nextTabIndex = currentTabIndex - 1
    const allTabs = document.querySelectorAll(`[data-automatica11y-tabpanel-reference='${reference}']`)
    const lastTabIndex = allTabs.length - 1
    const nextTab = container.querySelector(`[data-automatica11y-tabpanel-tab='${nextTabIndex}']`) || container.querySelector(`[data-automatica11y-tabpanel-tab='${lastTabIndex}']`)

    roveFocus(nextTab)
    roveTabs(currentTab, nextTab)
  }

  const onClickEv = e => {
    const eTarget = e.target

    // some frameworks (e.g material design lite) add dynamically a span inside the tag (touch ripples)
    const targetTab = eTarget.dataset.automatica11yTabpanelTab ? eTarget : eTarget.parentNode

    const previousTab = getPreviousTab(targetTab)
    roveTabs(previousTab, targetTab)
  }

  const onKeyEv = e => {
    if (e.keyCode === 39 || e.keyCode === 40) {
      e.preventDefault()
      moveForwards(e)
    }

    if (e.keyCode === 37 || e.keyCode === 38) {
      e.preventDefault()
      moveBackwards(e)
    }
  }

  for (const [tabPanelIndex, tabPanel] of tabPanels.entries()) {
    const tabList = tabPanel.querySelector(`[data-${tabPanelConfig.data.tabList}]`)
    const tabs = tabPanel.querySelectorAll(`[data-${tabPanelConfig.data.tab}]`)
    const panes = tabPanel.querySelectorAll(`[data-${tabPanelConfig.data.pane}]`)
    const firstTab = tabs[0]
    const firstPane = panes[0]

    tabList.setAttribute('role', 'tablist')
    firstTab.setAttribute('tabindex', 0)
    firstTab.setAttribute('aria-selected', true)
    firstPane.setAttribute('aria-hidden', false)

    tabPanel.dataset.automatica11yTabpanel = tabPanelIndex

    for (const [tabIndex, tab] of tabs.entries()) {
      tab.dataset.automatica11yTabpanelReference = tabPanelIndex
      tab.dataset.automatica11yTabpanelTab = tabIndex
      const pane = panes[tabIndex]
      pane.dataset.automatica11yTabpanelPane = tabIndex

      if (tabIndex > 0) {
        tab.setAttribute('tabindex', -1)
        tab.setAttribute('aria-selected', false)
        pane.setAttribute('aria-hidden', true)
      }

      tab.setAttribute('role', 'tab')
      pane.setAttribute('role', 'tabpanel')

      if (!tab.id) {
        tab.id = `automatica11y-tabpanel-${tabPanelIndex}-tab-${tabIndex}`
      }

      if (!pane.id) {
        pane.id = `automatica11y-tabpanel-${tabPanelIndex}-pane-${tabIndex}`
      }

      tab.setAttribute('aria-controls', pane.id)
      pane.setAttribute('aria-labelledby', tab.id)

      tab.addEventListener('click', onClickEv)
      tab.addEventListener('keydown', onKeyEv)
    }
  }
}

export default automatica11yTabPanels
