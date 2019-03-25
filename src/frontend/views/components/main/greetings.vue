<template lang="pug">

.greetings Hello, 
  span #{player}
  
</template>

<style lang="scss">
    .greetings {
    margin-top: 10px;
    text-align: center;
    > span {
      color: palevioletred;
    }

    @media (max-width: $medium) {
      margin-bottom: 15px;
    }
  }
</style>
