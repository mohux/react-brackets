import React from 'react';
import { Bracket, Seed, SingleLineSeed, SeedItem, SeedTeam, RoundProps } from 'tournaments-brackets';
import { MyContext } from './doubleElimination';

interface LosingProps {
  rounds: RoundProps[];
}

const LosingBracket: React.FC<LosingProps> = ({ rounds: losing }) => {
  const { focused } = React.useContext(MyContext);

  const RenderLosingSeed = (seed: any, breakpoint: number, roundIdx: number) => {
    // const isMobile = window.innerWidth <= breakpoint;

    // if (isMobile && seed.bye_match) return null;

    const isLineConnector = losing[roundIdx].seeds.length === losing[roundIdx + 1]?.seeds.length;
    const Wrapper = isLineConnector ? SingleLineSeed : Seed;
    return (
      <Wrapper
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
            <SeedTeam style={{ backgroundColor: focused === seed.teams?.[0]?._id ? 'green' : '' }}>
              {seed.teams?.[0]?.name || '-----------'}
            </SeedTeam>
            <div style={{ height: 1, backgroundColor: '#707070' }}></div>
            <SeedTeam style={{ backgroundColor: focused === seed.teams?.[1]?._id ? 'green' : '' }}>
              {seed.teams?.[1]?.name || '-----------'}
            </SeedTeam>
          </div>
        </SeedItem>
        {/* <SeedTime mobileBreakpoint={breakpoint} style={{ fontSize: 9 }}>
            {seed.date}
          </SeedTime> */}
      </Wrapper>
    );
  };

  return (
    <Bracket
      rounds={losing}
      renderSeedComponent={RenderLosingSeed}
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

export default LosingBracket;
