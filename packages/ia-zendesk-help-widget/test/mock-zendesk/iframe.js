const iframe = document.createElement('iframe');
iframe.setAttribute('id', 'launcher');
iframe.src = '/base/test/mock-zendesk/content.html';
document.body.appendChild(iframe);
