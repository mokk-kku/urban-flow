import { $ } from '../core/dom.js';
import { escapeHtml } from '../core/utils.js';

export function showResultMessage(message, isError = false) {
    $('results').className = 'empty-state';
    $('results').innerHTML = `${isError ? '❌ ' : ''}${escapeHtml(message)}`;
}

export function showApiStatus(html) {
    $('api-status').classList.remove('hidden');
    $('api-status').innerHTML = html;
}

export function hideApiStatus() {
    $('api-status').classList.add('hidden');
    $('api-status').innerHTML = '';
}
