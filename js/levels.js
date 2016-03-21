var levels = new Array (
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , ,1, , , , , , , , , , ,2, , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , ,1, , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , ,2, , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , ,2, , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , ,1, , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , ,1, , , , ,0, , , , , ,2, , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , ,1, , , , ,0, , , , , ,2, , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , ,0, , , , , , , , , ,0],
		[0, , , , , , , , ,0, ,2, , , , , , , ,0],
		[0, , , ,1, , , , ,0, , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , ,0, , , , , , , , , ,0],
		[0, , , ,1, , , , , , , , , , ,2, , , ,0],
		[0, , , , , , , , ,0, , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , ,0, , , , , , , , , ,0],
		[0, , , ,1, , , , ,0, , , , , ,2, , , ,0],
		[0, , , , , , , , ,0, , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , ,0, ,0, , , , , , , ,0],
		[0, , , ,1, , , , , , , , , , ,2, , , ,0],
		[0, , , , , , , , ,0, ,0, , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , ,0,0,0, , , , , , , ,0],
		[0, , , ,1, , , , , , , , , , ,2, , , ,0],
		[0, , , , , , , , ,0,0,0, , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , ,0,0,0, , , , , , , ,0],
		[0, , , ,1, , , , ,0,0,0, , , ,2, , , ,0],
		[0, , , , , , , , ,0,0,0, , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , ,0, , , ,0, , , , , , ,0],
		[0, , , , , , , , ,0, ,0, , , , , , , ,0],
		[0, , , ,1, , , , , , , , , , ,2, , , ,0],
		[0, , , , , , , , ,0, ,0, , , , , , , ,0],
		[0, , , , , , , ,0, , , ,0, , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , ,0, , , ,0, , , , , , ,0],
		[0, , , , , , , , ,0, ,0, , , , , , , ,0],
		[0, , , ,1, , , , , ,0, , , , ,2, , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , ,0,0,0,0,0,0,0, , , , , ,0],
		[0, , , , , , , ,0,0,0,0,0, , , , , , ,0],
		[0, , , ,1, , , , ,0,0,0, , , ,2, , , ,0],
		[0, , , , , , , , , ,0, , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , ,0, , , ,0, , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , ,1, , , , , ,2, , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , ,0, , , ,0, , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , ,0,0, ,0,0, , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , ,1, , , , , ,2, , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , ,0,0, ,0,0, , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , ,0,0, ,0,0, , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , ,1, , , , , ,2, , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , ,0,0, ,0,0, , , , , , ,0],
		[0, , , , , , , ,0,0, ,0,0, , , , , , ,0],
		[0, , , , , , , ,0,0, ,0,0, , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , ,0,0, ,0,0, , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , ,1, , , , , , , , , , , , , , ,0],
		[0, , , , , , , , , , , , , , , , , , ,0],
		[0, , , , , , , ,0,0, ,0,0, , , , , , ,0],
		[0, , , , , , , ,0,0, ,0,0, ,2, , , , ,0],
		[0, , , , , , , ,0,0, ,0,0, , , , , , ,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	]
);







