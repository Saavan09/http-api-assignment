//refernces
const pageSelect = document.getElementById('page');
const typeSelect = document.getElementById('type');
const sendButton = document.getElementById('send');
const contentDiv = document.getElementById('content');

sendButton.addEventListener('click', () => {
  const page = pageSelect.value;
  const type = typeSelect.value;

  fetch(page, { headers: { Accept: type } })
    .then((response) => response.text())
    .then((text) => {
      console.log(text);
      
      if (type === 'application/json') {
        const data = JSON.parse(text);
        contentDiv.innerHTML = data.message + (data.id ? ` (${data.id})` : '');
      } else {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const message = xmlDoc.getElementsByTagName('message')[0].textContent;
        const idElem = xmlDoc.getElementsByTagName('id')[0];
        const id = idElem ? ` (${idElem.textContent})` : '';
        contentDiv.innerHTML = message + id;
      }
    })
    .catch((err) => {
      console.error('Error fetching:', err);
      contentDiv.innerHTML = 'Error fetching response';
    });
});