<template lang="pug">

.ladder
  each stage, index in ladder
    if (index < currentPosition)
      if (stage.isFixed)
        .done-immune= stage.prize
      else
        .done= stage.prize
    else
      if (stage.isFixed)
        .immune= stage.prize
      else
        .general= stage.prize
        
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
  }
  & .done {
    background: green;
  }
  & .immune {
    background: yellow;
  }
}
</style>
