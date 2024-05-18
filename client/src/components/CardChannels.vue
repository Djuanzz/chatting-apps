<script>
import { ref } from "vue";

export default {
  name: "ChannelCard",
  data() {
    return {
      channels: ref([]),
      dataMember: ref([
        {
          id: ref(""),
          user: ref(""),
        },
      ]),
      userId: ref(""),
      username: ref(""),
      message: ref(""),
      username: ref(""),
    };
  },
  methods: {
    async getChannels() {
      try {
        const req = await fetch("http://localhost:5000/api/channels", {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await req.json();
        this.channels = data.docs;
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

        if (req.ok) this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
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
        this.userId = data.user.id;
        this.username = data.user.username;
        console.log(this.userId);
        console.log(this.username);
        if (data.user == null) this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },

    async joinChannel(channelId) {
      await this.getSpecificChannel(channelId);
      this.dataMember.push({
        id: this.userId,
        user: this.username,
      });
      try {
        const req = await fetch(
          `http://localhost:5000/api/channels/${channelId}`,
          {
            credentials: "include",
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              member: this.dataMember.map((member) => member.id),
            }),
          }
        );
        const data = await req.json();
        console.log(data);
        if (req.ok) window.location.reload(true);
      } catch (err) {
        console.log(err);
      }
    },

    async leaveChannel(channelId) {
      await this.getSpecificChannel(channelId);
      let newDataMember = this.dataMember.filter((e) => e.id !== this.userId);
      this.dataMember = newDataMember;

      try {
        const req = await fetch(
          `http://localhost:5000/api/channels/${channelId}`,
          {
            credentials: "include",
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              member: this.dataMember.map((member) => member.id),
            }),
          }
        );
        const data = await req.json();
        console.log(data);
        if (req.ok) window.location.reload(true);
      } catch (err) {
        console.log(err);
      }
    },
  },

  mounted() {
    this.getChannels();
    this.itsme();
  },
};
</script>

<template>
  <div
    class="absolute right-0 left-0 top-14 flex justify-center items-center flex-col">
    <div
      class="card m-3 flex items-center justify-center h-12 max-w-xs bg-success">
      <div class="card-body">
        <div class="btn p-0 bg-success">
          <a href="/create-channel">
            <div class="flex justify-center items-center text-xl">
              <h1>Tambahkan Channel</h1>
              <i class="fa-solid fa-circle-plus text-xl ms-3"></i>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-center">
      <!-- LIST CHANNEL -->
      <div v-for="channel in channels" :key="channel.id" class="card m-3">
        <div class="card-body p-3">
          <h2 class="card-header">{{ channel.name }}</h2>
          <p class="text-content2 h-12 overflow-hidden">
            {{ channel.description }}
          </p>
          <div class="flex justify-end">
            <div class="card-footer">
              <span
                class="badge badge-outline-primary mr-2 cursor-pointer w-16 flex justify-center items-center">
                <a :href="'/channels/' + channel.id">Message</a>
              </span>

              <span
                v-if="
                  channel.member &&
                  channel.member.some((member) => member.id === userId)
                "
                @click="leaveChannel(channel.id)"
                class="badge badge-outline-error cursor-pointer w-14 flex justify-center items-center"
                >Leave</span
              >
              <span
                v-else
                @click="joinChannel(channel.id)"
                class="badge badge-outline-success cursor-pointer w-14 flex justify-center items-center"
                >Join</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
