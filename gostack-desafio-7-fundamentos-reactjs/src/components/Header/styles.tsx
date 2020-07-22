import React from 'react';

import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { Link, LinkProps } from 'react-router-dom';

interface ContainerProps {
  size?: 'small' | 'large';
}

interface LinkStyledProps {
  actualPage: boolean;
}

interface LinkCustomComponentProps extends LinkProps, LinkStyledProps {}

const LinkCustomComponent: React.FC<LinkCustomComponentProps> = ({
  children,
  to,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  actualPage,
  ...rest
}: LinkCustomComponentProps) => (
  <Link to={to} {...rest}>
    {children}
  </Link>
);

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const LinkStyled = styled(LinkCustomComponent)<LinkStyledProps>`
  color: ${({ actualPage }) =>
    actualPage ? '#fff' : 'rgba(255, 255, 255, 0.8)'};

  text-decoration: none;
  font-size: 16px;
  transition: color 0.2s;

  ${props =>
    props.actualPage &&
    css`
      border-bottom: 2px solid #ff872c;
      padding-bottom: 8px;
    `}

  & + a {
    margin-left: 32px;
  }

  &:hover {
    color: ${shade(0.2, '#fff')};
  }
`;
