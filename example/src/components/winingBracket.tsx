import React from 'react';
import { Bracket, Seed, SeedItem, SeedTeam, RoundProps } from 'tournaments-brackets';
import { MyContext } from './doubleElimination';

interface LosingProps {
  rounds: RoundProps[];
}

const WiningBracket: React.FC<LosingProps> = ({ rounds: wining }) => {
  const { focused } = React.useContext(MyContext);

  const RenderSeed = (seed: any, breakpoint: number) => {
    // const isMobile = window.innerWidth <= breakpoint;
    // if (isMobile && seed.bye_match) return null;

    return (
      <Seed
        style={{
          opacity: seed.bye_match ? 0.5 : 1,
          // minWidth: 175,
          // fontSize: 11,
        }}
        className='custom-border'
        mobileBreakpoint={breakpoint}
      >
        <SeedItem style={{ width: '100%' }}>
          <div>
            <SeedTeam style={{backgroundColor:focused === seed.teams?.[0]?._id ? 'green' : ''}}>{seed.teams?.[0]?.name || '-----------'}</SeedTeam>
            <div style={{ height: 1, backgroundColor: '#707070' }}></div>
            <SeedTeam style={{backgroundColor:focused === seed.teams?.[1]?._id ? 'green' : ''}}>{seed.teams?.[1]?.name || '-----------'}</SeedTeam>
          </div>
        </SeedItem>
        {/* <SeedTime mobileBreakpoint={breakpoint} style={{ fontSize: 9 }}>
          {seed.date}
        </SeedTime> */}
      </Seed>
    );
  };

  return (
    <Bracket
      rounds={wining}
      renderSeedComponent={RenderSeed}
      swipeableProps={{
        enableMouseEvents: true,
        animateHeight: true,
        style: {
          padding: '0 50px 0 0',
        },
      }}
    />
  );
};

export default WiningBracket;
