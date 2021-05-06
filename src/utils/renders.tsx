import React, { ReactNode } from 'react';
import { Seed, SeedItem, SeedTeam, SeedTime } from '../components/seed';
import { RoundTitle } from '../components/round';
import { RenderSeedProps } from '../brackets';

/* ------------------------- default title component ------------------------ */
export const renderTitle = (title: ReactNode) => <RoundTitle>{title}</RoundTitle>;

/* ------------------------- default seed component ------------------------- */
export const renderSeed = ({ seed, breakpoint }: RenderSeedProps) => {
  return (
    <Seed mobileBreakpoint={breakpoint}>
      <SeedItem>
        <div>
          <SeedTeam>{seed.teams?.[0]?.name || '-----------'}</SeedTeam>
          <SeedTeam>{seed.teams?.[1]?.name || '-----------'}</SeedTeam>
        </div>
      </SeedItem>
      <SeedTime mobileBreakpoint={breakpoint}>{seed.date}</SeedTime>
    </Seed>
  );
};
