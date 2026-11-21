import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimelineSettings } from '../TimelineSettings';

describe('TimelineSettings', () => {
  it('renders a segmented filter toggle with a sliding thumb', () => {
    render(
      <TimelineSettings
        filter="all"
        onFilterChange={() => {}}
        sortOrder="desc"
        onSortChange={() => {}}
      />
    );

    expect(screen.getByRole('group', { name: 'Filter timeline' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /All/i })).toHaveAttribute('aria-pressed', 'true');
    expect(document.querySelector('.journey-toggle-thumb')).toHaveStyle({
      transform: 'translateX(0%)',
    });
  });

  it('moves the thumb and notifies when a filter is selected', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();

    const { rerender } = render(
      <TimelineSettings
        filter="all"
        onFilterChange={onFilterChange}
        sortOrder="desc"
        onSortChange={() => {}}
      />
    );

    await user.click(screen.getByRole('button', { name: /Project/i }));
    expect(onFilterChange).toHaveBeenCalledWith('project');

    rerender(
      <TimelineSettings
        filter="project"
        onFilterChange={onFilterChange}
        sortOrder="desc"
        onSortChange={() => {}}
      />
    );

    expect(screen.getByRole('button', { name: /Project/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(document.querySelector('.journey-toggle-thumb')).toHaveStyle({
      transform: 'translateX(200%)',
    });
  });
});
