<template lang="pug">

.player
  div Player:
  div #{player}
  
</template>


<style lang="scss">
  .player {
    @include flex(center, center, column);
    border: 2px solid #222;
    padding: 5px 15px;
    border-radius: 10px;
    max-width: 230px;

    @media (max-width: $medium) {
      max-width: unset;
      width: 100%;
      box-sizing: border-box;
      flex-direction: row;
    }

    &>div:first-child {
      @include font(15px, 400);
      text-align: center;
      margin-bottom: 5px;

      @media (max-width: $medium) {
        margin: 0 3% 0 0;
      }

      @media (max-width: 380px) {
        display: none;
      }
    }
    &>div:last-child {
      @include font(20px, 700, palevioletred);

      @media (max-width: $small) {
        font-size: 16px;
      }
    }
  }
</style>