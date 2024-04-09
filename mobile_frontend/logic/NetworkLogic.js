// Helper functions
export function buildPath(route) {
  const app_name = 'cop4331-marketplace-98e1376d9db6';
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  }
}
