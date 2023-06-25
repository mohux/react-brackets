# react-brackets

> Dynamic bracket component, usable for brackets such as single elimination and double elimination

[![NPM](https://img.shields.io/npm/v/react-brackets.svg)](https://www.npmjs.com/package/react-brackets) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![react-brackets](https://github.com/mohux/react-brackets/blob/master/images/web.gif?raw=true 'react-brackets')
![react-brackets](https://github.com/mohux/react-brackets/blob/master/images/mobile.gif?raw=true 'react-brackets')

## Install

via npm

```bash

npm install --save react-brackets

```

via yarn

```bash

yarn add --save react-brackets

```

## Usage

### Basic Example

The simplest usage of this component is

```jsx
import { Bracket, IRoundProps } from 'react-brackets';

const rounds: IRoundProps[] = [
  {
    title: 'Round one',
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
      },
    ],
  },
  {
    title: 'Round one',
    seeds: [
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
];

const Component = () => {
  return <Bracket rounds={rounds} />;
};
```

### Custom Title

The core shape is similar to the above, since we can customize seeds and titles, you can pass any additional data to a seed or treat the title as a component.

modifying a title of the round is so simple,

```jsx
import { Bracket, IRoundProps } from 'react-brackets';
import React from 'react';

const Component = () => {
  //....
  return (
    <Bracket
      rounds={rounds}
      roundTitleComponent={(title: React.ReactNode, roundIndex: number) => {
        return <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>;
      }}
    />
  );
};
```

### Custom Seed

Customizing a seed on the other hand is a little bit more complicated, yet still easy,
because we need to let the bracket tree to have a consistent design

**Any additional data you pass inside a seed object is accessible via renderSeedComponent**

```jsx
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import React from 'react';

const CustomSeed = ({seed, breakpoint, roundIndex, seedIndex}: IRenderSeedProps) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam style={{ color: 'red' }}>{seed.teams[0]?.name || 'NO TEAM '}</SeedTeam>
          <SeedTeam>{seed.teams[1]?.name || 'NO TEAM '}</SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

const Component = () => {
  //....
  return <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
};
```

### Double Elimination

How about if I want to use this component for double elimination losing bracket? the current Seed component only works on single elimination, the answer is fairly simple as well.

```jsx
import { Bracket, IRoundProps, Seed, SingleLineSeed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import React from 'react';

const CustomSeed = ({seed, breakpoint, roundIndex, seedIndex}: IRenderSeedProps) => {
  // ------ assuming rounds is the losers brackets rounds ------
  // losers rounds usually got some identical seeds amount like (2 - 2 - 1 - 1)

  const isLineConnector = rounds[roundIndex].seeds.length === rounds[roundIndex + 1]?.seeds.length;

  const Wrapper = isLineConnector ? SingleLineSeed : Seed;

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Wrapper mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam style={{ color: 'red' }}>{seed.teams[0]?.name || 'NO TEAM '}</SeedTeam>
          <SeedTeam>{seed.teams[1]?.name || 'NO TEAM '}</SeedTeam>
        </div>
      </SeedItem>
    </Wrapper>
  );
};

const Component = () => {
  //....
  return <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
};
```

### Loading

```jsx
import { Bracket, IRenderSeedProps, Seed, SeedItem, SeedTeam, SeedTime } from 'react-brackets';

const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
  return (
    <Seed mobileBreakpoint={breakpoint} className='test'>
      <SeedItem className='skeleton-item'>
        <div>
          <SeedTeam>.</SeedTeam>
          <SeedTeam>.</SeedTeam>
        </div>
      </SeedItem>
      <SeedTime mobileBreakpoint={breakpoint} style={{ fontSize: 9 }}>
        {seed.date}
      </SeedTime>
    </Seed>
  );
};

const Component = () => {
  //....
  return <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
};
```

## Bracket Props

| Prop                | Type                 | Description                                                                                                                                                              |
| ------------------- |----------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| rounds              | IRoundProps[]        | Array of rounds, each round has {title,array of seeds}, if you're not using a custom seed render, each seed needs an array of teams, each team should have a name        |
| mobileBreakpoint    | number               | This bracket supports responsive design, on window reaching this size, it will trigger mobile swipable view, if you want to disable it, you can pass 0, (default is 992) |
| rtl                 | boolean              | Direction of the bracket as RTL (default is LTR)                                                                                                                         |
| roundClassName      | string               | Round wrapper className                                                                                                                                                  |
| bracketClassName    | string               | The bracket className                                                                                                                                                    |
| renderSeedComponent | functional component | Custom render for every seed                                                                                                                                             |
| roundTitleComponent | functional component | Custom render for every round title                                                                                                                                      |
| swipeableProps      | SwipeableProps       | Please check this [React Swipeable Views](https://github.com/oliviertassinari/react-swipeable-views)                                                                     |

For detailed examples, you can clone this repo then:

> you can skip starting the root folder, but if you want to modify the library you have to run it.

```bash
yarn
```

then

```bash
yarn start
```

then open a new terminal

```bash
cd example
```

then

```bash
yarn
```

lastly

```bash
yarn start
```

## License

MIT © [mohammadou1](https://github.com/mohammadou1)
