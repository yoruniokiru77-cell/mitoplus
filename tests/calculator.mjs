import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Exercise the shipped event handlers without adding browser dependencies.
const handlers = {};
const form = {
  elements: { experience: { value: 'beginner' } },
  addEventListener: (name, callback) => { handlers[name] = callback; },
};
const nodes = new Map();
for (const id of ['year', 'income-calculator', 'stream-days', 'stream-hours',
  'days-value', 'hours-value', 'monthly-income', 'monthly-hours',
  'experience-label', 'hourly-rate', 'income-formula']) {
  nodes.set(id, { textContent: '', attributes: {}, setAttribute(name, value) { this.attributes[name] = value; } });
}
nodes.get('income-calculator').querySelector = () => form;
nodes.get('income-calculator').hidden = true;
nodes.get('stream-days').value = '4';
nodes.get('stream-hours').value = '3';
const scheduled = [];
vm.runInNewContext(readFileSync('dist/site.js', 'utf8'), {
  document: { getElementById: (id) => nodes.get(id) },
  Intl, Date, setTimeout: (callback) => scheduled.push(callback),
});
const value = (id) => nodes.get(id).textContent;
assert.equal(value('monthly-income'), '30,000');
assert.equal(nodes.get('income-calculator').hidden, false);
nodes.get('stream-days').value = '10';
nodes.get('stream-hours').value = '2.5';
form.elements.experience.value = 'intermediate';
handlers.input();
assert.equal(value('monthly-income'), '87,500');
assert.equal(value('monthly-hours'), '25時間');
assert.equal(value('experience-label'), '中級者');
assert.equal(value('income-formula'), '10日 × 2.5時間 × 3,500円 = 87,500円');
nodes.get('stream-days').value = '30';
nodes.get('stream-hours').value = '12';
form.elements.experience.value = 'advanced';
handlers.change();
assert.equal(value('monthly-income'), '1,800,000');
assert.equal(nodes.get('stream-hours').attributes['aria-valuetext'], '12時間');
handlers.reset();
// Native form reset restores inputs after dispatching the reset event.
nodes.get('stream-days').value = '4';
nodes.get('stream-hours').value = '3';
form.elements.experience.value = 'beginner';
scheduled.forEach((callback) => callback());
assert.equal(value('monthly-income'), '30,000');
assert.equal(value('days-value'), '4日');
assert.equal(value('experience-label'), '初心者');
console.log('Calculator passed: initial result, live input, experience selection, fractional hours, upper bounds, reset.');
