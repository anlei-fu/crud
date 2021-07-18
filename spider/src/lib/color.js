const FAVORITE_COLORS = [
    {
        label: "primary",
        value: "#2D8CF0"
    },
    {
        label: "light primary",
        value: "#5CADFF"
    },
    {
        label: "dark primary",
        value: "#2B85E4"
    },
    {
        label: "info",
        value: "#2DB7F5"
    },
    {
        label: "success",
        value: "#19BE6B"
    },
    {
        label: "warning",
        value: "#FF9900"
    },
    {
        label: "error",
        value: "#ED4014"
    },
    {
        label: "title",
        value: "#17233D"
    },
    {
        label: "content",
        value: "#515A6E"
    },
    {
        label: "disable",
        value: "#C5C8CE"
    },
    {
        label: "border",
        value: "#DCDEE2"
    },
    {
        label: "divider",
        value: "#E8EAEC"
    },
    {
        label: "background",
        value: "#F8F8F9"
    },
]

/**
 * Convert int to hex string
 * 
 * @param {Number} value 
 * @returns {String}
 */
function toHex(value) {
    var hex = value.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

/**
 * Convert rgb to hex string
 * 
 * @param {Number} r 
 * @param {Number} g 
 * @param {Number} b 
 * @returns {String}
 */
function rgbToHex(r, g, b) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Resolve rgb from hex string
 * 
 * @param {String} colorHex 
 * @returns {{r:Number,g:Number,b:Number}?}
 */
function hexToRgb(colorHex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

/**
 * Adjust color lightbrightess
 * 
 * @param {String} colorHex 
 * @param {Number} percent  > 0 lighten or darken 
 * @returns {String}
 */
function adjustColor(colorHex, percent) {
    var R = parseInt(colorHex.substring(1, 3), 16);
    var G = parseInt(colorHex.substring(3, 5), 16);
    var B = parseInt(colorHex.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    var RR =
        R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG =
        G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB =
        B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
}

export default {
    FAVORITE_COLORS,
    hexToRgb,
    rgbToHex,
    adjustColor,
}