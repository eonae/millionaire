<template lang="pug">

.ladder
  each st, index in ladder
    if (index < stage)
      if (st.isFixed)
        .done-immune= st.prize
      else
        .done= st.prize
    else
      if (st.isFixed)
        .immune= st.prize
      else
        .general= st.prize
        
</template>

<style lang="scss">
  .ladder {
  @include flex(space-between, stretch, column-reverse);
  width: 20%;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: $medium) {
    // width: 
  }
  
  @media (max-width: $small) {
    width: 23%;
  }

  & > div {
    font-size: 2.5vh;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    border-radius: 15px;
    padding: 1vh 2vw;
    border: 1px solid #222;

    @media (max-width: $medium) {
      font-size: 2vh;
    }
  }
  & .done-immune {
    background: darkgreen;
    @include font(14px, 700, #fff);
  }
  & .done {
    background: green;
    @include font(14px, 700, #fff);
  }
  & .immune {
    background: yellow;
  }
}
</style>
