<template lang="pug">

.hints
  button(type="button" id="hint-0") 50/50
  button(type="button" id="hint-1") Disabled
  button(type="button" id="hint-2") Disabled
  
</template>

<style lang="scss">
  .hints {
    @include flex(default, default);

    @media (max-width: $medium) {
      margin-top: 1vh;
      width: 100%;
      justify-content: space-between;
    }
    
    &> button {
      @media (max-width: $medium) {
        margin: 0;
        width: 32%;
        padding: 5px;
      }
    }
  }
</style>


