const getRecentPosts = async () => {
    let postReq = await fetch("https://api.prts.top/v1/xml2json/?xml=https://blog.tnxg.top/atom.xml");
    let res = await postReq.json();
    var data = res.feed;
    document.getElementById("p-message").innerHTML = `<p>截止 ${parsetime(data.updated)}(博客文章最后修改时间) <b>天翔TNXGの空间站</b>上总计发布了 ${data.entry.length + 1} 篇文章，当前显示的是最新发布的 10 篇文章。</p>`
    var rtdt = [];
    for (let i = 0; i <= 9; i++) {
        rtdt.push({
            title: data.entry[i].title,
            link: data.entry[i].link.href + "?ref=homepage",
        });
    }
    return rtdt;
}
const printPosts = (data, dom) => {
    document.getElementById("p-load").remove();
    var container = dom;
    for (let i = 0; i <= data.length - 1; i++) {
        console.log(data[i])
        var element = document.createElement('div');
        element.classList = "item";
        element.innerHTML = `<a target="_blank" href="${data[i].link}">${data[i].title}</a>`
        container.appendChild(element);
    }
}

// 定义一个函数，用来获取最新的时间线数据
const getRecentbangumi = async () => {
    // 使用 fetch API 异步地从 API 接口获取 JSON 数据
    let timelineReq = await fetch("https://api.prts.top/v1/xml2json/?xml=https://bgm.tv/feed/user/tnxg/timeline");
    let res = await timelineReq.json();
    var data = res.rss.channel.item;
    console.log(data)
    // 提取出最新的 10 条时间线的内容和链接，并存储在一个数组中
    var rtdt = [];
    for (let i = 0; i <= 9; i++) {
        // 限制长度为20个字符，多出来的用[...]代替
        if (data[i].title.length > 20) {
            data[i].title = data[i].title.substring(0, 35) + "[...]";
            // 将多个空格替换为一个空格
            data[i].title = data[i].title.replace(/\s+/g, " ");
        }
        rtdt.push({
            content: data[i].title,
            link: data[i].guid.text,
            time: parsetime(data[i].pubDate),
        });
    }
    // 返回这个数组
    return rtdt;
}

// 定义一个函数，用来显示时间线数据
const printbangumi = (data, dom) => {
    document.getElementById("bangumi-load").remove();
    // 获取要显示时间线的网页元素
    var container = dom;
    // 遍历数组中的每个对象
    for (let i = 0; i <= data.length - 1; i++) {
        // 创建一个 div 元素，其中包含一个指向时间线链接的 a 元素
        var element = document.createElement('div');
        element.classList = "item";
        element.innerHTML = `<a target="_blank" href="${data[i].link}">${data[i].content}</a><p class="bangumi_right">${data[i].time}</p>`
        // 将 div 元素添加到网页元素中
        container.appendChild(element);
    }
}

setTimeout(async () => {
    let Postsdata = await getRecentPosts();
    printPosts(Postsdata, document.getElementById("recentposts"));
    let bangumidata = await getRecentbangumi();
    printbangumi(bangumidata, document.getElementById("recentbangumi"));
}, 1);

// iso时间转换为24小时制
function parsetime(Time) {
    date = new Date(Time);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate().toString().padStart(2, '0') + '&nbsp';
    h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    return (Y + M + D + h + m);
}

function render(text, devL, devW, sp) {
    if (sp) {
        document.getElementById("content").innerHTML = `<svg width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <g>
    <animateTransform attributeName="transform" type="rotate" values="0 33 33;270 33 33" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>
    <circle fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" stroke-dasharray="187" stroke-dashoffset="610">
        <animate attributeName="stroke" values="#4285F4;#DE3E35;#F7C223;#1B9A59;#4285F4" begin="0s" dur="5.6s" fill="freeze" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="rotate" values="0 33 33;135 33 33;450 33 33" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>
        <animate attributeName="stroke-dashoffset" values="187;46.75;187" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>
    </circle>
    </g>
</svg>`;
        return true;
    }
    var cl = text.length || devL;
    if (cl > 150 && !sp) return false;
    if (devL) {
        for (let i = 0; i < devL - 1; i++) {
            text += devW;
        }
    }
    var ctel = document.getElementsByClassName("content")[0];
    var width = document.body.clientWidth;
    ctel.setAttribute("style", "width: " + width * 0.8 + "px");
    if (width <= 320) {
        if (cl <= 12) {
            ctel.style["font-size"] = "2.5rem";
        } else if (cl >= 110) {
            ctel.style["font-size"] = "1.6rem";
        } else if (cl >= 90 && cl < 110) {
            ctel.style["font-size"] = "1.8rem";
        } else {
            ctel.style["font-size"] = "2rem";
        }
    }
    if (width <= 375 && width > 320) {
        if (cl <= 12) {
            ctel.style["font-size"] = "2.5rem";
        } else if (cl >= 110) {
            ctel.style["font-size"] = "1.65rem";
        } else if (cl >= 90 && cl < 110) {
            ctel.style["font-size"] = "1.8rem";
        } else {
            ctel.style["font-size"] = "2rem";
        }
    }
    if (width <= 425 && width > 375) {
        if (cl <= 12) {
            ctel.style["font-size"] = "2.5rem";
        } else if (cl >= 110) {
            ctel.style["font-size"] = "1.7rem";
        } else if (cl >= 90 && cl < 110) {
            ctel.style["font-size"] = "1.8rem";
        } else {
            ctel.style["font-size"] = "2rem";
        }
    }
    if (width <= 768 && width > 425) {
        if (cl <= 12) {
            ctel.style["font-size"] = "3rem";
        } else if (cl >= 110) {
            ctel.style["font-size"] = "2.1rem";
        } else if (cl >= 90 && cl < 110) {
            ctel.style["font-size"] = "2.35rem";
        } else {
            ctel.style["font-size"] = "2.75rem";
        }
    }
    if (width <= 1024 && width > 768) {
        if (cl <= 12) {
            ctel.style["font-size"] = "3.5rem";
        } else if (cl >= 110) {
            ctel.style["font-size"] = "2.75rem";
        } else if (cl >= 90 && cl < 110) {
            ctel.style["font-size"] = "2.9rem";
        } else {
            ctel.style["font-size"] = "3rem";
        }
    }
    if (width <= 1440 && width > 1024) {
        if (cl <= 12) {
            ctel.style["font-size"] = "4rem";
        } else if (cl >= 110) {
            ctel.style["font-size"] = "3rem";
        } else if (cl >= 90 && cl < 110) {
            ctel.style["font-size"] = "3.35rem";
        } else {
            ctel.style["font-size"] = "3.75rem";
        }
    }
    if (width > 1440) {
        if (cl <= 12) {
            ctel.style["font-size"] = "4rem";
        } else if (cl >= 110) {
            ctel.style["font-size"] = "3rem";
        } else if (cl >= 90 && cl < 110) {
            ctel.style["font-size"] = "3.35rem";
        } else {
            ctel.style["font-size"] = "3.75rem";
        }
    }
    document.getElementById("content").innerText = text;
}
render(false, false, false, true)