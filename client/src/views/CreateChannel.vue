<script>
import { ref } from "vue";

export default {
  name: "Channel",
  data() {
    return {
      name: ref(""),
      description: ref(""),
    };
  },
  methods: {
    async createChannel() {
      try {
        const req = await fetch("http://localhost:5000/api/channels", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            description: this.description,
            member: "",
          }),
        });
        const data = await req.json();
        console.log(data);
        if (req.ok) this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<template>
  <div class="gap-6 flex min-h-screen justify-center items-center">
    <div class="mx-auto w-full max-w-2xl">
      <section class="bg-gray-2 rounded-xl">
        <div class="p-8 shadow-lg">
          <form class="space-y-4" v-on:submit.prevent="createChannel">
            <div class="w-full">
              <label class="sr-only" for="name">Channel Name</label>
              <input
                class="input input-solid max-w-full"
                placeholder="Channel Name"
                type="text"
                id="name"
                v-model="name" />
            </div>

            <div class="w-full">
              <label class="sr-only" for="description">Description</label>

              <textarea
                class="textarea textarea-solid max-w-full"
                placeholder="Description"
                rows="8"
                id="description"
                v-model="description"></textarea>
            </div>

            <div class="mt-4">
              <button
                type="submit"
                class="rounded-lg btn btn-primary btn-block">
                Create Channel
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
