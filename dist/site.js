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
