import { buildSynopTable } from './synop.js';
import {  buildMetarTable } from './metar.js';
import { steps } from './steps.js';
import { populateForm } from './synopResolver.js';
import { populateMetarForm } from './metarResolver.js';
import { validateFlatData } from './rules/formular.js';


let current = 0;
const data = {};

function getFlattenedData() {
    return Object.assign({}, ...Object.values(data));
}

function getStepData(stepId) {
    return data[stepId] || {};
}

function saveStepData(stepId) {
    const d = {};
    document.querySelectorAll('[data-key]').forEach(el => {
        d[el.dataset.key] = el.value;
    });
    // data[stepId] = d;
    data[stepId] = { ...data[stepId], ...d };
}

function renderProgress() {
    const bar = document.getElementById('progress-bar');
    bar.innerHTML = '';
    
    const flatData = getFlattenedData();
    // Get list of steps that are valid for this specific evaluation hour
    const activeSteps = steps.filter(s => !s.visibleFn || s.visibleFn(flatData));

    activeSteps.forEach((s, i) => {
        const isDone = steps.indexOf(s) < current;
        const isActive = steps.indexOf(s) === current;

        const dotEl = document.createElement('div');
        dotEl.className = 'step-dot';
        dotEl.innerHTML = `
            <div class="dot ${isActive ? 'active' : isDone ? 'done' : ''}">
                ${isDone ? '<i class="ti ti-check" style="font-size:11px"></i>' : i + 1}
            </div>
            <span class="dot-label ${isActive ? 'active' : isDone ? 'done' : ''}">${s.label}</span>
        `;
        dotEl.addEventListener('click', () => {
            if (steps.indexOf(s) <= current) { 
                current = steps.indexOf(s); 
                render(); 
            }
        });
        bar.appendChild(dotEl);

        if (i < activeSteps.length - 1) {
            const conn = document.createElement('div');
            conn.className = `connector ${isDone ? 'done' : ''}`;
            bar.appendChild(conn);
        }
    });
}

function renderChips() {
    const container = document.getElementById('summary-chips');
    const chips = [];
    const flatData = getFlattenedData();

    steps.forEach((s, i) => {
        if (i >= current) return;

        if (s.visibleFn && !s.visibleFn(flatData)) return;

        const d = getStepData(s.id);
        const label = s.chipFn(d);
        if (label) {
            chips.push(`
                <span class="chip">
                    <i class="ti ${s.chipIcon}" aria-hidden="true"></i>
                    <span class="chip-val">${label}</span>
                    <span class="chip-edit" data-step="${i}">(edit)</span>
                </span>
            `);
        }
    });

    if (chips.length === 0) {
        container.innerHTML = '<span class="chips-placeholder">Completed fields will appear here</span>';
    } else {
        container.innerHTML = chips.join('');
        container.querySelectorAll('.chip-edit').forEach(el => {
            el.addEventListener('click', () => {
                current = parseInt(el.dataset.step);
                render();
            });
        });
    }
}

function fieldHtml(f, saved) {
    const val = saved[f.key] !== undefined ? saved[f.key] : '';
    
    if (f.type === 'select') {
        if (f.searchable) {
            // Build out a structured hidden list item template
            const itemsHtml = f.options.map(o => `
                <div class="custom-option-item" data-value="${o}">${o}</div>
            `).join('');
            
            return `
                <div class="field-group custom-select-wrapper" data-field-key="${f.key}">
                    <label>${f.label}</label>
                    <div class="search-input-container">
                        <input 
                            type="text" 
                            data-key="${f.key}" 
                            value="${val}" 
                            placeholder="Type to search weather... (e.g. rain)"
                            autocomplete="off"
                            class="custom-search-input"
                        />
                        ${val && val !== '—' ? '<span class="clear-select-btn">&times;</span>' : ''}
                    </div>
                    <!-- The dynamic container that holds matching weather options -->
                    <div class="custom-options-dropdown hidden-panel">
                        ${itemsHtml}
                    </div>
                </div>
            `;
        }
        
        // Fallback to standard dropdown if not explicitly marked searchable
        const opts = f.options.map(o => `<option value="${o}" ${o === val ? 'selected' : ''}>${o}</option>`).join('');
        return `
            <div class="field-group">
                <label>${f.label}</label>
                <select data-key="${f.key}">${opts}</select>
            </div>
        `;
    }
    
    // Default text/number input handling
    return `
        <div class="field-group">
            <label>${f.label}</label>
            <input
                type="${f.type}"
                data-key="${f.key}"
                value="${val}"
                placeholder="${f.placeholder || ''}"
                ${f.step ? `step="${f.step}"` : ''}
                ${f.min !== undefined ? `min="${f.min}"` : ''}
                ${f.max !== undefined ? `max="${f.max}"` : ''}
            >
        </div>
    `;
}

