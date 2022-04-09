import { ReactNode, ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {
  render as rtlRender,
  RenderOptions,
  RenderResult
} from '@testing-library/react'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import userReducer from '../redux/userSlice'
import { RootState } from '../redux/store'

interface ReduxRenderOptions {
  preloadedState?: RootState
  store?: EnhancedStore
  renderOptions?: Omit<RenderOptions, 'wrapper'>
}

export function render(
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: { user: userReducer }, preloadedState }),
    ...renderOptions
  }: ReduxRenderOptions = {}
): RenderResult {
  function Wrapper({ children }: { children: ReactNode }): ReactElement {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
