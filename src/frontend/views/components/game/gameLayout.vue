<template lang="pug">

.frame
  header.gameHeader
    .controls
      #player
      #hints
    #menu
  .content-wrapper
    #question
    #ladder
  footer
    a(href="https://github.com/eonae/millionaire" target="_blank").
      copyright app by Eonae &#xa9

</template>



<style lang="scss">
  .gameHeader {
    @include flex(space-between, center);
    width: 100%;

    & button {
      @extend .game-btn;
      line-height: 1em;

      @media (max-width: $small) {
        font-size: 13px;
      }
    }

    @media (max-width: $medium) {
      align-items: initial;
    }
  }

  .controls {
    @include flex(default, center);

    @media (max-width: $medium) {
      flex-direction: column;
      width: 78%;
    }

    @media (max-width: $small) {
      box-sizing: border-box;
      width: 75%;
    }
    & button {
      margin-left: 10px;
    }
  }
</style>