function renderStep() {
    const s = steps[current];
    const saved = getStepData(s.id);
    const flatData = getFlattenedData();
    const isLast = current === steps.length - 1;

    const fields = s.fields.filter(f => !f.visibleFn || f.visibleFn(flatData));

    let fieldsHtml = '';
    if (fields.length === 1) {
        fieldsHtml = `<div class="field-row single">${fields.map(f => fieldHtml(f, saved)).join('')}</div>`;
    }
    else if (fields.length === 2) {
        fieldsHtml = `<div class="field-row pairs">${fields.map(f => fieldHtml(f, saved)).join('')}</div>`;
    } else if (fields.length === 3) {
        fieldsHtml = `<div class="field-row triple">${fields.map(f => fieldHtml(f, saved)).join('')}</div>`;
    } else if (fields.length === 4) {
        fieldsHtml  = `<div class="field-row pairs">${fields.slice(0, 2).map(f => fieldHtml(f, saved)).join('')}</div>`;
        fieldsHtml += `<div class="field-row pairs">${fields.slice(2).map(f => fieldHtml(f, saved)).join('')}</div>`;
    } else if (fields.length === 5) {
        fieldsHtml  = `<div class="field-row pairs">${fields.slice(0, 2).map(f => fieldHtml(f, saved)).join('')}</div>`;
        fieldsHtml += `<div class="field-row triple">${fields.slice(2).map(f => fieldHtml(f, saved)).join('')}</div>`;
    } else {
        const half = Math.ceil(fields.length / 2);
        fieldsHtml  = `<div class="field-row">${fields.slice(0, half).map(f => fieldHtml(f, saved)).join('')}</div>`;
        fieldsHtml += `<div class="field-row">${fields.slice(half).map(f => fieldHtml(f, saved)).join('')}</div>`;
    }

    let textAreaHtml = '';
    if (s.textArea) {
        const ta = s.textArea;
        textAreaHtml = `
            <div class="field-group" style="margin-top:6px">
                <label>${ta.label}</label>
                <textarea data-key="${ta.key}" placeholder="${ta.placeholder}">${saved[ta.key] || ''}</textarea>
            </div>`;
    }

    const card = document.getElementById('step-card');
    card.innerHTML = `
        <div class="step-header">
            <div class="step-icon-circle"><i class="ti ${s.icon}" aria-hidden="true"></i></div>
            <div>
                <p class="step-title">${s.title}</p>
                <p class="step-hint">${s.hint}</p>
            </div>
        </div>
        <div id="step-fields">${fieldsHtml}${textAreaHtml}</div>
        <div class="nav-row">
            <div class="nav-left">
                ${current > 0
                    ? `<button class="btn-back" id="btn-back"><i class="ti ti-arrow-left" aria-hidden="true"></i> Back</button>`
                    : ''}
                <button class="btn-skip" id="btn-skip">Skip</button>
            </div>
            <div class="nav-right">
                <span class="step-counter">${current + 1} / ${steps.length}</span>
                <button class="btn-next ${isLast ? 'generate' : ''}" id="btn-next">
                    ${isLast
                        ? 'Generate SYNOP & METAR <i class="ti ti-sparkles" aria-hidden="true"></i>'
                        : 'Next <i class="ti ti-arrow-right" aria-hidden="true"></i>'}
                </button>
            </div>
        </div>
    `;

    if (document.getElementById('btn-back')) {
        document.getElementById('btn-back').addEventListener('click', () => {
            saveStepData(s.id);
            // current--;
            do {
                current--;
            } while (current > 0 && steps[current].visibleFn && !steps[current].visibleFn(getFlattenedData()));
            render();
        });
    }

    document.getElementById('btn-skip').addEventListener('click', () => {
        if (!isLast) { 
            do {
                current++;
            } while (current < steps.length - 1 && steps[current].visibleFn && !steps[current].visibleFn(getFlattenedData()));
            render();
            // current++; render(); 
        }
    });

    document.getElementById('btn-next').addEventListener('click', () => {
        saveStepData(s.id);
        if (isLast) {
            

            const flatData = Object.assign({}, ...Object.values(data));

            const validation = validateFlatData(flatData);

            if (!validation.isValid) {
                // If invalid, alert the user and stop execution immediately
                alert(`Cannot generate packets. Please fill out the following required fields:\n\n• ${validation.missingFields.join('\n• ')}`);
                return; // Stops the generation process
            }

            const btn = document.getElementById('btn-next');;
            btn.disabled = true;
            btn.classList.add('is-generating');

            btn.innerHTML = `Generating Packets <i class="ti ti-loader animate-spin" aria-hidden="true"></i>`;

            setTimeout(() => {
                const synop = buildSynopTable(flatData);
                const metar = buildMetarTable(flatData);

                openModal(synop, metar);

                populateForm(flatData);
                populateMetarForm(flatData)

                btn.disabled = false;
                btn.classList.remove('is-generating');
                btn.innerHTML = 'Generate SYNOP & METAR <i class="ti ti-sparkles" aria-hidden="true"></i>';
            }, 1000);

       
        } else {
            do {
                current++;
            } while (current < steps.length - 1 && steps[current].visibleFn && !steps[current].visibleFn(getFlattenedData()));
            render();
        }
    });

    document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
    const input = wrapper.querySelector('.custom-search-input');
    const dropdown = wrapper.querySelector('.custom-options-dropdown');
    const items = wrapper.querySelectorAll('.custom-option-item');
    const clearBtn = wrapper.querySelector('.clear-select-btn');

   function filterResults() {
    const queryWords = input.value.trim().toLowerCase().split(/\s+/);
    
    if (queryWords.length === 1 && queryWords[0] === '') {
        dropdown.classList.add('hidden-panel');
        return;
    }

    let hasMatches = false;
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const matchesAllWords = queryWords.every(word => text.includes(word));
        
        if (matchesAllWords) {
            item.style.display = 'block';
            hasMatches = true;
        } else {
            item.style.display = 'none';
        }
    });

    if (hasMatches) {
        dropdown.classList.remove('hidden-panel');
        
        // --- DYNAMIC DIRECTION HANDLING START ---
        // Get position of the input bounding box relative to the viewport window
        const inputRect = input.getBoundingClientRect();
        const dropdownMaxHeight = 220; // Matches your CSS max-height
        const windowHeight = window.innerHeight;
        
        // Calculate available space below the input box
        const spaceBelow = windowHeight - inputRect.bottom;
        
        // If space below is tighter than our menu height AND there is enough room up top, flip it!
        if (spaceBelow < dropdownMaxHeight && inputRect.top > dropdownMaxHeight) {
            dropdown.classList.remove('open-downward');
            dropdown.classList.add('open-upward');
        } else {
            dropdown.classList.remove('open-upward');
            dropdown.classList.add('open-downward');
        }
        // --- DYNAMIC DIRECTION HANDLING END ---
        
    } else {
        dropdown.classList.add('hidden-panel');
    }
}

    // 2. Trigger filtering on user typing input
    input.addEventListener('input', filterResults);
    input.addEventListener('focus', filterResults);

    // 3. Close the filter panel cleanly if the observer clicks outside the field
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            dropdown.classList.add('hidden-panel');
        }
    });

    // 4. Handle option selection
    items.forEach(item => {
        item.addEventListener('click', () => {
            const selectedValue = item.dataset.value;
            input.value = selectedValue;
            dropdown.classList.add('hidden-panel');
            
            // Re-render to show clear buttons if necessary
            saveStepData(steps[current].id);
            render();
        });
    });

    // 5. Handle selection clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '—';
            saveStepData(steps[current].id);
            render();
        });
    }
});
}

