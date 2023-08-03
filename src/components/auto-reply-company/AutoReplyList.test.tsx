import { screen } from '@testing-library/react';

import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import AutoReplyList from './AutoReplyList';

const context = describe;

let mockQueryData = {
  isLoading: false,
  autoReplies: [...fixtures.autoReplies],
  error: false,
};

jest.mock('../../hooks/useAutoReplyAdminQuery', () => () => mockQueryData);

describe('<AutoReplyList />', () => {
  beforeEach(() => {
    mockQueryData = {
      isLoading: false,
      autoReplies: [...fixtures.autoReplies],
      error: false,
    };
  });

  it('render auto reply list', () => {
    render(<AutoReplyList />);

    screen.getByText('질문1');
    screen.getByText('답변1');
  });

  context('empty autoReplies', () => {
    beforeEach(() => {
      mockQueryData.autoReplies = [];
    });

    it('render empty text', () => {
      render(<AutoReplyList />);

      screen.getByText(/등록된 질문이 없습니다/);
    });
  });

  context('when isLoading is true', () => {
    beforeEach(() => {
      mockQueryData.isLoading = true;
      mockQueryData.error = false;
    });

    it('render loading text', () => {
      render(<AutoReplyList />);

      screen.getByText(/Loading/);
    });
  });

  context('when error is true', () => {
    beforeEach(() => {
      mockQueryData.isLoading = false;
      mockQueryData.error = true;
    });

    it('render error text', () => {
      render(<AutoReplyList />);

      screen.getByText(/데이터를 불러올 수 없습니다/);
    });
  });
});
