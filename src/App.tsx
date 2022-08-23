import React, { ReactElement } from 'react'
import { Home } from '@routes/Home'
import { Tutorial } from '@routes/Tutorial'
import { Route, Routes } from 'react-router-dom'

function App (): ReactElement {
  // TODO: Handle incorrect route.
  // TODO: What is outlet? when to use it?
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-row"></div>
      <div className="flex-grow flex-row">
        <div className="m-10">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="tutorial" element={<Tutorial/>}>
              <Route path=":stage" element={<Tutorial/>}/>
            </Route>
          </Routes>
        </div>
      </div>
      <div className="flex justify-center bg-cyan-900 text-white">
        <div className="my-10">
          By Chris Vilches

          <a href="https://github.com/ChrisVilches/Wobbly-Matrix" target="_blank" rel="noreferrer">
            <svg className="h-10 w-10 my-4 text-white mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
