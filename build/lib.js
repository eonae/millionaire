module.exports = {
    regexMatchOneOf(string, patterns) {
        for (let i = 0; i < patterns.length; i++) {
            if (patterns[i].test(string))
                return true;
        }
        return false;
    }
}
