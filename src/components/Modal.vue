<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">x</span>
      <h1>{{ successMessage }}</h1>
      <img class="modal-image" src="../assets/cat.webp" alt="Здесь была картинка кота" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  showModal: Boolean,
  required: true,
})
const emit = defineEmits(['closed'])
const successMessage = ref('Ваша форма отправлена!');

const closeModal = () => {
  emit('closed')
};

</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-image {
  width: 50%;
  height: auto;

  @media screen and (max-width: 660px) {
    width: 100%;
  }
}

.modal-content {
  border-radius: 50px;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close-button {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-button:hover,
.close-button:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
