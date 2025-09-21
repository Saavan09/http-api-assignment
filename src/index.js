//refernces
const pageSelect = document.querySelector('#page');
const typeSelect = document.querySelector('#type');
const sendButton = document.querySelector('#send');
const contentDiv = document.querySelector('#content');

sendButton.addEventListener('click', function () {
  const page = pageSelect.value;
  const type = typeSelect.value;

  fetch(page, { headers: { Accept: type } })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      console.log(text);

      let output = '';

      if (type === 'application/json') {
        const data = JSON.parse(text);
        if (data.id) {
          output += `<b>${data.id}</b><br>`;
        }
        output += `Message: ${data.message}`;
      } else {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const message = xmlDoc.getElementsByTagName('message')[0].textContent;
        const idElem = xmlDoc.getElementsByTagName('id')[0];
        if (idElem) {
          output += `<b>${idElem.textContent}</b><br>`;
        }
        output += `Message: ${message}`;
      }

      contentDiv.innerHTML = output;
    })
    .catch(function (err) {
      console.error('Error fetching:', err);
      contentDiv.innerHTML = '<b>Error</b><br>Message: Error fetching response';
    });
});