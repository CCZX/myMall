<template>
  <div class="client-chat-cmp">
    <header class="cmp-header">
      <span>Mall聊天室（{{onlineUserCount}}）</span>
    </header>
    <main>
      <ul class="msg-list">
        <li v-for="(item, index) in msgList" :key="index" class="msg-item">
          <template v-if="item.type === 'USER'">
            <p class="header">
              <span class="name">
                {{item.user.name}}
                <span v-if="item.user.socketId === mySocketId">(我)</span>
              </span>
              <span class="time">{{item.time}}</span>
            </p>
            <p class="data">{{item.data}}</p>
          </template>
          <template v-if="item.type === 'SYSTEM'">
            <p class="sys-data">{{item.data}}</p>
          </template>
        </li>
      </ul>
    </main>
    <footer>
      <input class="inp" type="text" v-model="value">
      <button class="btn" @click="send">发送</button>
    </footer>
  </div>
</template>

<script>
import { getLocalItem } from './../../util/util'
export default {
  props: ["mySocketId"],
  data() {
    return {
      // mySocketId: '',
      value: '',
      msgList: [],
      onlineUserCount: 0
    }
  },
  sockets: {
    connect(id) {
      //与socket.io连接后回调
      console.log("socket connected 123123", this.$socket.id);
      this.mySocketId = this.$socket.id
    },
    receiveMsg(data) {
      console.log('接收到消息', data)
      if (data.type === 'SYSTEM') {
        this.onlineUserCount = data.count
      }
      this.msgList = [...this.msgList, data]
    }
  },
  methods: {
    send() {
      if (!this.mySocketId) {
        return alert('WebSocket未连接刷新试试')
      }
      if (!this.value) {
        return alert('内容为空！')
      }
      const userName = getLocalItem('clientName')
      this.$socket.emit('sendMessage', {
        type: 'USER',
        data: this.value,
        time: new Date().toLocaleString(),
        user: {
          socketId: this.mySocketId,
          name: userName
        }
      })
      this.value = ''
    }
  },
  mounted() {
    const userName = getLocalItem('clientName')
    userName && this.$socket.emit('go', userName)
  },
}
</script>

<style>
.client-chat-cmp {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
  box-shadow: 0 5px 12px 0 rgba(0,0,0,0.1);
  background-color: #fff;
}
.cmp-header {
  background-color: #0084ff;
  padding: 10px;
  text-align: center;
}
main {
  padding: 0 5px;
  flex: 1;
  overflow-x: hidden;
}
.msg-item {
  margin-top: 5px;
}
.msg-list .msg-item .header {
  font-size: 12px;
}
.msg-list .msg-item .header .name {
  font-size: 15px;
  color: steelblue;
}
.msg-list .msg-item .header .time {
  font-size: 10px;
  color: #999;
}
.msg-list .msg-item .data {
  margin-top: 10px;
}
.sys-data {
  text-align: center;
  color: #175199;
  font-size: 12px;
}
footer {
  display: flex;
  padding: 5px 10px;
  border-top: 1px #f2f2f2 solid;
}
footer .inp {
  box-sizing: border-box;
  margin: 0;
  margin-right: 5px;
  padding: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: rgba(0,0,0,.65);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all .3s;
}
footer .btn {
  line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,.015);
    box-shadow: 0 2px 0 rgba(0,0,0,.015);
    cursor: pointer;
    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    height: 32px;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 2px;
    color: rgba(0,0,0,.65);
    background-color: #fff;
    border-color: #d9d9d9;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgba(0,0,0,.12);
  -webkit-box-shadow: 0 2px 0 rgba(0,0,0,.045);
  box-shadow: 0 2px 0 rgba(0,0,0,.045);
}

</style>
