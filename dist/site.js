document.getElementById('year').textContent = new Date().getFullYear();

// Illustrative hourly amounts only; replace with owner-approved assumptions.
const incomeLevels = {
  beginner: { label: '初心者', hourly: 2500 },
  intermediate: { label: '中級者', hourly: 3500 },
  advanced: { label: '上級者', hourly: 5000 },
};
const calculator = document.getElementById('income-calculator');
if (calculator) {
  const form = calculator.querySelector('form');
  const daysInput = document.getElementById('stream-days');
  const hoursInput = document.getElementById('stream-hours');
  const format = new Intl.NumberFormat('ja-JP');
  function updateIncome() {
    const days = Number(daysInput.value);
    const hours = Number(hoursInput.value);
    const level = incomeLevels[form.elements.experience.value];
    const totalHours = days * hours;
    const amount = totalHours * level.hourly;
    document.getElementById('days-value').textContent = `${days}日`;
    document.getElementById('hours-value').textContent = `${hours}時間`;
    daysInput.setAttribute('aria-valuetext', `${days}日`);
    hoursInput.setAttribute('aria-valuetext', `${hours}時間`);
    document.getElementById('monthly-income').textContent = format.format(amount);
    document.getElementById('monthly-hours').textContent = `${format.format(totalHours)}時間`;
    document.getElementById('experience-label').textContent = level.label;
    document.getElementById('hourly-rate').textContent = `${format.format(level.hourly)}円／時間`;
    document.getElementById('income-formula').textContent = `${days}日 × ${hours}時間 × ${format.format(level.hourly)}円 = ${format.format(amount)}円`;
  }
  form.addEventListener('input', updateIncome);
  form.addEventListener('change', updateIncome);
  form.addEventListener('reset', () => setTimeout(updateIncome, 0));
  form.addEventListener('submit', (event) => event.preventDefault());
  updateIncome();
  calculator.hidden = false;
}
