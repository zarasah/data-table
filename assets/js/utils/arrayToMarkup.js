const arrayToMarkip = ($elem, arr = [], rendererCallback) => {
    return arr.map(rendererCallback).join('');

    // const markup = arr.map(rendererCallback).join('');

    // $elem.innerHTML = markup
};

export default arrayToMarkup;

// sarqel kamayakan table u ira vra pordzel