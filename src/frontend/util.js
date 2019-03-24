export default {

    // Обёртка над обыкновенным XHR-запросом.
    // Принимает url, объект с параметрами и callback, который будет вызван при получении ответа.
    request(url, params, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', constructGetUrl(url, params));
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                alert('AJAX failed!');
                callback(null, new Error('Error'));
            }
            else {
                callback(JSON.parse(xhr.responseText));
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
    },

    getElements() {
        const elements = [];

        function push(selector) {
            const element = document.querySelector(selector);
            if (element) elements.push(element);
        }

        for (let argument of arguments) {
            if (argument instanceof Array) {
                for (let value of argument)
                    push(value);
            } else {
                push(argument);
            }
        }
        return elements;
    }
}