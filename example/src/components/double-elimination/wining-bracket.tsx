import React from 'react';
import { Bracket, Seed, SeedItem, SeedTeam, IRoundProps, IRenderSeedProps } from 'react-brackets';

interface LosingProps {
  rounds: IRoundProps[];
}

const WiningBracket: React.FC<LosingProps> = ({ rounds: wining }) => {
  const RenderSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
    return (
      <Seed
        style={{
          opacity: seed.bye_match ? 0.5 : 1,
        }}
        className='custom-border'
        mobileBreakpoint={breakpoint}
      >
        <SeedItem style={{ width: '100%' }}>
          <div>
            <SeedTeam>{seed.teams?.[0]?.name || '-----------'}</SeedTeam>
            <SeedTeam>{seed.teams?.[1]?.name || '-----------'}</SeedTeam>
          </div>
        </SeedItem>
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
