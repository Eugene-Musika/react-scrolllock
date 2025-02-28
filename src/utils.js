import { canUseDOM } from 'exenv';

export const listenerOptions = {
  capture: false,
  passive: false,
};

// ==============================
// Touch Helpers
// ==============================

export function preventTouchMove(e) {
  e.preventDefault();

  return false;
}

export function allowTouchMove(e) {
  const target = e.currentTarget;

  if (target.scrollHeight > target.clientHeight
  || target.scrollWidth > target.clientWidth) {
    e.stopPropagation();
    return true;
  }

  e.preventDefault();
  return false;
}

export function preventInertiaScroll() {
  const top = this.scrollTop;
  const totalScroll = this.scrollHeight;
  const currentScroll = top + this.offsetHeight;

  if (top === 0) {
    this.scrollTop = 1;
  } else if (currentScroll === totalScroll) {
    this.scrollTop = top - 1;
  }
}

// `ontouchstart` check works on most browsers
// `maxTouchPoints` works on IE10/11 and Surface
export function isTouchDevice() {
  if (!canUseDOM) return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

// ==============================
// Misc.
// ==============================

export function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function parse(val: number | string): string {
  return isNaN(val) ? val : `${val}px`;
}

// Take a list of functions and return a function that applies the list of
// functions from left to right

const pipeFns = (a, b) => (...args) => b(a(...args));
export const pipe = (...fns) => fns.reduce(pipeFns);

// ==============================
// Document Helpers
// ==============================

export function getPadding() {
  if (!canUseDOM) return 0;

  const paddingRight = parseInt(window.getComputedStyle(document.body).paddingRight, 10);
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  return paddingRight + scrollbarWidth;
}

export function getWindowHeight(multiplier = 1) {
  if (canUseDOM) {
    return window.innerHeight * multiplier;
  }
}

export function getDocumentHeight() {
  if (canUseDOM) {
    return document.body.clientHeight;
  }
}

// ==============================
// Style Sheets
// ==============================

export function makeStyleTag() {
  if (!canUseDOM) return;

  let tag = document.createElement('style');
  tag.type = 'text/css';
  tag.setAttribute('data-react-scrolllock', '');

  return tag;
}
export function injectStyles(tag, css) {
  if (!canUseDOM) return;

  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
export function insertStyleTag(tag) {
  if (!canUseDOM) return;

  const head = document.head || document.getElementsByTagName('head')[0];

  head.appendChild(tag);
}
