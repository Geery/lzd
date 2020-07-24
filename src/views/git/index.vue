<template>
  <div class="app-container">
    <div v-highlight>
      <h3>Git - 生成 SSH 公钥</h3>
      <div class="tip">
        <p>输入ssh-keygen -o,然后它会要求你输入两次密钥口令。 如果你不想在使用密钥时输入口令，将其留空即可。 然而，如果你使用了密码，那么请确保添加了 -o 选项，它会以比默认格式更能抗暴力破解的格式保存私钥</p>
      </div>
      <pre>
        <code class="javascript">
          $ ssh-keygen -o
          
            Generating public/private rsa key pair.
            Enter file in which to save the key (/c/Users/issuser/.ssh/id_rsa):
            Created directory '/c/Users/issuser/.ssh'.
            Enter passphrase (empty for no passphrase):
            Enter same passphrase again:
            Your identification has been saved in /c/Users/issuser/.ssh/id_rsa.
            Your public key has been saved in /c/Users/issuser/.ssh/id_rsa.pub.
            The key fingerprint is:
            SHA256:QQTXC659OWgEtPp3t2H/tTXoj4zavrWmshGmmnm+PRE issuser@ISS
            The key's randomart image is:
            +---[RSA 3072]----+
            |     .oo+.       |
            |      .+. .      |
            |      .o.. .     |
            |     .  oE.      |
            |    .  +S+..     |
            |     .. *.=   .  |
            |      .o.oo.+o .o|
            |      +o.+oo==o =|
            |     +oo.+**==o+.|
            +----[SHA256]-----+

        </code>
      </pre>
      <h3>查看公钥</h3>
      <div class="tip">
        <p>在桌面右键打开git bash 输入命令cat ~/.ssh/id_rsa.pub</p>
      </div>
      <pre>
        <code class="javascript">
          $ cat ~/.ssh/id_rsa.pub

          ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDLw9K/B3ZMLD
          Ui8D9SBFicMwmwZR7XHzm+qyIJbJy9Y69aYzqsAKXqsYe0vYPEeb7np1PLKmKeWwMHk3
          ZbKCUYmbNQ+A3+Y8DcUc0MbQOu4C6YCCc181ucoaB39v9Dw1hCqnwyKdkeRhGsUjrEc0
          GnvEYSOofqlrImF4sVCUGW/P/kLxxQxa3HC+x+lO1xygd1qMs5ThkiZ/FXJ4Sd7b/r3kdmSyBkF
          U0vvsylhY1+zEF/yEGa1jjtZRBToHDvV3hpnUB6RK7Lpjmo5RyVCLuGEoIFVjD0JuEIMB9z59g7nwVEE
          dGJRfWPKDIOBKgBqWReZ6ms/tmM6fgovYMGGiPy+SXos7gsTAvhiMJM1xuQjXYxh6V6p4gDJgxZ7X9EYM1
          vmtlHfHkxLA5Hf/ZXdFT1eqmW67F52sws4fhh9GBKI1TqJ83WGpZ2SlnaFR1pPq0V
          TpA3a88HrzmtRkJGX8uKrcUv5Rdl1r1K1fykgAEk7HpxBzI13O+KcGi3ZwL5NQU= issuser@ISS
        </code>
      </pre>
      <!-- <div class="warning">
        <p></p>
      </div>-->
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
