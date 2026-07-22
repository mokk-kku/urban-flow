import { $ } from '../core/dom.js';
import { state } from '../core/app-state.js';
import { updateOverviewCountText } from '../maps/overview-layer.js';

export function setupLanguage() {
    document.documentElement.lang = state.currentLang;
    document.body.className = state.currentLang === 'th' ? 'th-lang' : '';

    document.querySelectorAll('[data-en]').forEach((el) => {
        el.innerText = el.getAttribute(`data-${state.currentLang}`);
    });

    document.querySelectorAll('[data-placeholder-en]').forEach((el) => {
        el.placeholder = el.getAttribute(`data-placeholder-${state.currentLang}`);
    });

    $('langStatusIndicator').innerText = state.currentLang.toUpperCase();
    updateOverviewCountText();
}
