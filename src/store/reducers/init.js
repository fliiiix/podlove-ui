import get from 'lodash/get'

const subtitle = (state = '', action) => {
  switch (action.type) {
    case 'INIT':
      return action.payload.subtitle || state
    default:
      return state
  }
}

const mode = (state = 'native', action) => {
  switch (action.type) {
    case 'INIT':
      return action.payload.mode || state
    default:
      return state
  }
}

const poster = (state = '', action) => {
  switch (action.type) {
    case 'INIT':
      return action.payload.poster || action.payload.show.poster || state
    default:
      return state
  }
}

const title = (state = '', action) => {
  switch (action.type) {
    case 'INIT':
      return action.payload.title || state
    default:
      return state
  }
}

const reference = (state = {}, action) => {
  switch (action.type) {
    case 'INIT':
      return Object.assign({}, {
        config: get(action.payload, ['reference', 'config'], null),
        share: get(action.payload, ['reference', 'share'], null)
      })
    default:
      return state
  }
}

export {
  poster,
  subtitle,
  title,
  reference,
  mode
}