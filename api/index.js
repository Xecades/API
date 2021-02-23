const moment = require("moment");
const request = require("request");
const fs = require("fs");

var param, width = 460;
const prefix = "http://api.xecades.xyz";
const offset = [0, 0, 4.8, 2.7];
const icons = ["alipay", "bilibili", "codepen", "csdn", "douban", "email", "facebook", "github", "google", "pixiv", "qq", "quora", "taobao", "twitter", "wechat", "weibo", "zhihu"];

function getBG() {
    var ret = 1;
    if (param.get("img") && +param.get("img") >= 1 && +param.get("img") <= 3)
        ret = +param.get("img");
    return ret;
}

function getBGOffset() {
    return offset[getBG()];
}

function readImage(url) {
    return new Promise((resolve, reject) => {
        request({url: url, encoding: "binary"}, function (err, resp, body) {
            if (!err && resp.statusCode == 200) resolve('data:image/png;base64,' + Buffer.from(body, 'binary').toString('base64'));
            else reject(err);
        });
    });
}

function readSVG(url) {
    return new Promise((resolve, reject) => {
        request(url, function (err, resp, body) {
            if (!err && resp.statusCode == 200) resolve('data:image/svg+xml;base64,' + Buffer.from(body, 'utf8').toString('base64'));
            else reject(err);
        });
    });
}

async function getSocial() {
    var can = [];
    var ret = "";

    for (var key of param.keys())
        if (icons.includes(key))
            can.push(key);

    if (can.length == 0) {
        width = 320;
        return "";
    }

    var margin = 40;
    var sp = (170 - margin) / can.length;

    for (var i = 0; i < can.length; i++) {
        ret += `
        <g class="item">
            <image class="icon" transform="translate(350 ${margin + sp * i + sp / 2 - 16})" href="${await readSVG(`${prefix}/res/icon/${can[i]}.svg`)}"/>
            <text class="text" transform="translate(370 ${margin + 12 + sp * i + sp / 2 - 16})">${param.get(can[i])}</text>
        </g>`;
    }

    return ret;
}

function getDur() {
    var date = param.get("date") || "";
    if (!moment(date).isValid())
        date = `${moment().year()}-12-31`;
    return -moment().diff(date, 'd');
}

function getStr() {
    var date = param.get("date") || "";
    if (!moment(date).isValid())
        return ` ${moment().year()} 年末`;
    if (param.get("str"))
        return param.get("str");
    return "一个特殊日期";
}

function getWeekday() {
    var ret = "";
    switch (+moment().format("d")) {
        case 0: ret = "星期日"; break;
        case 1: ret = "星期一"; break;
        case 2: ret = "星期二"; break;
        case 3: ret = "星期三"; break;
        case 4: ret = "星期四"; break;
        case 5: ret = "星期五"; break;
        case 6: ret = "星期六"; break;
    }
    return ret;
}

module.exports = async (req, res) => {
    moment.locale("zh-cn");
    param = new URLSearchParams(req.url.split("/api")[1]);

    res.setHeader("Content-Type", "image/svg+xml");
    const {
        background = await readImage(`${prefix}/res/bg/${getBG()}.png`),
        bg_offset = 250 - getBGOffset(),
        socialText = await getSocial(),
        dayOfYear = moment().dayOfYear(),
        year = moment().year(),
        month = moment().format('M'),
        day = moment().format('D'),
        weekday = getWeekday(),
        toStr = getStr(),
        toDur = getDur(),
        quote = param.get("quote") || "✨✨",
        fontColor = "#" + (param.get("color") || "333"),
        bgColor = "#" + (param.get("bg") || "")
    } = req.query;

    res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} 180">
    <defs>
        <style>
            svg {background-color: ${bgColor}; }
            #image .line { fill: none; stroke: ${fontColor}; opacity: .7; stroke-miterlimit: 10; stroke-width: 0.5px; stroke-linecap: round; }
            #image .bg { height: 250px; }
            #detail .text { font-size: 12px; fill: ${fontColor}; font-weight: lighter; }
            #contact .item .icon { width: 16px; height: 16px; }
            #contact .item .text { font-size: 10px; fill: ${fontColor}; font-weight: lighter; }
            #quote .text { font-size: 10px; fill: ${fontColor}; font-weight: lighter; }
        </style>
    </defs>
    <title>Postcard | Xecades</title>
    
    <g id="image">
        <line class="line" x1="250.5" y1="20" x2="250.5" y2="170"/>
        <image class="bg" transform="translate(${bg_offset} 32) scale(0.5)" href="${background}"/>
    </g>
    
    <g id="detail">
        <text class="text" transform="translate(20 35)">欢迎您朋友 🎉</text>
        <text class="text" transform="translate(20 65)">今天是 ${month} 月 ${day} 日，${weekday}</text>
        <text class="text" transform="translate(20 95)">也是 ${year} 年的第 ${dayOfYear} 天</text>
        <text class="text" transform="translate(20 125)">距离${toStr}还有 ${toDur} 天</text>
        <text class="text" transform="translate(20 155)">${quote}</text>
    </g>
    
    <g id="contact">${socialText}</g>
    </svg>`);
};
