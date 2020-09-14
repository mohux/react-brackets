
# tournaments-brackets



> Dynamic bracket component, usable for brackets such as single elimination and double elimination



[![NPM](https://img.shields.io/npm/v/tournaments-brackets.svg)](https://www.npmjs.com/package/tournaments-brackets) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)



## Install


via npm
```bash

npm install --save tournaments-brackets

```
via yarn
```bash

yarn add --save tournaments-brackets

```


## Usage


The simplest usage of this component is
```jsx

import  {Bracket,RoundProps} from  'tournaments-brackets';


const rounds:RoundProps[] = [
	{
		title:'Round one',
		seeds:[
			{
			id:1,
			date:new Date().toDateString(),
			teams:[
				{name:'Team A'},
				{name:'Team B'},
			  ]
			},
			{
			id:2,
			date:new Date().toDateString(),
			teams:[
				{name:'Team C'},
				{name:'Team D'},
			 ]
		   }
		]
	},
	{
		title:'Round one',
		seeds:[
			{
			id:3,
			date:new Date().toDateString(),
			teams:[
				{name:'Team A'},
				{name:'Team C'},
			  ]
			},
		]
	},
]

const Component = () => {

return  <Bracket rounds={rounds}/>;
}


```

The core shape is similar to the above, since we can customize seeds and titles, you can pass any additional data to a seed or treat the title as a component.

  modifying a title of the round is so simple,
```jsx

import  {Bracket,RoundProps} from  'tournaments-brackets';
import React from 'react';


const Component = () => {
//....
return  <Bracket rounds={rounds}
		renterTitleComponent={(title:React.ReactNode,roundIndex:number) => {
		return <div style={{textAlign:'center',color:'red'}}>
				{title}
			</div>
		}}/>;
}
```

Customizing a seed on the other hand is a little bit more complicated, yet still easy,
because we need to let the bracket tree to have a consitent design

```jsx
import  {Bracket,RoundProps,Seed,SeedItem,SeedTeam} from  'tournaments-brackets';
import React from 'react';

const CustomSeed = (seed:any,breakpoint:number,roundIndex:number) => {
// breakpoint passed to Bracket component
// to check if mobile view is triggered or not

// mobileBreakpoint is required to be passed down to a seed
return <Seed mobileBreakpoint={breakpoint} style={{fontSize:12}}>
	<SeedItem>
		<div>
			<SeedTeam style={{color:'red'}}>
				{seed.teams[0]?.name || 'NO TEAM '}
			</SeedTeam>
			<SeedTeam>
				{seed.teams[1]?.name || 'NO TEAM '}
			</SeedTeam>
		</div>
	</SeedItem>
</Seed>
}

const Component = () => {
//....
return  <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
}
```

How about if I want to use this component for double elimination losing bracket? the current Seed component only works on single elimination, the answer is fairly simple as well.

```jsx
import  {Bracket,RoundProps,Seed,SingleLineSeed,SeedItem,SeedTeam} from  'tournaments-brackets';
import React from 'react';

const CustomSeed = (seed:any,breakpoint:number,roundIndex:number) => {
// breakpoint passed to Bracket component
// to check if mobile view is triggered or not

// ------ assuming rounds is the losers brackets rounds ------
// losers rounds usually got some identical seeds amount like (2 - 2 - 1 - 1)
const isLineConnector =
 rounds[roundIndex].seeds.length ===
 rounds[roundIndex + 1]?.seeds.length

const Wrapper = isLineConnector ? SingleLineSeed : Seed;

// mobileBreakpoint is required to be passed down to a seed
return <Wrapper mobileBreakpoint={breakpoint} style={{fontSize:12}}>
	<SeedItem>
		<div>
			<SeedTeam style={{color:'red'}}>
				{seed.teams[0]?.name || 'NO TEAM '}
			</SeedTeam>
			<SeedTeam>
				{seed.teams[1]?.name || 'NO TEAM '}
			</SeedTeam>
		</div>
	</SeedItem>
</Wrapper>
}

const Component = () => {
//....
return  <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
}
```

## License



MIT © [mohux](https://github.com/mohux)
