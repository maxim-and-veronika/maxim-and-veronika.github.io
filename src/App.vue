<template>
  <div v-motion-fade-visible-once :delay="200" :duration="1500" id="app">
    <header class="header">
      <navbar/>
    </header>
    <main class="main">
      <img class="main-picture" alt="Вы приглашены на свадьбу!" src="./assets/main.webp">
      <info-block v-motion-slide-visible-once-bottom :delay="2200" :duration="1500"/>
      <div v-motion-slide-visible-once-bottom :delay="200" :duration="1200" class="countdown" v-if="!isWeddingStarted">
        До начала торжества:
        <div class="countdown-numbers">
          {{ days }} {{ pluralize(days, 'День', 'Дня', 'Дней') }}
          {{ hours }} {{ pluralize(hours, 'Час', 'Часа', 'Часов') }}
          {{ minutes }} {{ pluralize(minutes, 'Минута', 'Минуты', 'Минут') }}
          {{ seconds }} {{ pluralize(seconds, 'Секунда', 'Секунды', 'Секунд') }}
        </div>
      </div>
      <div class="countdown" v-else>
        <h1> Свадьба уже началась!</h1>
      </div>
      <r-s-v-p-form v-if="!isSuccess" v-motion-slide-visible-once-bottom :delay="200" :duration="1200" class="rsvp-form"
                    id="rsvp"/>
      <div v-motion-slide-visible-once-bottom :delay="200" :duration="1200" class="dress-code">
        <div class="dress-code-inner">
          <div>Мы очень ждем и с удовольствием готовимся к нашему незабываемому дню!</div>
          <div>Поддержите нас улыбками и объятиями, а также красивыми нарядами на ваш выбор</div>
        </div>
      </div>
      <div v-motion-slide-visible-once-bottom :delay="200" :duration="1200" id="info" class="location">
        <h2 class="links"><a :href="zagsMapLink" target="_blank">ЗАГС</a> находится по адресу Фурштатская ул., 52,
          Санкт-Петербург. Начало церемонии в 14:30</h2>
        <h2 class="links"><a :href="restaurantMapLink" target="_blank">Ресторан</a> находится по адресу Потёмкинская
          ул., 4А, Санкт-Петербург. Начало фуршета в 15:40</h2>
        Между ЗАГСом и рестораном - 5 минут спокойным шагом. Можно войти как со стороны улицы, так и через отдельный
        вход прямо из Таврического сада
      </div>
      <div class="gifts">
        <div v-motion-slide-visible-once-top:delay="200" :duration="1400" v-show="!showBestGift">
          <h2> Уже мечтаете попасть к нам на свадьбу? </h2>
          <button @click="showBestGift = true">Да!</button>
        </div>
        <div v-motion-slide-visible-once-bottom :delay="200" :duration="500" v-show="showBestGift">
          <h2> А мы мечтаем о своей квартире! </h2>
          <img class="main-picture" alt="Мы копим на квартиру!" src="./assets/box1.jpg">
          <h2> Ваш вклад в данную мечту станет для нас лучшим подарком</h2>
        </div>
      </div>
      <div class="contacts" id="contacts">
        <h2> Если вы потерялись, хотите что-то сообщить или просто соскучились - пожалуйста, воспользуйтесь этими
          контактами</h2>
        <div class="contacts-inner">
          <a href='tel:+79110061647'>Позвонить</a> или <a href='https://t.me/gmnls'>написать</a> Максиму
        </div>
        <div class="contacts-inner veronika">
          <a href='tel:+79119071174'>Позвонить</a> или <a href='https://t.me/pmnik'>написать</a> Веронике
        </div>
      </div>
    </main>
  </div>
  <modal @closed="isModalSuccessShown = false" :show-modal="isModalSuccessShown"/>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import RSVPForm from "@/components/RSVPForm.vue";
import InfoBlock from "@/components/InfoBlock.vue";
import {onMounted, onUnmounted, ref, watch} from 'vue';
import Modal from "@/components/Modal.vue";

const isModalSuccessShown = ref(false)
const isSuccess = ref(false)
const showBestGift = ref(false)

const weddingDate = new Date('2024-09-22T15:00:00');
const isWeddingStarted = ref(false)

const zagsMapLink = `https://maps.app.goo.gl/14p5cqLKjmENp19i7`;
const restaurantMapLink = `https://maps.app.goo.gl/NxRauFofVrwYdhUu9`;

let timerId = null;
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

onMounted(() => {
  timerId = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(timerId);
});

function pluralize(number, one, few, many) {
  let lastDigit = number % 10;
  let lastTwoDigits = number % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return one;
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return few;
  } else {
    return many;
  }
}

function updateCountdown() {
  const now = new Date();
  const timeLeft = weddingDate - now;

  days.value = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes.value = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (timeLeft <= 0) {
    isWeddingStarted.value = true;
    clearInterval(timerId);
  }
}

watch(window.location.hash, () => {
  if (window.location.hash === '#success') {
    isModalSuccessShown.value = true
    isSuccess.value = true
  }
}, {
  immediate: true
})

</script>

<style>
@font-face {
  font-family: Zhizn;
  src: url('./assets/fonts/ofont.ru_Zhizn.ttf');
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 45px;
}

body {
  font-family: Zhizn, serif;
  color: rgb(122, 84, 49);
  background-color: #fff;
  line-height: 22px;
  text-align: center;
}

h2 {
  margin-bottom: 12px;
}

.main {
  max-width: 100%;
  padding: 0 20%;;

  @media screen and (max-width: 1024px) {
    padding: 0 10%
  }

  @media screen and (max-width: 660px) {
    padding: 0;
  }
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

.countdown-numbers {
  font-size: 17px;
  white-space: nowrap;
}

.dress-code {
  padding: 20px;
  margin-top: 20px;
  font-size: 18px;
  line-height: 28px;
  background-color: #fcfae3;
  border-radius: 20px;
}

.dress-code-inner {
  display: flex;
  flex-flow: column;
  gap: 30px;
  background-color: white;
  border-radius: 30px;
  padding: 20px;
}

.location {
  padding: 20px;
  margin-top: 20px;
  background-color: #fdfaf0;
  border-radius: 20px;
}

.links {
  background-color: white;
  border-radius: 30px;
  padding: 20px;
}

.gifts {
  padding: 20px;
  margin-top: 20px;
  background-color: #f0f8ff;
  border-radius: 20px;

}

button {
  display: block;
  margin: 0 auto auto;
  background-color: #333;
  color: #fff;
  border: none;
  padding: 0.5em 1em;
  border-radius: 8px;
}

a {
  color: #333;
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

.contacts-inner {
  display: flex;
  flex-flow: row;
  justify-content: center;
  gap: 7px;
  background-color: #f5faff;
  padding: 5px;
  border-radius: 11px;
  width: fit-content;
  align-self: center;
}

.veronika {
  margin-top: 5px;
  background-color: #fff8dc
}

.header {
  position: sticky;
  z-index: 2;
  top: 0;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.main-picture {
  width: 100%;
  height: auto;
  object-fit: cover;

  @media screen and (max-width: 660px) {
    height: 104vw;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 2.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

input[type="checkbox"] {
  accent-color: #f9cd47;
}

</style>
