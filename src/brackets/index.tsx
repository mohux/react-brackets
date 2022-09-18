import React, { Fragment } from 'react';
import { Round, Bracket, SeedsList } from '../components/round';
import SwipeableViews from 'react-swipeable-views';
import useMedia from '../hooks/useMedia';
import { renderSeed, renderTitle } from '../utils/renders';
import { ISingleEliminationProps } from '../types/SingleElimination';

const SingleElimination = ({
  rounds,
  rtl = false,
  roundClassName,
  bracketClassName,
  swipeableProps = {},
  mobileBreakpoint = 992,
  renderSeedComponent = renderSeed,
  roundTitleComponent = renderTitle,
}: ISingleEliminationProps) => {
  // Checking responsive size
  const isResponsive = useMedia(mobileBreakpoint);

  const data = rounds.map((round, roundIdx) => (
    <Round key={round.title} className={roundClassName} mobileBreakpoint={mobileBreakpoint}>
      {round.title && roundTitleComponent(round.title, roundIdx)}
      <SeedsList>
        {round.seeds.map((seed, idx) => {
          return (
            <Fragment key={seed.id}>
              {renderSeedComponent({ seed, breakpoint: mobileBreakpoint, roundIndex: roundIdx, seedIndex: idx })}
            </Fragment>
          );
        })}
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

export { SingleElimination };
