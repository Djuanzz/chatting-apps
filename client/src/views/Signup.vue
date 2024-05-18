<script>
import { ref } from "vue";

export default {
  name: "Signup",
  data() {
    return {
      username: ref(""),
      email: ref(""),
      password: ref(""),
      confirmPassword: ref(""),
    };
  },
  methods: {
    async signup() {
      try {
        if (this.password !== this.confirmPassword) {
          console.log("Passwords do not match");
          return;
        }

        const req = await fetch("http://127.0.0.1:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
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
  <div class="flex my-auto min-h-screen items-center">
    <div class="container">
      <form action="" v-on:submit.prevent="signup">
        <div class="mx-auto flex w-full max-w-sm flex-col gap-6">
          <div class="flex flex-col items-center">
            <h1 class="text-3xl font-semibold">Sign Up</h1>
          </div>
          <div class="form-group">
            <div class="form-field">
              <label class="form-label">Username</label>
              <input
                placeholder="Type here"
                type="text"
                class="input max-w-full"
                v-model="username" />
            </div>

            <div class="form-field">
              <label class="form-label">Email address</label>

              <input
                placeholder="Type here"
                type="email"
                class="input max-w-full"
                v-model="email" />
            </div>

            <div class="form-field">
              <label class="form-label">Password</label>
              <div class="form-control">
                <input
                  placeholder="Type here"
                  type="password"
                  class="input max-w-full"
                  v-model="password" />
              </div>
            </div>

            <div class="form-field">
              <label class="form-label">Confirm Password</label>
              <div class="form-control">
                <input
                  placeholder="Type here"
                  type="password"
                  class="input max-w-full"
                  v-model="confirmPassword" />
              </div>
            </div>

            <div class="form-field pt-5">
              <div class="form-control justify-between">
                <button type="submit" class="btn btn-primary w-full">
                  Sign up
                </button>
              </div>
            </div>

            <div class="form-field">
              <div class="form-control justify-center">
                <a
                  class="link link-underline-hover link-primary text-sm"
                  href="/signin"
                  >Have an account? Sign in.</a
                >
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
