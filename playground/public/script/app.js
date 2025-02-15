const vm = Vue.createApp({
  data() {
    return {
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      url: 'https://decito.blogspot.com',
      raw_url:
        '<a href="https://github.com/dnet-o/vue-playground" target="_blank">Repository</a>',
      age: 20,
      isPurple: false,
      selectedColor: '',
      size: 150,
      mode: 1,
      birds: ['Pigeons', 'Eagles', 'Doves', 'Parrots'],
      people: [
        { name: 'John', age: 20 },
        { name: 'Rick', age: 18 },
        { name: 'Amy', age: 33 },
      ],
      people23: [
        {
          name: 'John',
          message: 'Hello world!',
        },
        {
          name: 'Rick',
          message: 'I like pie.',
        },
        {
          name: 'Amy',
          message: 'Skydiving is fun!',
        },
      ],
    }
  },
  methods: {
    increment() {
      this.age++
    },
    updateMiddleName(event) {
      this.middleName = event.target.value
    },
    updateLastName(msg, event) {
      console.log(msg)
      this.lastName = event.target.value
    },
    move() {
      const first = this.people23.shift()

      this.people23.push(first)
    },
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.middleName} ${this.lastName}`
    },
    circle_classes() {
      return {
        purple: this.isPurple,
      }
    },
  },
  watch: {
    age(newVal, oldVal) {
      setTimeout(() => {
        this.age = 20
      }, 3000)
    },
  },
}).mount('#app')
