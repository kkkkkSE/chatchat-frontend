import {Link} from 'react-router-dom';
import styled from 'styled-components';

function HomePage() {
	return (
		<Container>
			<div>
				<Link to='login?type=company'>기업</Link>
				<Link to='login?type=customer'>고객</Link>
			</div>
			<p>회원 유형을 선택해주세요.</p>
		</Container>
	);
}

export default HomePage;

const Container = styled.div`
	div {
		display: flex;
		justify-content: center;

		a {
			width: 15rem;
			height: 15rem;
			line-height: 15rem;
			border-radius: 2rem;
			box-shadow: 0 0 .6rem rgba(0, 0, 0, 0.16);
			margin-inline: 4.3rem;
			text-align: center;
			font-family: 'Gmarket Sans';
			${props => props.theme.texts.bold.subHeader}
			background-color: ${props => props.theme.colors.white.default};

			:hover {
				background-color: ${props => props.theme.colors.white.hover};
				box-shadow:  0 0 .8rem rgba(0, 0, 0, 0.16);
			}
		}
	}

	p{
		${props => props.theme.texts.regular.large};
		margin-top: 5.6rem;
	}
`;
