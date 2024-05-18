<script>
import { ref } from "vue";
export default {
  name: "Channels",
  data() {
    return {
      channelNow: ref({
        id: ref(""),
        name: ref(""),
      }),
      dataMember: ref([
        {
          id: ref(""),
          user: ref(""),
        },
      ]),
      userNow: ref({
        id: ref(""),
        username: ref(""),
      }),
      message: ref(""),
      dataMessage: ref([]),
    };
  },
  methods: {
    formatMembers(members) {
      return (
        members.map((member) => member.user).join(", ") ||
        "-- Channel Member --"
      );
    },

    async itsme() {
      try {
        const req = await fetch("http://localhost:5000/api/users/me", {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await req.json();
        this.userNow = {
          id: data.user.id,
          username: data.user.username,
        };
        console.log(this.userNow);
        if (data.user == null) this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },

    async getSpecificChannel(channelId) {
      try {
        const req = await fetch(
          `http://localhost:5000/api/channels/${channelId}`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await req.json();
        this.channelNow = {
          id: data.id,
          name: data.name,
        };
        this.dataMember = [];
        data.member.forEach((e) => {
          this.dataMember.push({
            id: e.id,
            user: e.username,
          });
        });
        console.log(this.channelNow);

        // if (req.ok) this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },

    async sendMessage() {
      try {
        const req = await fetch(`http://localhost:5000/api/messages`, {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner: this.userNow.id,
            channel: this.$route.params.id,
            content: this.message,
          }),
        });
        const data = await req.json();
        console.log(data);
        if (req.ok) window.location.reload(true);
      } catch (err) {
        console.log(err);
      }
    },

    async getMessages(channelId) {
      try {
        const req = await fetch(`http://localhost:5000/api/messages`, {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await req.json();
        // console.log(data);
        this.dataMessage = [];
        data.docs.forEach((e) => {
          console.log(e.owner.id);
          if (e.channel.id === channelId) {
            this.dataMessage.push({
              id: e.id,
              senderId: e.owner.id,
              senderName: e.owner.username,
              message: e.content,
            });
          }
        });
        this.dataMessage.reverse();
        // console.log(this.dataMessage);
        // if (req.ok) this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.itsme();
    this.getSpecificChannel(this.$route.params.id);
    this.getMessages(this.$route.params.id);
  },
};
</script>

<template>
  <div class="flex w-full h-screen">
    <div class="m-3 ms-0 flex w-full flex-col h-auto">
      <!-- CHANNEL NAME -->
      <div
        class="bg-gray-300 dark:bg-gray-400 rounded p-3 sticky m-3 mt-0 flex justify-between items-center">
        <div class="">
          <h1 class="font-bold text-black">
            {{ channelNow.name || "Channel Name" }}
          </h1>
          <h2 class="inline text-black" v-if="dataMember.length > 0">
            {{ formatMembers(dataMember) }}
          </h2>
          <h2 v-else>No members available</h2>
        </div>
        <div class="">
          <a href="/">
            <i class="fa-regular fa-circle-xmark text-3xl text-black"></i>
          </a>
        </div>
      </div>
      <!-- DISPLAY -->
      <div
        class="overflow-y-auto h-full breadcrumbs max-w-full flex flex-col m-3 p-3 mt-0 bg-gray-300 dark:bg-gray-400 rounded">
        <!-- CHATTING -->
        <div class="" v-for="msg in dataMessage" :key="msg.id">
          <div class="flex justify-end" v-if="msg.senderId === userNow.id">
            <div class="card">
              <div class="card-body p-3 py-2">
                <!-- SENDER -->
                <div class="font-bold">
                  <h1>{{ msg.senderName }}</h1>
                </div>
                <!-- MESSAGE -->
                <div class="">
                  <h1>{{ msg.message }}</h1>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-start" v-else>
            <div class="card">
              <div class="card-body p-3 py-2">
                <!-- SENDER -->
                <div class="font-bold">
                  <h1>{{ msg.senderName }}</h1>
                </div>
                <!-- MESSAGE -->
                <div class="">
                  <h1>{{ msg.message }}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FORM MESSAGE -->
      <form class="space-y-4 m-3 mt-1" v-on:submit.prevent="sendMessage()">
        <div class="flex">
          <div class="w-full">
            <label class="sr-only" for="message">Message</label>
            <input
              class="input input-solid max-w-full"
              placeholder="Type a message"
              type="text"
              id="message"
              v-model="message" />
          </div>
          <div class="w-auto ml-3">
            <button type="submit" class="rounded-lg btn btn-primary btn-block">
              <i class="fa-regular fa-circle-right"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
