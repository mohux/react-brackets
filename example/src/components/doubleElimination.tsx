import React, { useEffect, useState, useMemo } from 'react';
import LoadingBracket from './loading';
import { RoundProps } from 'tournaments-brackets';
import _ from 'underscore';
import LosingBracket from './losingBracket';
import WiningBracket from './winingBracket';

interface ContextProps {
  focused: any;
  setFocused?: any;
}
export const MyContext = React.createContext<ContextProps>({
  focused: null,
});

function thrott() {
  return new Promise((resolve: any) => setTimeout(resolve, 1000));
}
const baseURL = 'https://api.kafu.games/api/testing/stages';

type DataShape = 'loading' | any;

const DoubleEl = () => {
  const [data, setData] = useState<DataShape>('loading');

  async function fetchData() {
    try {
      await thrott();
      const bracket = await fetch(baseURL + '/5f54c6659ab2b32dcf32d2d6').then((response) => response.json());
      const b = _.groupBy(bracket.matches, 'bracket_type');
      setData(b);
    } catch (error) {}
  }

  useEffect(() => {
    fetchData();
  }, []);

  // To use it inside use memo for winners
  const MemorizeWining = () =>
    Object.values(winningGroup).map((seeds, idx) => ({
      seeds,
      title: `Round ${idx + 1}`,
    }));

  // To use it inside use memo for losers
  const MemorizeLosing = () =>
    Object.values(losingGroup).map((seeds: any[], idx, array) => {
      const seedsLength = seeds.length;
      const nextSeedsLength = array[idx + 1]?.length;
      if (seedsLength < nextSeedsLength) {
        [...new Array(nextSeedsLength - seedsLength)].forEach(() => seeds.push({}));
      }
      return {
        seeds,
        title: `Round ${idx + 1}`,
      };
    });

  const findTeam = (search: string) => {
    if (!search) return null;

    const teams = data.WB?.reduce((collection: any, match: any) => collection?.concat(match?.teams), []);
    const result = teams.find((team: any) => team.name?.trim().toLowerCase().includes(search.trim().toLowerCase()));
    return result;
  };

  const winningGroup = useMemo(() => _.groupBy(data?.WB, 'round_number'), [data]);

  const wining: RoundProps[] = useMemo(MemorizeWining, [winningGroup]);

  const losingGroup = useMemo(() => _.groupBy(data?.LB, 'round_number'), [data]);

  const losing: RoundProps[] = useMemo(MemorizeLosing, [losingGroup]);

  const [focused, setFocused] = React.useState(null);

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const team: any = findTeam(e.target['search'].value);
    if(team?._id && focused !== team._id) setFocused(team._id);
    if(!e.target['search'].value && focused) setFocused(null)
  };

  return data === 'loading' ? (
    <LoadingBracket />
  ) : (
    <MyContext.Provider value={{ focused, setFocused }}>
      {console.log('rendering')}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0,padding:'5px 15px', backgroundColor: 'white',zIndex:99 }}>
          <form onSubmit={searchHandler}>
            <input name='search' />
            <button type='submit'>Search</button>
          </form>
        </div>
        <WiningBracket rounds={wining} />

        <div style={{ height: 50 }}></div>

        <LosingBracket rounds={losing} />
      </div>
    </MyContext.Provider>
  );
};

export default DoubleEl;
