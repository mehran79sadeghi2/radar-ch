# radar-ch

> Radar chart component for React.js



## install

    npm install --save radar-ch
## usage

```jsx
   <Radar
	size={250}
	data={[
		{
			"name":  "mitra",
			"a":  80,
			"b":  50,
			"c":  70
		},
		{
			"name":  "jewel",
			"a":  35,
			"b":  60,
			"c":  30
		},
		{
			"name":  "cindra",
			"a":  88,
			"b":  10,
			"c":  50
		},
		{
			"name":  "rikki",
			"a":  60,
			"b":  30,
			"c":  50
		},
		{
			"name":  "flint",
			"a":  50,
			"b":  80,
			"c":  70
		},
	]}
	mirror={true}
	keys={['a']}
	index_by="name"
	max_value={100}
	grid={{
		level:  7,
		stroke:  "blue",
		stroke_width:  0,
		fill:  'black',
		opacity:  0.1,
		transition:  0.3,
	}}
	dot={{
		r:  3,
		border_color:  'black',
		border_width:  1,
		dynamic_background_color: (value) => {
			if (value >= 70) return  'green';
			else  if (value >= 40) return  'yellow';
			else  return  'red';
		},
	}}
	border={{
		width:  0,
		color:  'black',
	}}
	shape={{
		opacity:  0,
		fill: 'white'
		coefficient:  0.1,
		shadow_color: (value) => {
			if (value >= 70) return  'green';
			else  if (value >= 40) return  'yellow';
			else  return  'red';
		},
		shadow_blur:  40,
		mix_blend_mode:  'multiply'
	}}
	label={{
		font_size:  10,
		offset:  25,
		custom: (label_key, degree) => {
			return  <div>{label_key}</div>
		}
	}}
/>
```
