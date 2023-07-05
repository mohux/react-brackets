import { IRoundProps } from './Rounds';

export type ISeedProps = {
  id: number | string;
  teams: Array<{ name?: string; [key: string]: any }>;
  date?: string;
  mobileBreakpoint?: number;
  [key: string]: any;
};

export interface IRenderSeedProps {
  seed: ISeedProps;
  breakpoint: number;
  roundIndex: number;
  isMiddleOfTwoSided: boolean;
  seedIndex: number;
  rounds?: IRoundProps[];
}
