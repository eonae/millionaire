<template lang="pug">

.frame
  header.mainHeader
    .title Wanna be a millionaire?
    .mainBar
      nav.mainMenu
        button(type="button" id="play") Play
        button(type="button" id="contribute") Contribute
      #greetings
      
  .content-wrapper

  footer
    a(href="https://github.com/eonae/millionaire" target="_blank").
      copyright app by Eonae &#xa9
      
</template>

<style lang="scss">
  .mainHeader {
  @extend %container;
  width: 100%;
  padding: 0;
  @include flex(space-between, center);

  @media (max-width: $lg) {
    flex-direction: column;
    align-items: center;
  }

  .title {
    font-size: 60px;
    font-weight: 700;
    color: #222;

    @media (max-width: $medium) {
      font-size: 30px;
    }

    @media (max-width: 380px) {
      font-size: 25px;
    }
  }

  .mainBar {
    margin-top: 20px;
    @media (max-width: $medium) {
      width: 100%;
      margin: 0;
      @include flex(default, default, column-reverse);
    }
  }

  .mainMenu {
    @include flex(center, center);

    @media (max-width: $medium) {
      flex-direction: column;
    }
// Тут надо будет смотреть...
    button {
      @extend .game-btn;
      @include notLikeLink();
      color: #242412;
      @include font(25px, 700);
      padding: 6px 20px;
      border: 2px solid #242412;
      border-radius: 10px;

      @media (max-width: $medium) {
        display: block;
        width: 100%;
        margin-right: 0 !important;
        border: 0;
        border-top: 1px solid #242412;
        border-radius: 0;
        text-align: center;
      }
  
    }
    a:hover {
      color: black;
      border-color: black;
    }

    & > *:not(:last-child) {
      margin-right: 15px;
    }

    & > :last-child {
      @media(max-width: $medium) {
        border-bottom: 1px solid #242412;
      }
    }
  }
}
</style>


