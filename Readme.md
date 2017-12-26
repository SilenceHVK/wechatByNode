# Node.js 微信公众号开发 ![git start](https://img.shields.io/github/stars/silencehvk/wechatbynode.svg?style=social&label=Star) ![git fork](https://img.shields.io/github/forks/silencehvk/wechatbynode.svg?style=social&label=Fork) [![](https://img.shields.io/github/issues/silencehvk/wechatbynode.svg?style=social&label=Issues)](https://github.com/silencehvk/wechatbynode/issues) [![](https://img.shields.io/github/release/silencehvk/wechatbynode.svg?style=social&label=Releases)](https://github.com/silencehvk/wechatbynode/releases)

![node version](https://img.shields.io/badge/node-7.5.0-brightgreen.svg)
![npm version](https://img.shields.io/badge/npm-4.1.2-brightgreen.svg)
![express version](https://img.shields.io/badge/express-4.15.3-blue.svg)
![xml2js](https://img.shields.io/badge/xml2js-0.4.17-orange.svg)

# 项目结构
<pre>
.
├── README.md           
├── package.json               // 构建项目与工具包依赖
├── config.json               // 项目配置文件
├── app.js                   // 项目启动入口
├── wechat                 // 微信模块文件夹
│   ├── access_token.json // accessToken存储文件
│   ├── menus.json       // 菜单配置文件
│   ├── msg.js          // 消息模块
│   └── wechat.js      // 微信模块
</pre>

# 目标功能
- [x] 微信接入功能
- [x] access_token的获取、存储及更新
- [x] 自定义微信菜单
- [x] 消息被动回复
- [x] 消息加解密

# 构建项目
 1. 将项目 clone 到本地
    ```
    git clone git@github.com:SilenceHVK/wechatByNode.git
    ```

 2. 打开项目配置文件 config.json
 
    ![config.json](http://img.blog.csdn.net/20170609144432242?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    修改文件的 token、appID 以及 appScrect 配置参数。其中 token、appID 与 appScrect 两个参数位于 [微信公众平台](https://mp.weixin.qq.com/) 左侧菜单的基本配置中
    ![基本配置](http://img.blog.csdn.net/20170527134810969?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    ![开发这ID 与秘钥](http://img.blog.csdn.net/20170601095037229?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

 3. 进入 wechatByNode 文件并运行 app.js
    ```
    cd wechatByNode && node app.js  // Server runs at localhost:3000
    ```

 4. 将服务地址映射外网，或部署到服务器。这里我使用内网穿透演示。

    - 打开花生壳的软件，点击内网穿透
    ![内网穿透](http://img.blog.csdn.net/20170527132325667?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

     - 点击添加映射
    ![点击添加映射](http://img.blog.csdn.net/20170527132602551?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    - 配置映射
    ![配置映射](http://img.blog.csdn.net/20170527132805752?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
    由于微信只接受80端口。 映射类型必须选择80端口，内网主机就是部署Node.js项目的电脑 IP 地址

5. 接入认证

    ![接入认证](http://img.blog.csdn.net/20170527141026200?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    点击提交。提示提交成功，接入认证完成
    ![接入认证提交](http://img.blog.csdn.net/20170527141056778?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

6. 扫描微信二维码，关注公众号，就可以开始玩了

    ![微信公众号](http://img.blog.csdn.net/20170608184008076?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    ![微信自定义菜单](http://img.blog.csdn.net/20170606161743505?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    ![微信接收普通消息](http://img.blog.csdn.net/20170608183907918?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    ![微信接收普通消息](http://img.blog.csdn.net/20170608183936497?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    ![微信接收事件消息](http://img.blog.csdn.net/20170608160434723?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

