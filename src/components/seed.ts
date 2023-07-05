import styled from 'styled-components';
import { ISeedProps } from '../types/Seed';

export const SeedItem = styled.div`
  color: #fff;
  width: 100%;
  background-color: #1a1d2e;
  padding: 0;
  border-radius: 0.2em;
  box-shadow: 0 2px 4px -2px #111630;
  text-align: center;
  position: relative;
`;

export const SeedTeam = styled.div`
  padding: 0.3rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.2em;
  align-items: center;
`;

export const SeedTime = styled.div<ISeedProps>(
  (props) => `
margin-top: 2px;
font-size: 12px;
color: #8f8f8f;
height: 0;
@media (max-width: ${props.mobileBreakpoint}px) {
  height:auto;
}
`
);

/*
 * Difference between "SingleLineSeed" and "Seed" is that single line seed
 * will directly connect to the next node, it's good for double elimination losing brackets.
 *
 * The best behavior in such case is, to check if the next round seeds matches the current round seeds
 */

export const SingleLineSeed = styled.div<ISeedProps>(
  (props) => `
padding: 1em 1.5em;
min-width: 225px;
width:100%;
position: relative;
display: flex;
align-items: center;
flex: 0 1 auto;
flex-direction: column;
justify-content: center;
font-size: 14px;
@media (max-width: ${props.mobileBreakpoint}px) {
  width:100%;
}
@media (min-width: ${(props.mobileBreakpoint || 0) + 1}px) {
  &::after {
      content: "";
      position: absolute;
      height: 50%;
      width: 3em;
    [dir="rtl"] & {
      left: -1.5em;
    }
    [dir="twoSided"] & {
      left: -1.5em;
    }
    [dir="ltr"] & {
      right: -1.5em;
    }
  }
  &:nth-child(even)::after {
    border-bottom: 1px solid #707070;
    top: -0.5px;
  }
  &:nth-child(odd)::after {
    border-top: 1px solid #707070;
    top: calc(50% - 0.5px);
  }
}
`
);

export const Seed = styled.div<ISeedProps>(
  (props) => `
  padding: 1em 1.5em;
  min-width: 225px;
  width:100%;
  position: relative;
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  @media (max-width: ${props.mobileBreakpoint}px) {
    width:100%;
  }
  @media (min-width: ${(props.mobileBreakpoint || 0) + 1}px) {
    &::after {
        content: "";
        position: absolute;
        height: 50%;
        width: 1.5em;
      [dir="rtl"] & {
        left: 0px;
      }
      [dir="ltr"] & {
        right: 0px;
      }
    }

    &:nth-child(even)::before{
      content:'';
      border-top: 1px solid #707070;
      position:absolute;
      top: -0.5px;
      width:1.5em;
      [dir="rtl"] & {
        left:-1.5em;
        }
      [dir="ltr"] & {
        right:-1.5em;
      }
    }

    &:nth-child(even)::after {
      border-bottom: 1px solid #707070;
      top: -0.5px;
     [dir="rtl"] & {
        border-left: 1px solid #707070;
        }
      [dir="ltr"] & {
        border-right: 1px solid #707070;
      }
    }
    &:nth-child(odd):not(:last-child)::after {
      border-top: 1px solid #707070;
      top: calc(50% - 0.5px);
      [dir="rtl"] & {
        border-left: 1px solid #707070;
        }
      [dir="ltr"] & {
        border-right: 1px solid #707070;
      }
    }
}
`
);
