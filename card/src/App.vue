<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

const currentCardBackground = ref(Math.floor(Math.random() * 25 + 1))
const cardName = ref('')
const cardNumber = ref('')
const cardMonth = ref('')
const cardYear = ref('')
const cardCvv = ref('')
const minCardYear = ref(new Date().getFullYear().toString())
const amexCardMask = ref('#### ###### #####')
const otherCardMask = ref('#### #### #### ####')
const cardNumberTemp = ref('')
const isCardFlipped = ref(false)
const focusElementStyle = ref({})
const isInputFocused = ref(false)

const focusElement = ref(null)
const cardDate = ref(null)

const getCardType = computed(() => {
  const number = cardNumber.value
  let re = new RegExp('^4')
  if (number.match(re) != null) return 'visa'

  re = new RegExp('^(34|37)')
  if (number.match(re) != null) return 'amex'

  re = new RegExp('^5[1-5]')
  if (number.match(re) != null) return 'mastercard'

  re = new RegExp('^6011')
  if (number.match(re) != null) return 'discover'

  return 'visa' // default type
})

const generateCardNumberMask = computed(() =>
  getCardType.value === 'amex' ? amexCardMask.value : otherCardMask.value,
)

const minCardMonth = computed(() =>
  cardYear.value === minCardYear.value ? new Date().getMonth() + 1 : 1,
)

const focusInput = ($event: FocusEvent) => {
  console.log($event)
  isInputFocused.value = true
  const targetRef = ($event.target as HTMLElement).dataset.ref
  const target = ref(targetRef) as unknown as HTMLElement
  focusElementStyle.value = {
    width: `${target.offsetWidth}px`,
    height: `${target.offsetHeight}px`,
    transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
  }
}

onMounted(() => {
  cardNumberTemp.value = cardNumber.value
  document.getElementById('cardNumber')?.focus()
})

watch(cardYear, () => {
  if (parseInt(cardMonth.value, 10) < minCardMonth.value) {
    cardMonth.value = ''
  }
})

const flipCard = (status: boolean) => {
  isCardFlipped.value = status
}

const blurInput = () => {
  setTimeout(() => {
    if (!isInputFocused.value) {
      focusElementStyle.value = {}
    }
  }, 300)
  isInputFocused.value = false
}
</script>

<style scoped>
.unchecked {
  font-weight: bold;
}
</style>

