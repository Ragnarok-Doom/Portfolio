import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    timeline: () => ({
      from: () => ({
        from: () => ({
          from: () => ({
            from: () => ({
              from: () => ({}),
            }),
          }),
        }),
      }),
    }),
    set: vi.fn(),
    kill: vi.fn(),
  },
}));

// Mock HeroScene lazy import
vi.mock('../components/three/HeroScene', () => ({
  default: () => null,
}));

// Mock window.matchMedia for useReducedMotion
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

import Hero from '../components/sections/Hero';

function renderHero(props = {}) {
  return render(
    <React.Suspense fallback={null}>
      <Hero reducedMotion={true} {...props} />
    </React.Suspense>
  );
}

describe('Hero', () => {
  it('renders "Manan Patel" name', () => {
    renderHero();
    expect(screen.getByText('Manan Patel')).toBeInTheDocument();
  });

  it('renders "Full Stack Developer" title', () => {
    renderHero();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
  });

  it('renders "View My Work" button', () => {
    renderHero();
    expect(screen.getByRole('button', { name: /view my work/i })).toBeInTheDocument();
  });

  it('renders GitHub link with correct aria-label', () => {
    renderHero();
    expect(screen.getByLabelText('GitHub profile')).toBeInTheDocument();
  });

  it('renders LinkedIn link with correct aria-label', () => {
    renderHero();
    expect(screen.getByLabelText('LinkedIn profile')).toBeInTheDocument();
  });
});
