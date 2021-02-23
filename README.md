## 又是一个个人名片 API

基于 Vercel Severless 和 node.js 开发.

访问地址：[api.xecades.xyz/api](https://api.xecades.xyz/api)

---

### 调用方法

返回一个 svg 图片，可以作为普通图片链接使用（例如 markdown）

举个栗子：

```
![](https://api.xecades.xyz/api?color=777&bg=fff&img=1&date=2021-06-07&str=%202021%20年高考&quote=加油啊%20✨&github=Xecades&zhihu=@Xecades&qq=2135174618&email=i@xecades.xyz)
```

![](https://api.xecades.xyz/api?color=777&bg=fff&img=1&date=2021-06-07&str=%202021%20年高考&quote=加油啊%20✨&github=Xecades&zhihu=@Xecades&qq=2135174618&email=i@xecades.xyz)

这个例子包含了所有可以使用的参数，下面是详解.

---

基础地址:

```
https://api.xecades.xyz/api
```

![](https://api.xecades.xyz/api)

后文提及的所有参数都添加在这个 URL 后面.

---

参数列表（都是 `key=value` 形式）：

| key | 含义 | 可选值 | 默认值 | 在之前例子中的值 |
| - | - | - | - | - |
| img | 选择背景图片 | 1, 2, 3 | 1 | 1 |
| color | 文字的颜色（十六进制，**去掉前缀 "#"**） | 十六进制颜色 | 333333 | 777 |
| bg | 背景的颜色（十六进制，**去掉前缀 "#"**） | 十六进制颜色 | 透明 | fff |
| date | “距离 xxx 还有 xxx 天” 对应的日期（**前置 0 不能省略**） | yyyy-mm-dd | 2021-12-31 | 2021-06-07 |
| str | “距离 xxx 还有……” 中的 xxx（**空格应替换为 `%20`**） | 文本 | 2021 年末 | 2021 年高考 |
| quote | “距离 xxx 还有……” 下面的文字（**空格应替换为 `%20`**） | 文本 | ✨✨ | 加油啊 ✨ |
| 其他的 | 社交账号（见下） | 见下 | 无 | 见下 |

关于社交账号：

可选的种类：

```
alipay, bilibili, codepen, csdn, douban, email, facebook, github, google, pixiv, qq, quora, taobao, twitter, wechat, weibo, zhihu
```

举个栗子：

```
![](https://api.xecades.xyz/api?bg=fff&github=Xecades&codepen=Xecades&email=i@xecades.xyz&google=Xecades&qq=2135174618)
```

![](https://api.xecades.xyz/api?bg=fff&github=Xecades&codepen=Xecades&email=i@xecades.xyz&google=Xecades&qq=2135174618)

> 理论上可以设定任意数量个社交账号，但为了最佳视觉效果，推荐设置 5 个或 0 个。设置为 0 个时会自动隐藏空白区域