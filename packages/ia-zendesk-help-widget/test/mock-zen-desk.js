const iframe = document.createElement('iframe');
iframe.setAttribute('id', 'launcher');
document.body.appendChild(iframe);
const element = '<body><button>help</button></body>';
iframe.contentWindow.document.open();
iframe.contentWindow.document.write(element);
iframe.contentWindow.document.close();
