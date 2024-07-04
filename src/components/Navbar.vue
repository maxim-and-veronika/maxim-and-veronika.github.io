<template>
  <nav>
    <ul>
      <li v-motion-slide-visible-once-top :delay="500" :duration="1500"><a href="#rsvp">Опрос</a></li>
      <li v-motion-slide-visible-once-top :delay="1000" :duration="1500"><a href="#info">Информация</a></li>
      <li v-motion-slide-visible-once-top :delay="1500" :duration="1500"><a href="#contacts">Контакты</a></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: #fff;
  padding: 10px;
  text-align: center;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin: 0 1em;
}

nav ul li a {
  color: #333;
  text-decoration: none;
}
</style>
