import React from 'react';
import { Bracket, Seed, SingleLineSeed, SeedItem, SeedTeam, SeedTime, IRoundProps, IRenderSeedProps } from 'react-brackets';

const rounds: IRoundProps[] = [
  {
    title: 'Quarter Finals',
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: 'Team 1', score: 2 },
          { id: 3, name: 'Team 2', score: 6 },
        ],
      },{
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: 'Team 3', score: 2 },
          { id: 3, name: 'Team 4', score: 6 },
        ],
      },{
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: 'Team 5', score: 2 },
          { id: 3, name: 'Team 6', score: 6 },
        ],
      },
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: 'The Leons', score: 2 },
          { id: 3, name: 'Kitties', score: 6 },
        ],
      },
    ],
  },
  {
    title: 'Semi Finals',
    seeds: [
      {
      id: 1,
      date: new Date().toDateString(),
      teams: [
        { id: 1, name: 'Team 1', score: 2 },
        { id: 3, name: 'Team 3', score: 6 },
      ],
    },{
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: 'The Leons', score: 2 },
          { id: 3, name: 'Team 5', score: 6 },
        ],
      },]
  },
  {
    title: 'Final',
    seeds: [...new Array(1)].fill({
      id: 1,
      date: new Date().toDateString(),
      teams: [
        { id: 1, name: 'The Leons', score: 2 },
        { id: 3, name: 'Team 1', score: 6 },
      ],
    }),
  },
];

const RenderSeed = ({ breakpoint, seed, isMiddleOfTwoSided }: IRenderSeedProps) => {
  const Wrapper = isMiddleOfTwoSided ? SingleLineSeed : Seed
  return (
    <Wrapper mobileBreakpoint={breakpoint} seed={seed}>
      <SeedItem style={{ width: '100%' }}>
        <div>
          <SeedTeam>{seed.teams?.[0].name || '-----------'}</SeedTeam>
          <div style={{ height: 1, backgroundColor: '#707070' }}></div>
          <SeedTeam>{seed.teams?.[1]?.name || '-----------'}</SeedTeam>
        </div>
      </SeedItem>
      <SeedTime mobileBreakpoint={breakpoint} style={{ fontSize: 9 }}>
        {seed.date}
      </SeedTime>
    </Wrapper>
  );
};

const TwoSidedSingleElimination = () => {
  return (
    <Bracket
      mobileBreakpoint={767}
      rounds={rounds}
      renderSeedComponent={RenderSeed}
      swipeableProps={{ enableMouseEvents: true, animateHeight: true }}
      twoSided={true}
    />
  );
};

export default TwoSidedSingleElimination;
