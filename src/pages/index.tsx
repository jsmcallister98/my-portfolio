import React, { useState, useEffect, Fragment } from 'react'
import Head from 'next/head'
import styled from 'styled-components';
import { sharedTransition } from 'src/styles/components';
import { Button } from 'src/styles/blog';
import Golfer from 'src/components/Animations/Golf/Golfer';

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
      <StyledPage>
          <div>
            <h1>Hello there</h1>
            <p style={{ color: "var(--color-primary-accent)" }}>General Kenobi!</p>
                    <Button>Button</Button>
          </div>
          <Golfer />
      </StyledPage>
    </Fragment>
  )
}

export default IndexPage
