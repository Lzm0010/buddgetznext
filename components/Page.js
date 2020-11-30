import React from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import Meta from './Meta';

const theme = {
    primary: '#d5a021',
    dark: '#4b4237',
    grey: '#736b60',
    lightgrey: '#a49694',
    white: '#ede7d9',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
}

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.dark};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size:1.5rem;
        line-height: 2;
        font-family: 'pink_chicken';
    }
    a {
        text-decoration: none;
        color: ${props => props.theme.dark}
    }
`;


export default function Page({children}) {
    return (
        <ThemeProvider theme={theme}>
            <StyledPage>
                <GlobalStyle />
                <Meta />
                <Inner>
                    {children}
                </Inner>
            </StyledPage>
        </ThemeProvider>
    )
};