import { redirect } from 'react-router-dom';

export function checkAuthenticationLoader() {
  const token = window.localStorage.getItem('token');
  if (!token) {
    return redirect('/login');
  }
}
