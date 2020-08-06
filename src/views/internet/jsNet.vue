<template>
  <div class="app-container">
    <div v-highlight>
      <div class="block">
        <h3>CPU</h3>
        <div class="tip margin-b-20">
          <p>1、计算机核心就是CPU.负责处理所有的计算任务，CPU好比一个工厂,电脑只要开机，那么24小时就会在运转</p>
          <p>2、进程就好比车间,工厂里面可以有好多车间。也就会多进程</p>
        </div>
      </div>
      <div class="block">
        <h3>进程和线程</h3>
        <div class="tip margin-b-20">
          <p>1、进程是cpu<a>资源分配</a>的最小单位（能独立拥有资源和独立运行的最少单位） 大白话：运行了一个进程就是：电脑会分配内存和cup算力 每个程序都是一个进程  </p>
          <p>2、线程是cpu<a>调度</a>的最小单位（线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程）</p>
          <p>3、不同的进程也是可以通信的，但是代价很大 </p>
          <p>4、一个进程下可以有多个线程,如果只有一个线程那就叫做单线程</p>
          <P>5、同一进程下的各个线程之间共享程序的内存空间（包括代码段、数据集、堆等</P>
        </div>
      </div>
        <div class="block">
        <h3>多进程优势  缺点：内存等资源消耗也会更大，有点空间换时间的意思</h3>
        <div class="tip margin-b-20">
          <p>1、避免单个page crash影响整个浏览器 </p>
          <p>2、避免第三方插件crash影响整个浏览器</p>
          <p>3、多进程充分利用多核优势 </p>
          <p>4、方便使用沙盒模型隔离插件等进程，提高浏览器稳定性</p>
          <P>5、简单点理解：如果浏览器是单进程，那么某个Tab页崩溃了，就影响了整个浏览器，体验有多差；同理如果是单进程，插件崩溃了也会影响整个浏览器；而且多进程还有其它的诸多优势。</P>
        </div>
      </div>
      <div class="block">
        <h3>浏览器是多进程的</h3>
        <div class="tip ">
          <p>1、浏览器打开多个tag页,windows控制管理器可以看到多个进程，也就是说每个tab实际上就是一个独立的进程</p>
        </div>
        <pre>
        <code class="javascript">
          浏览器包含了哪些进程以及对应的功能

          1、主进程
            1.1、 协调控制其他子进程（创建、销毁）
            1.2、 浏览器界面显示，用户交互，前进、后退、收藏
            1.3、 将渲染进程得到的内存中的Bitmap，绘制到用户界面上
            1.4、 处理不可见操作，网络请求，文件访问等

          2、第三方插件进程
            2.1、每种类型的插件对应一个进程，仅当使用该插件时才创建

          3、GPU进程
            3.1、用于3D绘制等

          4、渲染进程（也就是常说的浏览器内核）
            4.1、负责页面渲染，脚本执行，事件处理等
            4.2、每个tab页一个渲染进程
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>浏览器关心的渲染进程（浏览器内核）</h3>
        <div class="tip ">
          <p>1、渲染进程包含多线程</p>
        </div>
        <pre>
        <code class="javascript">
          1、GUI渲染线程
            1.1、 负责渲染页面，解析HTML，CSS，构建DOM树和RenderObject树,布局和绘制
            1.2、 页面需要重绘和回流时，该线程就会执行
            1.3、 GUI渲染线程与js引擎线程互斥，防止渲染结果不可预期
            (当JS引擎执行时GUI线程会被挂起（相当于被冻结了），GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执)

          2、js引擎线程
            2.0、也称为JS内核，负责处理Javascript脚本程序。（例如V8引擎）
            2.1、负责处理解析和执行JavaScript脚本程序
            2.2、只有一个js引擎线程（单线程）（一个Tab页（renderer进程）中无论什么时候都只有一个JS线程在运行JS程序）
            2.3、与GUI渲染线程互斥，防止渲染结果不可预期

          3、事件触发线程
            3.1、用来控制事件循环（鼠标点击、setTimeout、ajax等），会将对应任务添加到事件线程中
            3.2、当事件满足触发条件时，将事件放入到js引擎所在的执行队列中的队尾
            3.3、注意，由于JS的单线程关系，所以这些待处理队列中的事件都得排队等待JS引擎处理（当JS引擎空闲时才会去执行

          4、定时触发器线程
            4.1、setInterval与setTimeout所在的线程
            4.2、定时任务并不是由js引擎计时的，是由定时触发线程来计时的
            4.3、计时完毕后，通知事件触发线程
            
          5、异步http请求线程
            5.1、浏览器有一个单独的线程用于处理AJAX请求（在XMLHttpRequest在连接后是通过浏览器新开一个线程请求）
            5.2、请求完成时，若有回调函数，通知事件触发线程
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>为什么 JavaScript 是单线程的?</h3>
        <pre>
        <code class="javascript">
          1、首先历史原因，在创建 JavaScript 这门语言时，多进程多线程的架构并不流行，硬件支持并不好
          1.1、多线程的复杂性,多线程操作需要加锁，编码的复杂性会增高
          1.2、如果同时操作 DOM ,在多线程不加锁的情况下，最终会导致 DOM 渲染的结果不可预期
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>为什么 GUI渲染线程 与 JS引擎线程 互斥?</h3>
        <pre>
        <code class="javascript">
          1、由于 JS 是可以操作 DOM 的，如果同时修改元素属性并同时渲染界面(即 JS线程和UI线程同时运行)，那么渲染线程前后获得的元素就可能不一致了
          1.1、为了防止渲染出现不可预期的结果，浏览器设定 GUI渲染线程和JS引擎线程为互斥关系
          1.2、当JS引擎线程执行时GUI渲染线程会被挂起，GUI更新则会被保存在一个队列中等待JS引擎线程空闲时立即被执行
        </code>
        </pre>
      </div>   
      <div class="block">
        <h3>Event Loop 看 JS 的运行机制</h3>
            <div class="tip margin-b-20">
            <p>JS引擎线程只执行执行栈中的事件
                执行栈中的代码执行完毕，就会读取事件队列中的事件
                事件队列中的回调事件，是由各自线程插入到事件队列中的
                如此循环</p>
            </div>

        <pre>
        <code class="javascript">
          1、JS 分为同步任务和异步任务
          2、同步任务都在JS引擎线程上执行，形成一个执行栈
          3、事件触发线程管理一个任务队列，异步任务触发条件达成，将回调事件放到任务队列中
          4、执行栈中所有同步任务执行完毕，此时JS引擎线程空闲，系统会读取任务队列，将可运行的异步任务回调事件添加到执行栈中，开始执行
          5、同步任务-> 执行栈 遇到异步任务->异步线程推入到事件队列中  当执行栈为空的时候，读取事件队列

          6、执行setTimeout/setInterval （本身是同步任务，而其中的回调函数才是异步任务）
            6.1、当代码执行到setTimeout/setInterval时，实际上是JS引擎线程通知定时触发器线程
            6.2、间隔一个时间后，会触发一个回调事件， 而定时触发器线程在接收到这个消息后
            6.3、会在等待的时间后，将回调事件放入到由事件触发线程所管理的事件队列中

          7、XHR/fetch（本身是同步任务，而其中的回调函数才是异步任务）
            7.1、JS引擎线程通知异步http请求线程，发送一个网络请求，并制定请求完成后的回调事件
            7.2、异步http请求线程在接收到这个消息后，会在请求成功后，将回调事件放入到由事件触发线程所管理的事件队列中
          
          8、我们的同步任务执行完，JS引擎线程会询问事件触发线程，在事件队列中是否有待执行的回调函数，如果有就会加入到执行栈中交给JS引擎线程执行


        let timerCallback = function() {
            console.log('wait one second');
        };
        let httpCallback = function() {
            console.log('get server data success');
        }

        // 同步任务
        console.log('hello');
        // 同步任务
        // 通知定时器线程 1s 后将 timerCallback 交由事件触发线程处理
        // 1s 后事件触发线程将 timerCallback 加入到事件队列中
        setTimeout(timerCallback,1000);
        // 同步任务
        // 通知异步http请求线程发送网络请求，请求成功后将 httpCallback 交由事件触发线程处理
        // 请求成功后事件触发线程将 httpCallback 加入到事件队列中
        $.get('www.xxxx.com',httpCallback);
        // 同步任务
        console.log('world');
        //...
        // 所有同步任务执行完后
        // 询问事件触发线程在事件事件队列中是否有需要执行的回调函数
        // 如果没有，一直询问，直到有为止
        // 如果有，将回调事件加入执行栈中，开始执行回调代码
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>宏任务</h3>
        <div class="tip margin-b-20">
        <p>将每次执行栈执行的代码当做是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）， 每一个宏任务会从头到尾执行完毕，不会执行其他</p>
        <p>JS引擎线程和GUI渲染线程是互斥的关系，浏览器为了能够使宏任务和DOM任务有序的进行，会在一个宏任务执行结果后，在下一个宏任务执行前，GUI渲染线程开始工作，对页面进行渲染</p>
        <p>宏任务-->渲染-->宏任务-->渲染-->渲染...</p>
        <p>主代码块，setTimeout，setInterval等，都属于宏任务</p>
       </div>
        <pre>
        <code class="javascript">
        document.body.style = 'background:black';
        document.body.style = 'background:red';
        document.body.style = 'background:blue';
        document.body.style = 'background:grey';
        1、页面背景会在瞬间变成灰色，以上代码属于同一次宏任务，
        2、所以全部执行完才触发页面渲染，渲染时GUI线程会将所有UI改动优化合并，所以视觉效果上，只会看到页面变成灰色

        document.body.style = 'background:blue';
        setTimeout(function(){
            document.body.style = 'background:black'
        },0)
        1、页面先显示成蓝色背景，然后瞬间变成了黑色背景，这是因为以上代码属于两次宏任务，
        2、第一次宏任务执行的代码是将背景变成蓝色，然后触发渲染，将页面变成蓝色，再触发第二次宏任务将背景变成黑色
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>微任务</h3>
        <div class="tip margin-b-20">
        <p>我们已经知道宏任务结束后，会执行渲染，然后执行下一个宏任务， 而微任务可以理解成在当前宏任务执行后立即执行的任务。也就是说，当宏任务执行完，会在渲染前，将执行期间所产生的所有微任务都执行完</p>
        <p>Promise，process.nextTick等，属于微任务</p>
        <p>
            执行一个宏任务（栈中没有就从事件队列中获取）   </p>
            <p> 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中   </p>
             <p>宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）   </p>
             <p>当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染   </p>
             <p>渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取
        </p>
       </div>
        <pre>
        <code class="javascript">
        setTimeout(() => {
            console.log(1)
            Promise.resolve(3).then(data => console.log(data))
        }, 0)

        setTimeout(() => {
            console.log(2)
        }, 0)

        // print : 1 3 2

        1、上面代码共包含两个 setTimeout ，也就是说除主代码块外，共有两个宏任务， 
        2、其中第一个宏任务执行中，输出 1 ，并且创建了微任务队列，
        3、所以在下一个宏任务队列执行前， 先执行微任务，在微任务执行中，输出 3 ，微任务执行后，执行下一次宏任务，执行中输出 2
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
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
