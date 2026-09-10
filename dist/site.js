/* Set an actual contact destination when the business contact is ready. */
const contactUrl = '';
if (contactUrl && /^https:\/\//.test(contactUrl)) {
  const action = document.getElementById('contact-action');
  const link = document.createElement('a');
  link.className = 'button';
  link.href = contactUrl;
  link.textContent = 'まずは気軽に相談する ↗';
  action.replaceChildren(link);
}
document.getElementById('year').textContent = new Date().getFullYear();
for (const link of document.querySelectorAll('[data-course]')) {
  link.addEventListener('click', () => {
    let note = document.getElementById('selected-course');
    if (!note) {
      note = document.createElement('p');
      note.id = 'selected-course';
      note.className = 'selected-course';
      note.setAttribute('role', 'status');
      document.getElementById('contact-action').before(note);
    }
    note.textContent = `ご相談希望：${link.dataset.course}`;
  });
}
