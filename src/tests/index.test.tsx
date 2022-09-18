import '@testing-library/jest-dom';
import React from 'react';
import { IRoundProps } from '../types/Rounds';
import { SingleElimination as Bracket } from '../brackets';
import { render } from '@testing-library/react';
import { IRenderSeedProps, ISeedProps } from '../types/Seed';

test('Works with empty rounds', () => {
  const rounds: IRoundProps[] = [];
  const { container } = render(<Bracket rounds={rounds} />);
  expect(container).toBeInTheDocument();
});

test('Works with multiple rounds', () => {
  const filledRounds: IRoundProps[] = [
    {
      title: 'Round 1',
      seeds: [
        {
          id: 1,
          teams: [{ name: 'Team 1' }, { name: 'Team 2' }],
        },
        {
          id: 2,
          teams: [{ name: 'Team 3' }, { name: 'Team 4' }],
        },
      ],
    },
    {
      title: 'Round 2',
      seeds: [
        {
          id: 3,
          teams: [{ name: 'Team 1' }, { name: 'Team 4' }],
        },
      ],
    },
  ];

  const { getByText } = render(<Bracket rounds={filledRounds} />);

  expect(getByText('Round 1')).toBeInTheDocument();
  expect(getByText('Round 2')).toBeInTheDocument();
});

test('Works with custom seed', () => {
  const filledRounds: IRoundProps[] = [
    {
      title: 'Round 1',
      seeds: [
        {
          id: 1,
          teams: [{ name: 'Team 1' }, { name: 'Team 2' }],
        },
        {
          id: 2,
          teams: [{ name: 'Team 3' }, { name: 'Team 4' }],
        },
      ],
    },
    {
      title: 'Round 2',
      seeds: [
        {
          id: 3,
          teams: [{ name: 'Team 1' }, { name: 'Team 4' }],
        },
      ],
    },
  ];

  const RenderSeed = ({ seed }: IRenderSeedProps) => {
    return (
      <div>
        <div>{seed.teams?.[0]?.name}</div>
        <span>VS</span>
        <div>{seed.teams?.[1]?.name}</div>
      </div>
    );
  };

  const { getAllByText, getByText } = render(<Bracket rounds={filledRounds} renderSeedComponent={RenderSeed} />);

  expect(getAllByText('VS')[0]).toBeInTheDocument();
  // checking that Team 1 was rendered twice
  expect(getAllByText('Team 1').length).toBe(2);
  expect(getByText('Team 2')).toBeInTheDocument();
});
