(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var automatica11yTabPanels = function automatica11yTabPanels(tabPanelConfig) {
  {
    var _tabPanelConfig = tabPanelConfig,
        _tabPanelConfig$data = _tabPanelConfig.data;
    _tabPanelConfig$data = _tabPanelConfig$data === undefined ? {} : _tabPanelConfig$data;
    var _tabPanelConfig$data$ = _tabPanelConfig$data.identifier,
        identifier = _tabPanelConfig$data$ === undefined ? 'a11y-tabpanel' : _tabPanelConfig$data$,
        _tabPanelConfig$data$2 = _tabPanelConfig$data.tabList,
        tabList = _tabPanelConfig$data$2 === undefined ? 'a11y-tabpanel-tablist' : _tabPanelConfig$data$2,
        _tabPanelConfig$data$3 = _tabPanelConfig$data.tab,
        tab = _tabPanelConfig$data$3 === undefined ? 'a11y-tabpanel-tab' : _tabPanelConfig$data$3,
        _tabPanelConfig$data$4 = _tabPanelConfig$data.pane,
        pane = _tabPanelConfig$data$4 === undefined ? 'a11y-tabpanel-pane' : _tabPanelConfig$data$4,
        _tabPanelConfig$selec = _tabPanelConfig.selected;
    _tabPanelConfig$selec = _tabPanelConfig$selec === undefined ? {} : _tabPanelConfig$selec;
    var _tabPanelConfig$selec2 = _tabPanelConfig$selec.enable,
        enable = _tabPanelConfig$selec2 === undefined ? false : _tabPanelConfig$selec2,
        _tabPanelConfig$selec3 = _tabPanelConfig$selec.tab,
        selectedTab = _tabPanelConfig$selec3 === undefined ? {} : _tabPanelConfig$selec3,
        _tabPanelConfig$selec4 = _tabPanelConfig$selec.pane,
        selectedPane = _tabPanelConfig$selec4 === undefined ? {} : _tabPanelConfig$selec4;


    tabPanelConfig = {
      data: {
        identifier: identifier,
        tabList: tabList,
        tab: tab,
        pane: pane
      },
      selected: {
        enable: enable,
        tab: selectedTab,
        pane: selectedPane
      }
    };
  }

  var tabPanels = document.querySelectorAll('[data-' + tabPanelConfig.data.identifier + ']');

  var getPreviousTab = function getPreviousTab(currentTab) {
    var reference = currentTab.dataset.automatica11yTabpanelReference;
    var allTabs = document.querySelectorAll('[data-automatica11y-tabpanel-reference=\'' + reference + '\']');
    var previousTab = void 0;
    for (var _iterator = allTabs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var x = _ref;

      if (x.getAttribute('aria-selected') === 'true') {
        previousTab = x;
      }
    }
    return previousTab;
  };

  var roveFocus = function roveFocus(nextTab) {
    nextTab.focus();
  };

  var roveTabs = function roveTabs(previousTab, nextTab) {
    var associatedPane = document.getElementById(nextTab.getAttribute('aria-controls'));
    var previousPane = document.getElementById(previousTab.getAttribute('aria-controls'));

    previousTab.setAttribute('tabindex', -1);
    previousTab.setAttribute('aria-selected', false);
    previousPane.setAttribute('aria-hidden', true);

    nextTab.setAttribute('tabindex', 0);
    nextTab.setAttribute('aria-selected', true);
    associatedPane.setAttribute('aria-hidden', false);

    if (tabPanelConfig.selected.enable) {
      if (tabPanelConfig.selected.tab.attributes) {
        for (var _iterator2 = tabPanelConfig.selected.tab.attributes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var selectedTabAttribute = _ref2;

          previousTab.setAttribute(selectedTabAttribute, false);
          nextTab.setAttribute(selectedTabAttribute, true);
        }
      }
      if (tabPanelConfig.selected.tab.classes) {
        for (var _iterator3 = tabPanelConfig.selected.tab.classes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }

          var selectedTabClass = _ref3;

          previousTab.classList.remove(selectedTabClass);
          nextTab.classList.add(selectedTabClass);
        }
      }
      if (tabPanelConfig.selected.pane.attributes) {
        for (var _iterator4 = tabPanelConfig.selected.pane.attributes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
          var _ref4;

          if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref4 = _iterator4[_i4++];
          } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref4 = _i4.value;
          }

          var selectedPaneAttribute = _ref4;

          previousPane.setAttribute(selectedPaneAttribute, false);
          associatedPane.setAttribute(selectedPaneAttribute, true);
        }
      }
      if (tabPanelConfig.selected.pane.classes) {
        for (var _iterator5 = tabPanelConfig.selected.pane.classes, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
          var _ref5;

          if (_isArray5) {
            if (_i5 >= _iterator5.length) break;
            _ref5 = _iterator5[_i5++];
          } else {
            _i5 = _iterator5.next();
            if (_i5.done) break;
            _ref5 = _i5.value;
          }

          var selectedPaneClass = _ref5;

          previousPane.classList.remove(selectedPaneClass);
          associatedPane.classList.add(selectedPaneClass);
        }
      }
    }
  };

  var moveForwards = function moveForwards(e) {
    var currentTab = e.target;
    var currentTabIndex = parseInt(currentTab.dataset.automatica11yTabpanelTab, 10);
    var reference = currentTab.dataset.automatica11yTabpanelReference;
    var container = document.querySelector('[data-automatica11y-tabpanel=\'' + reference + '\']');
    var nextTabIndex = currentTabIndex + 1;
    var nextTab = container.querySelector('[data-automatica11y-tabpanel-tab=\'' + nextTabIndex + '\']') || container.querySelector('[data-automatica11y-tabpanel-tab=\'' + 0 + '\']');

    roveFocus(nextTab);
    roveTabs(currentTab, nextTab);
  };

  var moveBackwards = function moveBackwards(e) {
    var currentTab = e.target;

    var currentTabIndex = parseInt(currentTab.dataset.automatica11yTabpanelTab, 10);
    var reference = currentTab.dataset.automatica11yTabpanelReference;
    var container = document.querySelector('[data-automatica11y-tabpanel=\'' + reference + '\']');
    var nextTabIndex = currentTabIndex - 1;
    var allTabs = document.querySelectorAll('[data-automatica11y-tabpanel-reference=\'' + reference + '\']');
    var lastTabIndex = allTabs.length - 1;
    var nextTab = container.querySelector('[data-automatica11y-tabpanel-tab=\'' + nextTabIndex + '\']') || container.querySelector('[data-automatica11y-tabpanel-tab=\'' + lastTabIndex + '\']');

    roveFocus(nextTab);
    roveTabs(currentTab, nextTab);
  };

  var onClickEv = function onClickEv(e) {
    var eTarget = e.target;

    // some frameworks (e.g material design lite) add dynamically a span inside the tag (touch ripples)
    var targetTab = eTarget.dataset.automatica11yTabpanelTab ? eTarget : eTarget.parentNode;

    var previousTab = getPreviousTab(targetTab);
    roveTabs(previousTab, targetTab);
  };

  var onKeyEv = function onKeyEv(e) {
    if (e.keyCode === 39 || e.keyCode === 40) {
      e.preventDefault();
      moveForwards(e);
    }

    if (e.keyCode === 37 || e.keyCode === 38) {
      e.preventDefault();
      moveBackwards(e);
    }
  };

  for (var _iterator6 = tabPanels.entries(), _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
    var _ref6;

    if (_isArray6) {
      if (_i6 >= _iterator6.length) break;
      _ref6 = _iterator6[_i6++];
    } else {
      _i6 = _iterator6.next();
      if (_i6.done) break;
      _ref6 = _i6.value;
    }

    var _ref7 = _ref6,
        tabPanelIndex = _ref7[0],
        tabPanel = _ref7[1];

    var _tabList = tabPanel.querySelector('[data-' + tabPanelConfig.data.tabList + ']');
    var tabs = tabPanel.querySelectorAll('[data-' + tabPanelConfig.data.tab + ']');
    var panes = tabPanel.querySelectorAll('[data-' + tabPanelConfig.data.pane + ']');
    var firstTab = tabs[0];
    var firstPane = panes[0];

    _tabList.setAttribute('role', 'tablist');
    firstTab.setAttribute('tabindex', 0);
    firstTab.setAttribute('aria-selected', true);
    firstPane.setAttribute('aria-hidden', false);

    tabPanel.dataset.automatica11yTabpanel = tabPanelIndex;

    for (var _iterator7 = tabs.entries(), _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
      var _ref8;

      if (_isArray7) {
        if (_i7 >= _iterator7.length) break;
        _ref8 = _iterator7[_i7++];
      } else {
        _i7 = _iterator7.next();
        if (_i7.done) break;
        _ref8 = _i7.value;
      }

      var _ref9 = _ref8,
          tabIndex = _ref9[0],
          _tab = _ref9[1];

      _tab.dataset.automatica11yTabpanelReference = tabPanelIndex;
      _tab.dataset.automatica11yTabpanelTab = tabIndex;
      var _pane = panes[tabIndex];
      _pane.dataset.automatica11yTabpanelPane = tabIndex;

      if (tabIndex > 0) {
        _tab.setAttribute('tabindex', -1);
        _tab.setAttribute('aria-selected', false);
        _pane.setAttribute('aria-hidden', true);
      }

      _tab.setAttribute('role', 'tab');
      _pane.setAttribute('role', 'tabpanel');

      if (!_tab.id) {
        _tab.id = 'automatica11y-tabpanel-' + tabPanelIndex + '-tab-' + tabIndex;
      }

      if (!_pane.id) {
        _pane.id = 'automatica11y-tabpanel-' + tabPanelIndex + '-pane-' + tabIndex;
      }

      _tab.setAttribute('aria-controls', _pane.id);
      _pane.setAttribute('aria-labelledby', _tab.id);

      _tab.addEventListener('click', onClickEv);
      _tab.addEventListener('keydown', onKeyEv);
    }
  }
};

