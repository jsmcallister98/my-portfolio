import React, { useState, useEffect, Fragment } from 'react'
import Head from 'next/head'
import styled from 'styled-components';
import {sharedTransition, Tree, Trees } from 'src/styles/components';
import { GolfScene, GolfSceneSVG, } from 'src/components/Golf/GolfScene'
import { Button } from 'src/styles/blog';
import Golfer from 'src/components/Golf/Golfer';
import {Wave, WaveSVG} from 'src/styles/components'

export type iTheme = "light" | "dark";

const StyledPage = styled.div`
  ${sharedTransition}
  height: 100vh;
  width: 80%;
  margin: auto;
  padding: 0 1rem;
  padding-top: 40px;
  display: flex;
  justify-content: space-around;
`

const IndexPage = () => {

  return (
    <Fragment>
      <Head>
          <title>Jacob McAllister</title>
          <meta name="description" content="Jacob McAllister web developer portfolio" />
      </Head>
      <GolfScene>
        <GolfSceneSVG />
      </GolfScene>
      <Trees>
        <Tree />
      </Trees>
      <Golfer />
      <Wave>
        <WaveSVG />
      </Wave>
      <StyledPage>
      </StyledPage>
    </Fragment>
  )
}

export default IndexPage
