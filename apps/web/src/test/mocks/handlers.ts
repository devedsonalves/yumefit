import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:3000';

export const handlers = [
  http.get(`${API_BASE_URL}/auth/me`, () =>
    HttpResponse.json({
      user: {
        id: 'user-1',
        name: 'Marina Lopes',
        email: 'marina@yumefit.test',
        role: 'admin',
        auth_provider: 'local',
        created_at: '2026-07-28T10:00:00.000Z',
        email_verified_at: null,
      },
    }),
  ),
  http.get(`${API_BASE_URL}/users`, () =>
    HttpResponse.json([
      {
        id: 'user-1',
        name: 'Marina Lopes',
        email: 'marina@yumefit.test',
        role: 'admin',
        auth_provider: 'local',
        created_at: '2026-07-28T10:00:00.000Z',
        email_verified_at: null,
      },
    ]),
  ),
  http.get(`${API_BASE_URL}/auth/sessions`, () =>
    HttpResponse.json({
      sessions: [
        {
          id: 'session-1',
          created_at: '2026-07-28T10:00:00.000Z',
          updated_at: '2026-07-28T10:10:00.000Z',
        },
      ],
    }),
  ),
];
