const xhr = new XMLHttpRequest();
xhr.open('GET', '/server', true);

xhr.onload = () => {
  // Request finished. Do processing here.
};

xhr.send(null);