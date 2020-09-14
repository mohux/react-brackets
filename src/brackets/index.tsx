import React, { Fragment, ReactNode } from 'react';
import { Round, Bracket, SeedsList, RoundProps } from '../components/round';
import SwipeableViews, { SwipeableViewsProps } from 'react-swipeable-views';
import useMedia from '../hooks/useMedia';
import { renderSeed, renderTitle } from '../utils/renders';

export interface SingleEliminationProps {
  // If true, the component direction will be set to RTL
  rtl?: boolean;
  // Array of rounds matching RoundProps shape,
  rounds: RoundProps[];
  // Single round className
  roundClassName?: string;
  /** @default 992, if you don't want a mobile breakpoint, pass 0 */
  mobileBreakpoint?: number;
  // The whole bracket className
  bracketClassName?: string;
  /** {@link https://github.com/oliviertassinari/react-swipeable-views} to read about it's props  */
  swipeableProps?: SwipeableViewsProps;
  /**
   * @param {ReactNode} title string or component passed with each round
   * @param {number} round the current round index
   */
  roundTitleComponent?: (title: ReactNode, roundIdx: number) => any;
  /**
   * @param {object} seed the current seed
   * @param {number} breakpoint the breakpoint used to determine responsive size
   * @param {number} roundIdx the current round index
   */
  renderSeedComponent?: (seed: any, breakpoint: number, roundIdx: number) => any;
}

const SingleElimination = ({
  rounds,
  rtl = false,
  roundClassName,
  bracketClassName,
  swipeableProps = {},
  mobileBreakpoint = 992,
  renderSeedComponent = renderSeed,
  roundTitleComponent = renderTitle,
}: SingleEliminationProps) => {
  // Checking responsive size
  const isResponsive = useMedia(mobileBreakpoint);

  const data = rounds.map((round, roundIdx) => (
    <Round key={roundIdx} className={roundClassName} mobileBreakpoint={mobileBreakpoint}>
      {round.title && roundTitleComponent(round.title, roundIdx)}
      <SeedsList>
        {round.seeds.map((seed, idx) => (
          <Fragment key={idx}>{renderSeedComponent(seed, mobileBreakpoint, roundIdx)}</Fragment>
        ))}
      </SeedsList>
    </Round>
  ));

  if (isResponsive) {
    // Since SwipeableViewsProps have an issue that it uses ref inside of it, We need to remove ref from the object
    const { ref, ...rest } = swipeableProps;
    return (
      <Bracket className={bracketClassName} dir={rtl ? 'rtl' : 'ltr'} mobileBreakpoint={mobileBreakpoint}>
        <SwipeableViews style={{ minHeight: '500px' }} axis={rtl ? 'x-reverse' : 'x'} {...rest}>
          {data}
        </SwipeableViews>
      </Bracket>
    );
  }
  return (
    <Bracket className={bracketClassName} dir={rtl ? 'rtl' : 'ltr'} mobileBreakpoint={mobileBreakpoint}>
      {data}
    </Bracket>
  );
};

export default SingleElimination;