<template>
  <div>
    <p class="">currentCardBackground: {{ currentCardBackground }}</p>
    <p class="unchecked">cardName (object): {{ cardName }}</p>
    <p class="unchecked">cardNumber (object / long string): {{ cardNumber }}</p>
    <p class="">cardMonth: {{ cardMonth }}</p>
    <p class="unchecked">cardYear (broken): {{ cardYear }}</p>
    <p class="unchecked">cardCvv (accepts char): {{ cardCvv }}</p>
    <p class="">minCardYear: {{ minCardYear }}</p>
    <p class="">amexCardMask: {{ amexCardMask }}</p>
    <p class="">otherCardMask: {{ otherCardMask }}</p>
    <p class="unchecked">cardNumberTemp (object): {{ cardNumberTemp }}</p>
    <p class="">isCardFlipped: {{ isCardFlipped }}</p>
    <p class="unchecked">focusElementStyle (doesnt do shit): {{ focusElementStyle }}</p>
    <p class="">isInputFocused: {{ isInputFocused }}</p>
  </div>

  <div class="card-form">
    <div class="card-list">
      <div class="card-item" v-bind:class="{ '-active': isCardFlipped }">
        <div class="card-item__side -front">
          <div
            class="card-item__focus"
            v-bind:class="{ '-active': focusElementStyle }"
            v-bind:style="focusElementStyle"
            ref="focusElement"
          ></div>
          <div class="card-item__cover">
            <img
              v-bind:src="
                'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                currentCardBackground +
                '.jpeg'
              "
              class="card-item__bg"
            />
          </div>

          <div class="card-item__wrapper">
            <div class="card-item__top">
              <img
                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                class="card-item__chip"
              />
              <div class="card-item__type">
                <transition name="slide-fade-up">
                  <img
                    v-bind:src="
                      'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                      getCardType +
                      '.png'
                    "
                    v-if="getCardType"
                    v-bind:key="getCardType"
                    alt=""
                    class="card-item__typeImg"
                  />
                </transition>
              </div>
            </div>
            <label for="cardNumber" class="card-item__number" ref="cardNumber">
              <template v-if="getCardType === 'amex'">
                <span v-for="(n, $index) in amexCardMask" :key="$index">
                  <transition name="slide-fade-up">
                    <div
                      class="card-item__numberItem"
                      v-if="
                        $index > 4 && $index < 14 && cardNumber.length > $index && n.trim() !== ''
                      "
                    >
                      *
                    </div>
                    <div
                      class="card-item__numberItem"
                      :class="{ '-active': n.trim() === '' }"
                      :key="$index"
                      v-else-if="cardNumber.length > $index"
                    >
                      {{ cardNumber[$index] }}
                    </div>
                    <div
                      class="card-item__numberItem"
                      :class="{ '-active': n.trim() === '' }"
                      v-else
                      :key="$index + 1"
                    >
                      {{ n }}
                    </div>
                  </transition>
                </span>
              </template>

              <template v-else>
                <span v-for="(n, $index) in otherCardMask" :key="$index">
                  <transition name="slide-fade-up">
                    <div
                      class="card-item__numberItem"
                      v-if="
                        $index > 4 && $index < 15 && cardNumber.length > $index && n.trim() !== ''
                      "
                    >
                      *
                    </div>
                    <div
                      class="card-item__numberItem"
                      :class="{ '-active': n.trim() === '' }"
                      :key="$index"
                      v-else-if="cardNumber.length > $index"
                    >
                      {{ cardNumber[$index] }}
                    </div>
                    <div
                      class="card-item__numberItem"
                      :class="{ '-active': n.trim() === '' }"
                      v-else
                      :key="$index + 1"
                    >
                      {{ n }}
                    </div>
                  </transition>
                </span>
              </template>
            </label>
            <div class="card-item__content">
              <label for="cardName" class="card-item__info" ref="cardName">
                <div class="card-item__holder">Titular Do Cartão</div>
                <transition name="slide-fade-up">
                  <div class="card-item__name" v-if="cardName.length" key="1">
                    <transition-group name="slide-fade-right">
                      <span
                        class="card-item__nameItem"
                        v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')"
                        v-if="$index === $index"
                        v-bind:key="$index + 1"
                        >{{ n }}</span
                      >
                    </transition-group>
                  </div>
                  <div class="card-item__name" v-else key="2">Nome Completo</div>
                </transition>
              </label>
              <div class="card-item__date" ref="cardDate">
                <label for="cardMonth" class="card-item__dateTitle">Validade</label>
                <label for="cardMonth" class="card-item__dateItem">
                  <transition name="slide-fade-up">
                    <span v-if="cardMonth" v-bind:key="cardMonth">{{ cardMonth }}</span>
                    <span v-else key="2">MM</span>
                  </transition>
                </label>
                /
                <label for="cardYear" class="card-item__dateItem">
                  <transition name="slide-fade-up">
                    <span v-if="cardYear" v-bind:key="cardYear">{{
                      String(cardYear).slice(2, 4)
                    }}</span>
                    <span v-else key="2">YY</span>
                  </transition>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="card-item__side -back">
          <div class="card-item__cover">
            <img
              v-bind:src="
                'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                currentCardBackground +
                '.jpeg'
              "
              class="card-item__bg"
            />
          </div>
          <div class="card-item__band"></div>
          <div class="card-item__cvv">
            <div class="card-item__cvvTitle">CVV</div>
            <div class="card-item__cvvBand">
              <span v-for="(n, $index) in cardCvv" :key="$index"> * </span>
            </div>
            <div class="card-item__type">
              <img
                v-bind:src="
                  'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                  getCardType +
                  '.png'
                "
                v-if="getCardType"
                class="card-item__typeImg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-form__inner">
      <div class="card-input">
        <label for="cardNumber" class="card-input__label"></label>Numero do Cartão
        <input
          type="text"
          id="cardNumber"
          class="card-input__input"
          v-mask="generateCardNumberMask"
          v-model="cardNumber"
          v-on:focus="focusInput"
          v-on:blur="blurInput"
          data-ref="cardNumber"
          autocomplete="off"
        />
      </div>
      <div class="card-input">
        <label for="cardName" class="card-input__label">Nome Impresso no Cartão</label>
        <input
          type="text"
          id="cardName"
          class="card-input__input"
          v-model="cardName"
          v-on:focus="focusInput"
          v-on:blur="blurInput"
          data-ref="cardName"
          autocomplete="off"
        />
      </div>
      <div class="card-form__row">
        <div class="card-form__col">
          <div class="card-form__group">
            <label for="cardMonth" class="card-input__label">Data de Validade</label>
            <select
              class="card-input__input -select"
              id="cardMonth"
              v-model="cardMonth"
              v-on:focus="focusInput"
              v-on:blur="blurInput"
              data-ref="cardDate"
            >
              <option value="" disabled selected>Mês</option>
              <option
                v-bind:value="n < 10 ? '0' + n : n"
                v-for="n in 12"
                v-bind:disabled="n < minCardMonth"
                v-bind:key="n"
              >
                {{ n < 10 ? '0' + n : n }}
              </option>
            </select>
            <select
              class="card-input__input -select"
              id="cardYear"
              v-model="cardYear"
              v-on:focus="focusInput"
              v-on:blur="blurInput"
              data-ref="cardDate"
            >
              <option value="" disabled selected>Ano</option>
              <option v-bind:value="$index + minCardYear" v-for="(n, $index) in 12" v-bind:key="n">
                {{ $index + minCardYear }}
              </option>
            </select>
          </div>
        </div>
        <div class="card-form__col -cvv">
          <div class="card-input">
            <label for="cardCvv" class="card-input__label">CVV</label>
            <input
              type="text"
              class="card-input__input"
              id="cardCvv"
              v-mask="'####'"
              maxlength="4"
              v-model="cardCvv"
              v-on:focus="flipCard(true)"
              v-on:blur="flipCard(false)"
              autocomplete="off"
            />
          </div>
        </div>
      </div>

      <button class="card-form__button">Validar</button>
    </div>
  </div>
</template>