function render() {
    renderProgress();
    renderChips();
    renderStep();
}

render();

const modal = document.getElementById('result-modal');
const closeBtns = [
    document.getElementById('close-modal'),
    document.getElementById('close-modal-2')
];

const tabs = document.querySelectorAll('.tab');
const indicator = document.querySelector('.tab-indicator');

const synopContent = document.getElementById('synop-content');
const metarContent = document.getElementById('metar-content');

let activeTab = 'synop';

/* OPEN MODAL */
function openModal(synopHTML, metarHTML) {
    synopContent.innerHTML = synopHTML;
    metarContent.innerHTML = metarHTML;

    modal.classList.add('show');
}

/* CLOSE */
closeBtns.forEach(btn =>
    btn.addEventListener('click', () => modal.classList.remove('show'))
);

/* TAB SWITCH WITH ANIMATION */
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        if (tab.dataset.tab === activeTab) return;

        const current = document.getElementById(`${activeTab}-content`);
        const next = document.getElementById(`${tab.dataset.tab}-content`);

        // exit animation
        current.classList.remove('active');
        current.classList.add(
            tab.dataset.tab === 'synop' ? 'exit-right' : 'exit-left'
        );

        // enter animation
        next.classList.add('active');
        next.classList.remove('exit-left', 'exit-right');

        activeTab = tab.dataset.tab;

        // move indicator
        indicator.style.transform = `translateX(${index * 100}%)`;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

document.getElementById('copy-output').addEventListener('click', () => {
    const active = document.getElementById(`${activeTab}-content`);
    navigator.clipboard.writeText(active.innerText);
});





