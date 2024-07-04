<template>
  <nav>
    <ul>
      <li class="animated-menu-item" style="animation-delay: 1s;"><a href="#rsvp">Опрос</a></li>
      <li class="animated-menu-item" style="animation-delay: 1.5s;"><a href="#info">Информация</a></li>
      <li class="animated-menu-item" style="animation-delay: 2s;"><a href="#contacts">Контакты</a></li>
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

/* Анимация для пунктов меню */
.animated-menu-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 2s ease forwards;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
