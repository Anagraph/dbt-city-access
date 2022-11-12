<template>
  <div class="login">
    <div class="login-panel">
      <div class="login-panel-bar"></div>
      <slot name="login-logo">
        <img class="login-panel-logo" src="./anagraph_dark.png" />
      </slot>
      <form class="login-container-form" @submit.prevent="login">
        <div class="login-panel-input">
          <input
            v-model="email"
            type="email"
            placeholder="Utilisateur"
            autocomplete="email"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            autocomplete="password"
          />
        </div>
        <button type="submit">CONNEXION</button>
      </form>
    </div>
  </div>
</template>

<script>
import { watch } from 'vue'
import { user, google, useLogin } from './firebase-auth'
import router from '@/router'

export default {
  props: {
    loginReturnUrl: { type: String, default: '/' }
  },
  setup(props) {
    watch(
      () => user.value,
      newUser => {
        if (newUser) {
          router.push(props.loginReturnUrl)
        }
      }
    )
    return {
      ...useLogin(),
      google
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background-color: #f4f4f4;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  &-panel {
    background-color: white;
    height: 333px;
    width: 400px;
    &-bar {
      height: 6px;
      background-color: black;
      border-radius: 2px;
    }
    &-logo {
      width: 300px;
      padding: 40px 0px 20px 0px;
    }
    &-input {
      margin-bottom: 20px;

      input {
        height: 50px;
        width: 300px;
        border: solid 1px #e1e1e1;
        border-radius: 2px;
        font-size: 14px;
        letter-spacing: 0.35px;
        padding: 15px;
        color: #666666;
        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
  }
}

button {
  background-color: black;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  width: 150px;
  height: 50px;
  border-radius: 2px;
  cursor: pointer;
}
.logos {
  display: flex;
  justify-content: space-between;
  width: 400px;
  padding: 0 40px;
}
.anagraph-logo {
  margin: 20px;
  width: 120px;
}
.k2-logo {
  margin: 20px;
  width: 50px;
}
</style>
