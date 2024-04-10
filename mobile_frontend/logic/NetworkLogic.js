// Helper functions
export function buildPath(route) {
  const app_name = 'cop4331-marketplace-98e1376d9db6';
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  }
}

export async function getProductFromID(id) {
  var Retval = null;
  const obj = {
    postId: id,
  };

  var js = JSON.stringify(obj);
  console.log('Fetching Product from ID');
  try {
    const result = await fetch(buildPath('api/getPost'), {
      method: 'POST',
      body: js,
      headers: {'Content-Type': 'application/json'},
    });
    const responce = JSON.parse(await result.text());
    if (responce.error) {
      throw new Error(responce.error);
    }
    Retval = responce.post;
  } catch (e) {
    console.error(e);
  } finally {
    console.log('Finished Getting Product From ID');
    console.log(JSON.stringify(Retval, null, 4));
  }
}
