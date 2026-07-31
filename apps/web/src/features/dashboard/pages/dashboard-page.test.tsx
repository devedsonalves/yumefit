import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { DashboardPage } from './dashboard-page';

function renderWithQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardPage />
    </QueryClientProvider>,
  );
}

describe('DashboardPage', () => {
  it('renders the authenticated user returned by the API', async () => {
    renderWithQueryClient();

    expect(await screen.findByText('Bem-vindo, Marina Lopes')).toBeInTheDocument();
    expect(screen.getByText('marina@yumefit.test')).toBeInTheDocument();
  });
});
