const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const element = '<body><button id="launcher">help</button></body>';
iframe.setAttribute('id', 'launcher');
iframe.contentWindow.document.open();
iframe.contentWindow.document.write(element);
iframe.contentWindow.document.close();
