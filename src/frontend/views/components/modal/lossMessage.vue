<template lang="pug">

p
  strong Wrong!
p Correct answer was 
  strong #{letter}: #{option}
p You prize is 
  span.prize #{prize}
p Would you play once more?

</template>

<style lang="scss">
  .prize {
    @include font(22px, 700, palevioletred);
  }
</style>
