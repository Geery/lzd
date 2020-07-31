<template>
  <div class="app-container">
    <div v-highlight>
      <h3>网络分层</h3>

      <pre>
        <code class="javascript">
        //传统分层结构 七层
          7、应用层
          6、表示层
          5、会话层
          4、传输层
          3、网络层
          2、数据链路层
          1、物理层
        //代码世界里的分层
          【应用层、表示层、会话层】 ---应用层
          包含：TELNET,SSH,HTTP.SMTP,POP,SSL/TLS,FTP,MIME,HTML,SNMP,,IB,SIP,RTP....

          【传输层】 ---传输层
          包含：TCP,UDP,UDP-Lite,SCTP,DDCP

          【网络层】 ---网络层
          包括：ARP,IPv4,IPv6,ICMP,IPsec

          【数据链路层、物理层】 
         包括： 以太网，无线LAN，PPP...(双绞线电缆，无线，光纤....)
        </code>
      </pre>

      <div class="block">
        <h3>TCP协议</h3>
        <div class="tip">
          <p></p>
        </div>
        <pre>
        <code class="javascript">
        </code>
        </pre>
        <!-- <div class="warning">
        <p></p>
        </div>-->
        <!-- 使用指令 -->
        <pre>
        <code class="javascript">
        //即时的im聊天室
        const net =require('net')
        const chatServer = net.createServer()
        const clientList =[];
        chatServer.on('connection',client=>{
        client.write('Hi!\n')
        clientList.push(client)
        client.on('data',data=>{
        console.log('received：'+data.toString())
        // 广播
        clientList.forEach(v=>{
        v.write(data)
        })
        })
        })
        chatServer.listen(9000)
        </code>
      </pre>
      </div>
      <div class="block">
        <h3>HTTP</h3>
        <div class="tip margin-b-20">
          <p>1、是Hyper Text Transfer Protocol（超文本传输协议）的缩写,是用于从万维网（WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议</p>
          <p>2、HTTP默认端口号为80，但是你也可以改为8080或者其他端口</p>
          <p>
            HTTP是无连接：
            <a>无连接的含义是限制每次连接只处理一个请求</a>。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
          </p>
          <p>HTTP是媒体独立的：这意味着，只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过HTTP发送。客户端以及服务器指定使用适合的MIME-type内容类型（MIME Type 是该资源的媒体类型，MIME Type 不是个人指定的，是经过互联网（IETF）组织协商）</p>
          <p>
            HTTP是无状态：HTTP协议是无状态协议。
            <a>无状态是指协议对于事务处理没有记忆能力</a>。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快
          </p>
          <p>明文传输，传输数据时，所有传输的内容都是明文，客户端和服务器端都无法验证对方的身份，这在一定程度上无法保证数据的安全性</p>
        </div>
        <div class="warning">
          <p>针对http的问题我们会引入雪碧图、将小图内联、使用多个域名等等的方式来提高性能</p>
        </div>
        <pre>
        <code class="javascript">
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>跨域--跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对JavaScript实施的安全限制</h3>
        <div class="tip margin-b-20">
          <p>同源是指，域名、协议、端口均为相同</p>
          <p></p>
        </div>
        <pre>
        <code class="javascript">
          //Jsonp 解决方式 --JavaScript设计模式中的一种代理模式，在html页面中通过相应的标签从不同域名下加载静态资源文件是被浏览器允许的
          //最大的缺陷是，只能够实现get请求
          let script = document.createElement('script');
          script.src = 'http://www.xiaoshutang.cn/login?username=jerryLiu&callback=callback';
          document.body.appendChild(script);
          function callback(res) {
            console.log(res);
          }

          //跨域资源共享 CORS --允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制,所有浏览器都支持该功能,IE浏览器不能低于IE10,E8/9需要使用XDomainRequest对象来支持CORS
          // 请求分为简单请求和不简单请求
          // 简单请求的表现形式
          1、请求方式为HEAD、POST 或者 GET
          2、http头信息不超出以下字段：Accept、Accept-Language 、 Content-Language、 Last-Event-ID、 Content-Type(限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain)
        </code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>
