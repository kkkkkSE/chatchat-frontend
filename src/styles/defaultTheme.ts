const defaultTheme = {
	texts: {
		bold: {
			header: `
        font-size: 2.8rem;
        font-weight: bold;
      `,
			subHeader: `
        font-size: 2.4rem;
        font-weight: bold;
      `,
			title: `
        font-size: 2.0rem;
        font-weight: bold;
      `,
			subTitle: `
        font-size: 1.8rem;
        font-weight: bold;
      `,
			boldText: `
				font-size: 1.6rem;
				font-weight: bold;
			`,
			boldHint: `
				font-size: 1.2rem;
				font-weight: bold;
			`,
		},
		regular: {
			large: `
        font-size: 1.8rem;
        font-weight: normal;
      `,
			medium: `
				font-size: 1.6rem;
				font-weight: normal;
			`,
			small: `
				font-size: 1.4rem;
				font-weight: normal;
			`,
			hint: `
				font-size: 1.2rem;
				font-weight: normal;
			`,
		},
	},
	colors: {
		white: {
			default: '#FFFFFF',
			hover: '#F7F7F7',
		},
		black: {
			default: '#282828',
			hover: '#4B4B4B',
		},
		main: {
			default: '#1D80E3',
			hover: '#2B8AE8',
		},
		sub: {
			default: '#D8EBFF',
		},
		accent: {
			default: '#E83131',
			hover: '#EB3939',
		},
		gray1: {
			default: '#AAAAAA',
			hover: '#B9B9B9',
		},
		gray2: {
			default: '#F4F4F4',
		},
	},
};

export default defaultTheme;
