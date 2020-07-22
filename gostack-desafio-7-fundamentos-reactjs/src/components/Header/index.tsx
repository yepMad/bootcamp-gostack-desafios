import React from 'react';

import { Container, LinkStyled } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <LinkStyled actualPage={window.location.pathname === '/'} to="/">
          Listagem
        </LinkStyled>
        <LinkStyled
          actualPage={window.location.pathname === '/import'}
          to="/import"
        >
          Importar
        </LinkStyled>
      </nav>
    </header>
  </Container>
);

export default Header;
