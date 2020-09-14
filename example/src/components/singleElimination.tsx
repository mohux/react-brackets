import React from 'react';
import { Bracket, Seed, SeedItem, SeedTeam, SeedTime,RoundProps } from 'tournaments-brackets';

const rounds: RoundProps[] = [
  {
    title: 'Round 1',
    seeds: [
      {},
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: 'The Leons', score: 2 },
          // { id: 3, name: 'Kitties', score: 6 },
        ],
      },
      {},
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: 'The Leons', score: 2 },
          // { id: 3, name: 'Kitties', score: 6 },
        ],
      },
    ],
  },
  {
    title: 'Round 2',
    seeds: [...new Array(2)].fill({
      id: 1,
      date: new Date().toDateString(),
      teams: [
        { id: 1, name: 'The Leons', score: 2 },
        { id: 3, name: 'Kitties', score: 6 },
      ],
    }),
  },
  {
    title: 'Round 3',
    seeds: [...new Array(1)].fill({
      id: 1,
      date: new Date().toDateString(),
      teams: [
        { id: 1, name: 'The Leons', score: 2 },
        { id: 3, name: 'Kitties', score: 6 },
      ],
    }),
  },
];

interface ContextProps {
  focused: any;
  setFocused?: any;
}
const MyContext = React.createContext<ContextProps>({
  focused: null,
});

const RenderSeed = (seed: any, breakpoint: number) => {
  return (
    <Seed
      style={{
        opacity: !seed.teams?.[0] && !seed.teams?.[1] ? 0.5 : 1,
        minWidth: 175,
        fontSize: 11,
      }}
      className='custom-border'
      mobileBreakpoint={breakpoint}
    >
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
    </Seed>
  );
};

const SingleEl = () => {
  const [focused, setFocused] = React.useState(null);
  return (
    <MyContext.Provider value={{ focused, setFocused }}>
      <Bracket
        mobileBreakpoint={767}
        rounds={rounds}
        renderSeedComponent={RenderSeed}
        swipeableProps={{ enableMouseEvents: true,animateHeight:true }}
      />
    </MyContext.Provider>
  );
};

export default SingleEl;
