import { ref } from 'vue'

const TYPING_SPEED = 95

const randomPlaceholder = [
    'Герасимов Александр Николаевич',
    'Герасимов Николай Николаевич',
    'Герасимов Юрий Николаевич',
    'Герасимов Юлия Геннадьевна',
    'Герасимова Валентина Михайловна',
    'Герасимова Юлия Николаевна',
    'Герасимова Мария Сергеевна',
    'Герасимова Людмила Владимировна',
    'Орлянская Ирина Витальевна',
    'Орлянский Александр Андреевич',
    'Орлянская Диана Александровна',
    'Орлянская Дарья Романовна',
    'Орлянский Роман Андреевич',
    'Бондарь Валерий Евгеньевич',
    'Толстова Мирослава Андреевна',
    'Раюк Павел Евгеньевич',
    'Раюк Владислав Евгеньевич',
    'Ершов Юрий Андреевич',
    'Белянин Артём Сергеевич',
    'Балабанова Анастасия Юрьевна',
    'Полубелова Ольга Витальевна',
    'Полубелов Игорь Александрович',
    'Полубелов Роман Игоревич',
    'Полубелова Алина Игоревна',
    'Худяков Евгений Валентинович',
    'Худякова Татьяна Ивановна',
    'Глущенко Юрий Михайлович',
    'Глущенко Мария Ивановна',
    'Плюснина Наталья Витальевна',
]

const typingTimer = ref(null)

const isTypingTimerEnable = ref(false)

const currentTypingWordValue = ref('')

const wordForPrint = ref('')

function getRandomPlaceholder() {
    const placeholderIndex = Math.floor(Math.random() * randomPlaceholder.length)

    return randomPlaceholder[placeholderIndex]
}

function stopAutoTyping() {
    currentTypingWordValue.value = ''
    isTypingTimerEnable.value = false
    clearInterval(typingTimer.value)
}

let letterNumber = 0
function startAutoTyping() {
    currentTypingWordValue.value = ''
    wordForPrint.value = getRandomPlaceholder()
    letterNumber = 0
    if (isTypingTimerEnable.value) {
        return
    }
    isTypingTimerEnable.value = true
    typingTimer.value = setInterval(() => {
        currentTypingWordValue.value += wordForPrint.value[letterNumber]
        letterNumber += 1
        if (currentTypingWordValue.value.length > wordForPrint.value.length) {
            startAutoTyping()
        }
    }, TYPING_SPEED)
}

export function useSearchInput() {
    return {
        startAutoTyping,
        stopAutoTyping,
        currentTypingWordValue,
    }
}