/* @license MIT. Copyright (c) 2016 Charbel Rami. All rights reserved. */

var automatica11y = function automatica11y() {
  var automatica11yConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var componentsConfig = automatica11yConfig.components || {};
  var tabPanelConfig = componentsConfig.tabPanel || {};

  automatica11yTabPanels(tabPanelConfig);
};

typeof automatica11yConfig === 'undefined' ? automatica11y() : automatica11y(automatica11yConfig); // eslint-disable-line no-undef, no-unused-expressions

module.exports = automatica11y;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBTSx5QkFBeUIsU0FBekIsc0JBQXlCLGlCQUFrQjtBQUMvQztBQUFBLDBCQWFNLGNBYk47QUFBQSwrQ0FFSSxJQUZKO0FBQUEsZ0VBT1EsRUFQUjtBQUFBLHFEQUdNLFVBSE47QUFBQSxRQUdNLFVBSE4seUNBR21CLGVBSG5CO0FBQUEsc0RBSU0sT0FKTjtBQUFBLFFBSU0sT0FKTiwwQ0FJZ0IsdUJBSmhCO0FBQUEsc0RBS00sR0FMTjtBQUFBLFFBS1csR0FMWCwwQ0FLaUIsbUJBTGpCO0FBQUEsc0RBTU0sSUFOTjtBQUFBLFFBTVksSUFOWiwwQ0FNbUIsb0JBTm5CO0FBQUEsZ0RBUUksUUFSSjtBQUFBLGtFQVlRLEVBWlI7QUFBQSx1REFTTSxNQVROO0FBQUEsUUFTTSxNQVROLDBDQVNlLEtBVGY7QUFBQSx1REFVTSxHQVZOO0FBQUEsUUFVVyxXQVZYLDBDQVV5QixFQVZ6QjtBQUFBLHVEQVdNLElBWE47QUFBQSxRQVdZLFlBWFosMENBVzJCLEVBWDNCOzs7QUFlRSxxQkFBaUI7QUFDZixZQUFNO0FBQ0osOEJBREk7QUFFSix3QkFGSTtBQUdKLGdCQUhJO0FBSUo7QUFKSSxPQURTO0FBT2YsZ0JBQVU7QUFDUixzQkFEUTtBQUVSLGFBQUssV0FGRztBQUdSLGNBQU07QUFIRTtBQVBLLEtBQWpCO0FBYUQ7O0FBRUQsTUFBTSxZQUFZLFNBQVMsZ0JBQVQsWUFBbUMsZUFBZSxJQUFmLENBQW9CLFVBQXZELE9BQWxCOztBQUVBLE1BQU0saUJBQWlCLFNBQWpCLGNBQWlCLGFBQWM7QUFDbkMsUUFBTSxZQUFZLFdBQVcsT0FBWCxDQUFtQiw4QkFBckM7QUFDQSxRQUFNLFVBQVUsU0FBUyxnQkFBVCwrQ0FBcUUsU0FBckUsU0FBaEI7QUFDQSxRQUFJLG9CQUFKO0FBQ0EseUJBQWdCLE9BQWhC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QU0sbUJBQW1CLG9CQUFvQixVQUFwQixJQUFrQyxFQUEzRDtBQUNBLE1BQU0saUJBQWlCLGlCQUFpQixRQUFqQixJQUE2QixFQUFwRDs7QUFFQSx5QkFBdUIsY0FBdkI7QUFDRCxDQUxEOztBQU9BLE9BQU8sbUJBQVAsS0FBK0IsV0FBL0IsR0FBNkMsZUFBN0MsR0FBK0QsY0FBYyxtQkFBZCxDQUEvRCxDLENBQW1HOztBQUVuRyxPQUFPLE9BQVAsR0FBaUIsYUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhdXRvbWF0aWNhMTF5VGFiUGFuZWxzID0gdGFiUGFuZWxDb25maWcgPT4ge1xuICB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YToge1xuICAgICAgICBpZGVudGlmaWVyID0gJ2ExMXktdGFicGFuZWwnLFxuICAgICAgICB0YWJMaXN0ID0gJ2ExMXktdGFicGFuZWwtdGFibGlzdCcsXG4gICAgICAgIHRhYjogdGFiID0gJ2ExMXktdGFicGFuZWwtdGFiJyxcbiAgICAgICAgcGFuZTogcGFuZSA9ICdhMTF5LXRhYnBhbmVsLXBhbmUnXG4gICAgICB9ID0ge30sXG4gICAgICBzZWxlY3RlZDoge1xuICAgICAgICBlbmFibGUgPSBmYWxzZSxcbiAgICAgICAgdGFiOiBzZWxlY3RlZFRhYiA9IHt9LFxuICAgICAgICBwYW5lOiBzZWxlY3RlZFBhbmUgPSB7fVxuICAgICAgfSA9IHt9XG4gICAgfSA9IHRhYlBhbmVsQ29uZmlnO1xuXG4gICAgdGFiUGFuZWxDb25maWcgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGlkZW50aWZpZXIsXG4gICAgICAgIHRhYkxpc3QsXG4gICAgICAgIHRhYixcbiAgICAgICAgcGFuZVxuICAgICAgfSxcbiAgICAgIHNlbGVjdGVkOiB7XG4gICAgICAgIGVuYWJsZSxcbiAgICAgICAgdGFiOiBzZWxlY3RlZFRhYixcbiAgICAgICAgcGFuZTogc2VsZWN0ZWRQYW5lXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHRhYlBhbmVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLSR7dGFiUGFuZWxDb25maWcuZGF0YS5pZGVudGlmaWVyfV1gKTtcblxuICBjb25zdCBnZXRQcmV2aW91c1RhYiA9IGN1cnJlbnRUYWIgPT4ge1xuICAgIGNvbnN0IHJlZmVyZW5jZSA9IGN1cnJlbnRUYWIuZGF0YXNldC5hdXRvbWF0aWNhMTF5VGFicGFuZWxSZWZlcmVuY2U7XG4gICAgY29uc3QgYWxsVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWF1dG9tYXRpY2ExMXktdGFicGFuZWwtcmVmZXJlbmNlPScke3JlZmVyZW5jZX0nXWApO1xuICAgIGxldCBwcmV2aW91c1RhYjtcbiAgICBmb3IgKGNvbnN0IHggb2YgYWxsVGFicykge1xuICAgICAgaWYgKHguZ2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykgPT09ICd0cnVlJykge1xuICAgICAgICBwcmV2aW91c1RhYiA9IHg7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcmV2aW91c1RhYlxuICB9O1xuXG4gIGNvbnN0IHJvdmVGb2N1cyA9IG5leHRUYWIgPT4ge1xuICAgIG5leHRUYWIuZm9jdXMoKTtcbiAgfTtcblxuICBjb25zdCByb3ZlVGFicyA9IChwcmV2aW91c1RhYiwgbmV4dFRhYikgPT4ge1xuICAgIGNvbnN0IGFzc29jaWF0ZWRQYW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmV4dFRhYi5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKSk7XG4gICAgY29uc3QgcHJldmlvdXNQYW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJldmlvdXNUYWIuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJykpO1xuXG4gICAgcHJldmlvdXNUYWIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICBwcmV2aW91c1RhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgcHJldmlvdXNQYW5lLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcblxuICAgIG5leHRUYWIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgIG5leHRUYWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSk7XG4gICAgYXNzb2NpYXRlZFBhbmUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcblxuICAgIGlmICh0YWJQYW5lbENvbmZpZy5zZWxlY3RlZC5lbmFibGUpIHtcbiAgICAgIGlmICh0YWJQYW5lbENvbmZpZy5zZWxlY3RlZC50YWIuYXR0cmlidXRlcykge1xuICAgICAgICBmb3IgKGNvbnN0IHNlbGVjdGVkVGFiQXR0cmlidXRlIG9mIHRhYlBhbmVsQ29uZmlnLnNlbGVjdGVkLnRhYi5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgcHJldmlvdXNUYWIuc2V0QXR0cmlidXRlKHNlbGVjdGVkVGFiQXR0cmlidXRlLCBmYWxzZSk7XG4gICAgICAgICAgbmV4dFRhYi5zZXRBdHRyaWJ1dGUoc2VsZWN0ZWRUYWJBdHRyaWJ1dGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGFiUGFuZWxDb25maWcuc2VsZWN0ZWQudGFiLmNsYXNzZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBzZWxlY3RlZFRhYkNsYXNzIG9mIHRhYlBhbmVsQ29uZmlnLnNlbGVjdGVkLnRhYi5jbGFzc2VzKSB7XG4gICAgICAgICAgcHJldmlvdXNUYWIuY2xhc3NMaXN0LnJlbW92ZShzZWxlY3RlZFRhYkNsYXNzKTtcbiAgICAgICAgICBuZXh0VGFiLmNsYXNzTGlzdC5hZGQoc2VsZWN0ZWRUYWJDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0YWJQYW5lbENvbmZpZy5zZWxlY3RlZC5wYW5lLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBzZWxlY3RlZFBhbmVBdHRyaWJ1dGUgb2YgdGFiUGFuZWxDb25maWcuc2VsZWN0ZWQucGFuZS5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgcHJldmlvdXNQYW5lLnNldEF0dHJpYnV0ZShzZWxlY3RlZFBhbmVBdHRyaWJ1dGUsIGZhbHNlKTtcbiAgICAgICAgICBhc3NvY2lhdGVkUGFuZS5zZXRBdHRyaWJ1dGUoc2VsZWN0ZWRQYW5lQXR0cmlidXRlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRhYlBhbmVsQ29uZmlnLnNlbGVjdGVkLnBhbmUuY2xhc3Nlcykge1xuICAgICAgICBmb3IgKGNvbnN0IHNlbGVjdGVkUGFuZUNsYXNzIG9mIHRhYlBhbmVsQ29uZmlnLnNlbGVjdGVkLnBhbmUuY2xhc3Nlcykge1xuICAgICAgICAgIHByZXZpb3VzUGFuZS5jbGFzc0xpc3QucmVtb3ZlKHNlbGVjdGVkUGFuZUNsYXNzKTtcbiAgICAgICAgICBhc3NvY2lhdGVkUGFuZS5jbGFzc0xpc3QuYWRkKHNlbGVjdGVkUGFuZUNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBtb3ZlRm9yd2FyZHMgPSBlID0+IHtcbiAgICBjb25zdCBjdXJyZW50VGFiID0gZS50YXJnZXQ7XG4gICAgY29uc3QgY3VycmVudFRhYkluZGV4ID0gcGFyc2VJbnQoY3VycmVudFRhYi5kYXRhc2V0LmF1dG9tYXRpY2ExMXlUYWJwYW5lbFRhYiwgMTApO1xuICAgIGNvbnN0IHJlZmVyZW5jZSA9IGN1cnJlbnRUYWIuZGF0YXNldC5hdXRvbWF0aWNhMTF5VGFicGFuZWxSZWZlcmVuY2U7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtYXV0b21hdGljYTExeS10YWJwYW5lbD0nJHtyZWZlcmVuY2V9J11gKTtcbiAgICBjb25zdCBuZXh0VGFiSW5kZXggPSBjdXJyZW50VGFiSW5kZXggKyAxO1xuICAgIGNvbnN0IG5leHRUYWIgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihgW2RhdGEtYXV0b21hdGljYTExeS10YWJwYW5lbC10YWI9JyR7bmV4dFRhYkluZGV4fSddYCkgfHwgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWF1dG9tYXRpY2ExMXktdGFicGFuZWwtdGFiPSckezB9J11gKTtcblxuICAgIHJvdmVGb2N1cyhuZXh0VGFiKTtcbiAgICByb3ZlVGFicyhjdXJyZW50VGFiLCBuZXh0VGFiKTtcbiAgfTtcblxuICBjb25zdCBtb3ZlQmFja3dhcmRzID0gZSA9PiB7XG4gICAgY29uc3QgY3VycmVudFRhYiA9IGUudGFyZ2V0O1xuXG4gICAgY29uc3QgY3VycmVudFRhYkluZGV4ID0gcGFyc2VJbnQoY3VycmVudFRhYi5kYXRhc2V0LmF1dG9tYXRpY2ExMXlUYWJwYW5lbFRhYiwgMTApO1xuICAgIGNvbnN0IHJlZmVyZW5jZSA9IGN1cnJlbnRUYWIuZGF0YXNldC5hdXRvbWF0aWNhMTF5VGFicGFuZWxSZWZlcmVuY2U7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtYXV0b21hdGljYTExeS10YWJwYW5lbD0nJHtyZWZlcmVuY2V9J11gKTtcbiAgICBjb25zdCBuZXh0VGFiSW5kZXggPSBjdXJyZW50VGFiSW5kZXggLSAxO1xuICAgIGNvbnN0IGFsbFRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1hdXRvbWF0aWNhMTF5LXRhYnBhbmVsLXJlZmVyZW5jZT0nJHtyZWZlcmVuY2V9J11gKTtcbiAgICBjb25zdCBsYXN0VGFiSW5kZXggPSBhbGxUYWJzLmxlbmd0aCAtIDE7XG4gICAgY29uc3QgbmV4dFRhYiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hdXRvbWF0aWNhMTF5LXRhYnBhbmVsLXRhYj0nJHtuZXh0VGFiSW5kZXh9J11gKSB8fCBjb250YWluZXIucXVlcnlTZWxlY3RvcihgW2RhdGEtYXV0b21hdGljYTExeS10YWJwYW5lbC10YWI9JyR7bGFzdFRhYkluZGV4fSddYCk7XG5cbiAgICByb3ZlRm9jdXMobmV4dFRhYik7XG4gICAgcm92ZVRhYnMoY3VycmVudFRhYiwgbmV4dFRhYik7XG4gIH07XG5cbiAgY29uc3Qgb25DbGlja0V2ID0gZSA9PiB7XG4gICAgY29uc3QgZVRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgLy8gc29tZSBmcmFtZXdvcmtzIChlLmcgbWF0ZXJpYWwgZGVzaWduIGxpdGUpIGFkZCBkeW5hbWljYWxseSBhIHNwYW4gaW5zaWRlIHRoZSB0YWcgKHRvdWNoIHJpcHBsZXMpXG4gICAgY29uc3QgdGFyZ2V0VGFiID0gZVRhcmdldC5kYXRhc2V0LmF1dG9tYXRpY2ExMXlUYWJwYW5lbFRhYiA/IGVUYXJnZXQgOiBlVGFyZ2V0LnBhcmVudE5vZGU7XG5cbiAgICBjb25zdCBwcmV2aW91c1RhYiA9IGdldFByZXZpb3VzVGFiKHRhcmdldFRhYik7XG4gICAgcm92ZVRhYnMocHJldmlvdXNUYWIsIHRhcmdldFRhYik7XG4gIH07XG5cbiAgY29uc3Qgb25LZXlFdiA9IGUgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDM5IHx8IGUua2V5Q29kZSA9PT0gNDApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVGb3J3YXJkcyhlKTtcbiAgICB9XG5cbiAgICBpZiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDM4KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtb3ZlQmFja3dhcmRzKGUpO1xuICAgIH1cbiAgfTtcblxuICBmb3IgKGNvbnN0IFt0YWJQYW5lbEluZGV4LCB0YWJQYW5lbF0gb2YgdGFiUGFuZWxzLmVudHJpZXMoKSkge1xuICAgIGNvbnN0IHRhYkxpc3QgPSB0YWJQYW5lbC5xdWVyeVNlbGVjdG9yKGBbZGF0YS0ke3RhYlBhbmVsQ29uZmlnLmRhdGEudGFiTGlzdH1dYCk7XG4gICAgY29uc3QgdGFicyA9IHRhYlBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLSR7dGFiUGFuZWxDb25maWcuZGF0YS50YWJ9XWApO1xuICAgIGNvbnN0IHBhbmVzID0gdGFiUGFuZWwucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtJHt0YWJQYW5lbENvbmZpZy5kYXRhLnBhbmV9XWApO1xuICAgIGNvbnN0IGZpcnN0VGFiID0gdGFic1swXTtcbiAgICBjb25zdCBmaXJzdFBhbmUgPSBwYW5lc1swXTtcblxuICAgIHRhYkxpc3Quc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYmxpc3QnKTtcbiAgICBmaXJzdFRhYi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgZmlyc3RUYWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSk7XG4gICAgZmlyc3RQYW5lLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBmYWxzZSk7XG5cbiAgICB0YWJQYW5lbC5kYXRhc2V0LmF1dG9tYXRpY2ExMXlUYWJwYW5lbCA9IHRhYlBhbmVsSW5kZXg7XG5cbiAgICBmb3IgKGNvbnN0IFt0YWJJbmRleCwgdGFiXSBvZiB0YWJzLmVudHJpZXMoKSkge1xuICAgICAgdGFiLmRhdGFzZXQuYXV0b21hdGljYTExeVRhYnBhbmVsUmVmZXJlbmNlID0gdGFiUGFuZWxJbmRleDtcbiAgICAgIHRhYi5kYXRhc2V0LmF1dG9tYXRpY2ExMXlUYWJwYW5lbFRhYiA9IHRhYkluZGV4O1xuICAgICAgY29uc3QgcGFuZSA9IHBhbmVzW3RhYkluZGV4XTtcbiAgICAgIHBhbmUuZGF0YXNldC5hdXRvbWF0aWNhMTF5VGFicGFuZWxQYW5lID0gdGFiSW5kZXg7XG5cbiAgICAgIGlmICh0YWJJbmRleCA+IDApIHtcbiAgICAgICAgdGFiLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG4gICAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICAgIHBhbmUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICB0YWIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYicpO1xuICAgICAgcGFuZS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcblxuICAgICAgaWYgKCF0YWIuaWQpIHtcbiAgICAgICAgdGFiLmlkID0gYGF1dG9tYXRpY2ExMXktdGFicGFuZWwtJHt0YWJQYW5lbEluZGV4fS10YWItJHt0YWJJbmRleH1gO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBhbmUuaWQpIHtcbiAgICAgICAgcGFuZS5pZCA9IGBhdXRvbWF0aWNhMTF5LXRhYnBhbmVsLSR7dGFiUGFuZWxJbmRleH0tcGFuZS0ke3RhYkluZGV4fWA7XG4gICAgICB9XG5cbiAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBwYW5lLmlkKTtcbiAgICAgIHBhbmUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknLCB0YWIuaWQpO1xuXG4gICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrRXYpO1xuICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleUV2KTtcbiAgICB9XG4gIH1cbn07XG5cbi8qIEBsaWNlbnNlIE1JVC4gQ29weXJpZ2h0IChjKSAyMDE2IENoYXJiZWwgUmFtaS4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gKi9cblxuY29uc3QgYXV0b21hdGljYTExeSA9IChhdXRvbWF0aWNhMTF5Q29uZmlnID0ge30pID0+IHtcbiAgY29uc3QgY29tcG9uZW50c0NvbmZpZyA9IGF1dG9tYXRpY2ExMXlDb25maWcuY29tcG9uZW50cyB8fCB7fTtcbiAgY29uc3QgdGFiUGFuZWxDb25maWcgPSBjb21wb25lbnRzQ29uZmlnLnRhYlBhbmVsIHx8IHt9O1xuXG4gIGF1dG9tYXRpY2ExMXlUYWJQYW5lbHModGFiUGFuZWxDb25maWcpO1xufTtcblxudHlwZW9mIGF1dG9tYXRpY2ExMXlDb25maWcgPT09ICd1bmRlZmluZWQnID8gYXV0b21hdGljYTExeSgpIDogYXV0b21hdGljYTExeShhdXRvbWF0aWNhMTF5Q29uZmlnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiwgbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cbm1vZHVsZS5leHBvcnRzID0gYXV0b21hdGljYTExeTtcbiJdfQ==
