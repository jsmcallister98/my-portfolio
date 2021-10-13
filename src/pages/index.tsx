import React, { useState, useEffect, Fragment } from 'react'
import Head from 'next/head'
import {sharedTransition } from 'src/components/General';
import { GolfScene, GolfSceneSVG, } from 'src/components/Golf/GolfScene'
import Golfer from 'src/components/Golf/Golfer';
import {Tree, Trees} from 'src/components/Golf/Trees';
import {Wave, WaveSVG} from 'src/components/Wave'

export type iTheme = "light" | "dark";

const IndexPage = () => {

  return (
    <Fragment>
      <Head>
          <title>Jacob McAllister</title>
          <meta name="description" content="Jacob McAllister web developer portfolio" />
      </Head>
      <div 
      // style={{display: 'none'}}
      >
        <GolfScene>
          <GolfSceneSVG />
        </GolfScene>
        <Trees>
          <Tree />
        </Trees>
        <Golfer />
      </div>
      <Wave>
        <WaveSVG />
      </Wave>
    </Fragment>
  )
}

export default IndexPage
