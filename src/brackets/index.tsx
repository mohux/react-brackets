import React, { Fragment } from 'react';
import { Round, Bracket, SeedsList } from '../components/round';
import SwipeableViews from 'react-swipeable-views';
import useMedia from '../hooks/useMedia';
import { renderSeed, renderTitle } from '../utils/renders';
import { ISingleEliminationProps } from '../types/SingleElimination';
import { IRoundProps } from '../types/Rounds';
import { ISeedProps } from '../types/Seed';

const SingleElimination = ({
  rounds,
  rtl = false,
  roundClassName,
  bracketClassName,
  swipeableProps = {},
  mobileBreakpoint = 992,
  twoSided = false,
  renderSeedComponent = renderSeed,
  roundTitleComponent = renderTitle,
}: ISingleEliminationProps) => {
  // Checking responsive size
  const isResponsive = useMedia(mobileBreakpoint);

  const getFragment = (
    seed: ISeedProps,
    roundIdx: number,
    idx: number,
    rounds: IRoundProps[],
    isMiddleOfTwoSided: any
  ) => (
    <Fragment key={seed.id}>
      {renderSeedComponent({
        seed,
        breakpoint: mobileBreakpoint,
        roundIndex: roundIdx,
        seedIndex: idx,
        rounds,
        isMiddleOfTwoSided,
      })}
    </Fragment>
  );

  const data = rounds.map((round, roundIdx) => (
    <Round key={round.title} className={roundClassName} mobileBreakpoint={mobileBreakpoint}>
      {round.title && roundTitleComponent(round.title, roundIdx)}
      <SeedsList>
        {round.seeds.map((seed, idx) => {
          return getFragment(seed, roundIdx, idx, rounds, false);
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

  const getRenderedRounds = (
    roundsStartIndex: number,
    roundsEndIndex: number,
    renderFirstHalfOfRoundsSeeds: boolean,
    rounds: IRoundProps[],
    dir: string
  ) =>
    rounds.slice(roundsStartIndex, roundsEndIndex).map((round, roundIdx) => (
      <Round key={round.title} className={roundClassName} mobileBreakpoint={mobileBreakpoint}>
        {round.title && roundTitleComponent(round.title, roundIdx)}
        <SeedsList dir={dir}>
          {renderFirstHalfOfRoundsSeeds
            ? round.seeds
                .slice(0, round.seeds.length / 2)
                .map((seed, idx) => getFragment(seed, roundIdx, idx, rounds, false))
            : round.seeds
                .slice(round.seeds.length / 2, round.seeds.length)
                .map((seed, idx) => getFragment(seed, roundIdx, idx, rounds, roundIdx < roundsEndIndex - 2))}
        </SeedsList>
      </Round>
    ));

  if (twoSided) {
    return (
      <Bracket className={bracketClassName} mobileBreakpoint={mobileBreakpoint}>
        {[
          getRenderedRounds(0, rounds.length - 1, true, rounds, 'ltr'),
          getRenderedRounds(rounds.length - 1, rounds.length, false, rounds, 'twoSided'),
          getRenderedRounds(1, rounds.length, false, [...rounds].reverse(), 'rtl'),
        ]}
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
