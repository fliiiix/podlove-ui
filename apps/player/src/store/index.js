import Vue from 'vue/dist/vue.esm'
import sagas from '@podlove/player-sagas'
import { runtimeSaga } from '@podlove/player-sagas/runtime'
import { lifeCycleSaga } from '@podlove/player-sagas/lifecycle'
import { playerSaga } from '@podlove/player-sagas/player'
import { componentsSaga } from '@podlove/player-sagas/components'
import { chaptersSaga } from '@podlove/player-sagas/chapters'
import { quantilesSaga } from '@podlove/player-sagas/quantiles'
import { versionSaga } from '@podlove/player-sagas/version'
import { transcriptsSaga } from '@podlove/player-sagas/transcripts'
import { stepperSaga } from '@podlove/player-sagas/stepper'
import { errorSaga } from '@podlove/player-sagas/error'
import { keyboardSaga } from '@podlove/player-sagas/keyboard'
import { playlistSaga } from '@podlove/player-sagas/playlist'

import { createStore, applyMiddleware, compose } from 'redux'
import { connect } from 'redux-vuex'
import { version } from '../../package'

import reducers from './reducers'
import actions from './actions'
import selectors from './selectors'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagas.middleware)))

connect({ Vue, store, actions })

// Connect Sagas
sagas.run(
  lifeCycleSaga,
  runtimeSaga,
  componentsSaga({
    selectPlaylist: selectors.playlist.list,
    selectChapters: selectors.chapters.list,
    selectTranscripts: selectors.transcripts.hasTranscripts,
    selectFiles: selectors.files.audio,
    selectEpisodeCover: selectors.episode.poster,
    selectEpisodeTitle: selectors.episode.title,
    selectEpisodeSubtitle: selectors.episode.subtitle,
    selectShowTitle: selectors.show.title,
    selectShowCover: selectors.show.poster,
    selectRuntimeMode: selectors.mode
  }),
  quantilesSaga,
  chaptersSaga({
    selectDuration: selectors.duration,
    selectPlaytime: selectors.playtime,
    selectCurrentChapter: selectors.chapters.current,
    selectChapterList: selectors.chapters.list
  }),
  playerSaga({
    selectMedia: selectors.media,
    selectPlaytime: selectors.playtime,
    selectPoster: selectors.driver.image,
    selectTitle: selectors.driver.title
  }),
  versionSaga({ version }),
  transcriptsSaga({
    selectChapters: selectors.chapters.list,
    selectSpeakers: selectors.contributors,
    selectPlaytime: selectors.playtime
  }),
  stepperSaga({
    selectDuration: selectors.duration,
    selectPlaytime: selectors.playtime
  }),
  errorSaga,
  keyboardSaga({
    selectDuration: selectors.duration,
    selectPlaytime: selectors.playtime,
    selectPlaystate: selectors.driver.playing,
    selectRate: selectors.audio.rate,
    selectVolume: selectors.audio.volume,
    selectMuted: selectors.audio.muted
  }),
  playlistSaga({
    selectEpisodeConfig: selectors.playlist.config,
    selectPlaystate: selectors.driver.playing,
    selectVolume: selectors.audio.volume,
    selectRate: selectors.audio.rate,
    selectMuted: selectors.audio.muted,
    selectPlaylist: selectors.playlist.list
  })
)

export default store
