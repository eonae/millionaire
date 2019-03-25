function constructGetUrl(url, paramsObj) {
  let query = url;
  if (paramsObj && Object.keys(paramsObj).length != 0) {
      let delim = '?';
      for (let key in paramsObj) {
          query += `${delim}${key}=${paramsObj[key]}`;
      }
  }
  return query;
}

export default {
  
  get(url, params, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', constructGetUrl(url, params));
    xhr.send();
    xhr.onload = () => {
        if (xhr.status != 200) {
            alert('AJAX failed!');
            callback(new Error('Error'));
        } else {
            callback(null, JSON.parse(xhr.responseText));
        }
    };
  }
}
  // Обёртка над обыкновенным XHR-запросом.
  // Принимает url, объект с параметрами и callback, который будет вызван при получении ответа.