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

    // Обёртка над обыкновенным XHR-запросом.
    // Принимает url, объект с параметрами и callback, который будет вызван при получении ответа.
    ajax(url, params, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', constructGetUrl(url, params));
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                callback(JSON.parse(xhr.responseText));
            }
            else {
                callback(null, JSON.parse(xhr.responseText));
            }
        };
    },

    setInnerText(element, value) {
        element.textContent = value;
    },

    create(tagName, classList, text) {
        var $elem = document.createElement(tagName);
        if (classList) {
            for (var cls of classList)
                $elem.classList.add(cls);
        }
        if (text)
            $elem.textContent = text;
    
        return $elem;
    }
    

}