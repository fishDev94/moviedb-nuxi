<template>
  <section class="nf-user">
    <div class="nf-user__card" v-if="isLoggedIn">
      <div class="nf-user__avatar"></div>
      <p class="nf-user__name">{{ userName }}</p>
    </div>
    <div class="nf-user__status" v-if="isLoggedIn">
        <nuxt-link to="/user/123">Account</nuxt-link>
        <nuxt-link to="/?logout=true" @click="logOut">Log out</nuxt-link>
    </div>
    <div v-else class="nf-user__status">
        <nuxt-link to="#">Log in</nuxt-link>
        <nuxt-link to="/?logout=true" >Register</nuxt-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
const userName = ref<string>("UserName");
const userCookie = useCookie('user');

if (userCookie.value) {
    userName.value = userCookie.value
}

const isLoggedIn = ref<boolean>(!!userCookie.value)

const logOut = () => {
    console.log("isLoggedIn.value");
    isLoggedIn.value = false;
    console.log(isLoggedIn.value);
}

</script>

<style lang="scss" scoped>
.nf-user {
  width: max-content;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;

  &__card {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__avatar {
    width: 32px;
    height: 32px;
    background-color: rgb(var(--primary));
  }

  &__status {
    display: flex;
    flex-direction:column;
    gap: 8px;
    justify-content: center;

    a {
        cursor: pointer;
        transition: color 0.15s linear;
    }

    a:hover {
        color: rgb(var(--neutral), 0.5)
    }
  }
}
</style>
