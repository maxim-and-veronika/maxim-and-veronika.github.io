<template>
  <nav>
    <ul>
      <li><a href="#info">Информация</a></li>
      <li><a href="#rsvp">Опрос</a></li>
      <li><a href="#contacts">Контакты</a></li>
    </ul>
  </nav>
</template>

<script setup>
// No data or methods needed for this component
</script>

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
