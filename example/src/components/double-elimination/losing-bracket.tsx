import React from 'react';
import { Bracket, Seed, SingleLineSeed, SeedItem, SeedTeam, IRoundProps, IRenderSeedProps } from 'react-brackets';

interface LosingProps {
  rounds: IRoundProps[];
}

const LosingBracket: React.FC<LosingProps> = ({ rounds: losing }) => {
  const RenderLosingSeed = ({ breakpoint, roundIndex, seed }: IRenderSeedProps) => {
    const isLineConnector = losing[roundIndex].seeds.length === losing[roundIndex + 1]?.seeds.length;
    const Wrapper = isLineConnector ? SingleLineSeed : Seed;
    return (
      <Wrapper mobileBreakpoint={breakpoint}>
        <SeedItem style={{ width: '100%' }}>
          <div>
            <SeedTeam>{seed.teams?.[0]?.name || '-----------'}</SeedTeam>
            <div style={{ height: 1, backgroundColor: '#707070' }}></div>
            <SeedTeam>{seed.teams?.[1]?.name || '-----------'}</SeedTeam>
          </div>
        </SeedItem>
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
