<template lang="pug">
  chapter-button(v-if="chapterButtons" type="next" :disabled="nextChapterDisabled" :color="color" @click="dispatch" data-test="chapter-next")
</template>

<script>
import { mapState } from 'redux-vuex'
import store from 'store'

import select from 'store/selectors'
import { PlayButton, ChapterButton, StepperButton } from '@podlove/components'

export default {
  components: {
    PlayButton,
    ChapterButton,
    StepperButton
  },
  data: mapState({
    nextChapterDisabled: select.components.nextChapterDisabled,
    chapterButtons: select.components.chapterButtons,
    color: select.theme.brandDark
  }),
  methods: {
    dispatch: store.dispatch
  }
}
</script>
