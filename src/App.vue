<template>
  <div id="app" >
<!--    <flower-rain />-->
    <header class="header" :class="{ 'header__visible': true }">
      <navbar/>
    </header>
    <main class="main snap-container">
      <img class="main-picture snap-element" alt="Вы приглашены на свадьбу!" src="./assets/main.webp">
      <info-block class="snap-element" id="info" />

      <div class="countdown">
        До начала торжества:
        <div id="countdown"></div>
      </div>

      <div class="snap-element dress-code">   Блок про отсутствие дресс-кода
        Блок про отсутствие дресс-кода
        Блок про отсутствие дресс-кода
        Блок про отсутствие дресс-кода
        Блок про отсутствие дресс-кода</div>
      <r-s-v-p-form class="snap-element rsvp-form" id="rsvp"/>
      <div class="snap-element location"> Блок что и где будет происходить + ссылки на карту</div>
      <div class="gifts"> Не надо слов, не надо паники, и можно без цветов
      </div>

      <img class="main-picture" alt="Мы копим на квартиру!" src="./assets/box1.jpg">
      <div class="contacts" id="contacts">
        <a href='tel:+79110061647'>Жених: +79110061647</a>
        <a href='tel:+79119071174'>Невеста: +79119071174</a>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import RSVPForm from "@/components/RSVPForm.vue";
import InfoBlock from "@/components/InfoBlock.vue";
import FlowerRain from "@/components/FlowerRain.vue";
import {onMounted, onUnmounted, ref} from 'vue';

const weddingDate = new Date('2024-09-22T15:00:00');
const updateCountdown= () => {
  const now = new Date();
  const timeLeft = weddingDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById('countdown').innerHTML = `
      ${days} Дней ${hours} часов ${minutes} минут ${seconds} секунд
    `;

  if (timeLeft <= 0) {
    document.getElementById('countdown').innerHTML = 'SHOW MUST GO ON!';
  }
}
// Update the countdown every second
setInterval(updateCountdown, 1000);
</script>

<style>
@font-face {
  font-family: Zhizn;
  src: url('./assets/fonts/ofont.ru_Zhizn.ttf');
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 45px
}
/*.snap-container {
  scroll-snap-type: y proximity;
  overflow-y: scroll;
  max-height: calc(100vh - 45px);
}
.snap-element {
  scroll-snap-align: start;
}*/

body {
  font-family: Zhizn;
  color: rgb(122, 84, 49);
}

.main {
  max-width: 100%;
  background-color: #ffffff;
  padding: 0 20%;
;

  @media screen and (max-width: 1024px) {
    padding: 0 10%
  }

  @media screen and (max-width: 660px) {
    padding: 0;
  }
}
.fancy-text {
  line-height: 1em;
  letter-spacing: 0;
  text-align: center;
}
.basic-text {
  line-height: 1em;
  letter-spacing: 0;
  text-align: center;
}
.countdown {
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  justify-content: center;
  background-color: #EED3BE;
  border-radius: 20px;
}
.dress-code {
  padding: 20px;
  margin-top: 20px;
  background-color: #F3EFD7;
  border-radius: 20px;
}
.location {
  padding: 20px;
  margin-top: 20px;
  background-color: #fdfaf0;
  border-radius: 20px;
}
.gifts {
  padding: 20px;
  margin: 20px 0;
  background-color: #f6f9e9;
  border-radius: 20px;
}
.rsvp-form {
  padding: 20px;
  margin-top: 20px;
  border-radius: 20px;
}
.contacts {
  display: flex;
  flex-flow: column;
  padding: 20px;
  margin-top: 20px;
  border-radius: 20px;
}
.header {
  position: sticky;
  top: 0;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

.main-picture {
  width: 100%;
  height: auto;
  object-fit: cover;

  @media screen and (max-width: 660px) {
    height: 104vw;
  }
}

</style>
