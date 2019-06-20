import { Message } from 'element-ui'
const HUBNAME = 'chatRoomHub'; // 'chatRoomHub'由后台提供
const userId = 'xyp';
const signalrList = []
export default{
    signalrList
}
/*客户端调用服务器端方法*/
const sendMessage = {
    name: 'SendMessage',
    method: function (data) {
        console.log(data)
    }
}

/*服务器调用客户端方法*/
const get = {
    name: 'Get',
    method: function (data) {
        console.log(data)
    }
}


//服务器端的方法
const serverMethodSets = [sendMessage];
//客户端的方法
const clientMethodSets = [get]; //将需要注册的方法放进集合

// 建立连接
export function startConnection() {
    // console.log(process.env.HUB_API)
    // let hub = $.hubConnection(process.env.HUB_API)
    // let hub = $.hubConnection('http://47.92.121.151:8088/signalr/hubs') // 'http://47.92.121.151:8088/signalr/hubs'由后台提供
    let hub = $.hubConnection('http://192.168.1.8:8030/signalr/hubs') // 'http://47.92.121.151:8088/signalr/hubs'由后台提供
    // let hub = $.hubConnection('http://localhost:61544/signalr/hubs') // 本地
    
    let proxy = createHubProxy(hub) //需要先注册方法再连接
    proxy.on('getRoomlist', function (roomname) {
        console.log(roomname);
    });
    proxy.on('getRoomeChattingRecords', function (data) {
        console.log(data);
    });
    proxy.on('sendMessage', function (result,message) { // 前后端互通消息时触发
        // console.log(roomname+'消息：'+message);
        console.log(result)
        const time = result.time.split(' ')[1]
        console.log(time)
        signalrList.push({name:result.name,time:time,message:result.message,room:result.room})
        console.log(signalrList)
    });
    proxy.on('onDisconnected', function (roomname) {
        // console.log(roomname);
    });
    // 监听服务端重新建立连接时触发
    proxy.on('onReconnected', function (roomname) {
        // console.log(roomname);
    });
    hub.start().done((connection) => { // 通过连接发送任何数据之前引发。
        console.log('Now connected, connection ID=' + connection.id)
        sessionStorage.setItem('roomname', connection.id)
    }).fail(() => {
        Message('连接失败' + error);
        console.log('Could not connect');
    })
    hub.error(function (error) { //
        Message('SignalR error: ' + error);
        console.log('SignalR error: ' + error)
    })
    hub.reconnecting(() => { // 基础传输开始重新连接时引发。
        console.log('reconnecting')
    })
    hub.reconnected(() => { // 当基础传输已重新连接时引发。
        console.log('reconnected')
    })
    hub.received((data) => { // 在连接上接收到任何数据时引发。 提供接收到的数据。
        console.log('received')
        console.log(data)
    })
    hub.connectionSlow(function () { // 当客户端检测到慢速或频繁删除连接时引发。
        console.log('We are currently experiencing difficulties with the connection.')
    });
    hub.disconnected(function () { // 当连接已断开连接时引发。
        console.log('disconnected')
        closeConnection(hub)
    });
    return proxy
}
// 手动创建proxy
export function createHubProxy(hub) {
    sessionStorage.setItem('userId',userId)
    hub.qs = {'userId':userId};
    let proxy = hub.createHubProxy(HUBNAME)
    // 注册客户端方法
    clientMethodSets.map((item) => {
        proxy.on(item.name, item.method)
    })
    return proxy
} 
// 客户端主动关闭连接
export function closeConnection(hub) {
    hub.stop()
    return proxy
}